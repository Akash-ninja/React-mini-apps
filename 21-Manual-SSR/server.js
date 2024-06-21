const { readFileSync } = require("fs")
const { createServer } = require("http")
const { parse } = require("url")

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8")

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname

  if (pathName === "/") {
    res.writeHead(200, { "Content-type": "text/html" })
    res.end(htmlTemplate)
  } else if (pathName === "/test") {
    res.end("TEST")
  } else {
    res.end("The URL cannot be found")
  }
})

server.listen(8000, () => console.log("Listening for requests on port 8000"))
