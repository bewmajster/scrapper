const fs = require("fs");
const http = require("http");
const onPort = process.env.PORT || 3000;

var app = http.createServer(function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.end(fs.readFileSync("./hodnotenia.json", { encoding: "utf8" }));
});

app.listen(onPort);
