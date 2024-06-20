const { createServer } = require("http")
const { parse } = require("url")

const server = createServer((req, res) => {
  const pathName = parse(req.url, true).pathname

  if (pathName === "/") {
    res.end("Hello world!")
  } else if (pathName === "/test") {
    res.end("TEST")
  } else {
    res.end("The URL cannot be found")
  }
})

server.listen(8000, () => console.log("Listening for requests on port 8000"))
