const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8123;
const DIR = __dirname;
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript; charset=utf-8",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
};

http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  const filePath = path.join(DIR, urlPath === "/" ? "index.html" : urlPath);
  const ext = path.extname(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end("Not found"); return; }
    res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
    res.end(data);
  });
}).listen(PORT, "127.0.0.1", () => console.log(`Serving ${DIR} at http://127.0.0.1:${PORT}`));
