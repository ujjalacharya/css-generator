const { readFileSync, writeFile } = require("fs");
var index = readFileSync("css-generator.html");
const express = require("express");
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(index);
});

app.post("/", (req, res) => {
  let isEmpty = "";

  let dynamicCss = `:root { \n`;

  for (const [key, value] of Object.entries(req.body)) {
    dynamicCss += `\t ${key}: ${value} ;\n`;
    isEmpty += value;
  }

  if (!isEmpty.length) return res.send("Error, empty form submitted");

  dynamicCss += `}`;

  writeFile("variable.css", dynamicCss, (err) => {
    if (err) return res.send("Error");
  });
  return res.send("Success");
});

app.listen(3000, function () {
  console.log("server start at port 3000");
});
