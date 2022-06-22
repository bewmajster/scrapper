const fs = require("fs");
const http = require("http");

var app = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(fs.readFileSync("./hodnotenia.json", { encoding: "utf8" }));
});

app.listen(process.env.PORT);
