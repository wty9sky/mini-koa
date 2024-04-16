const http = require("http")
const fs = require("fs")
const server = http.createServer((req, res) => {
  res.writeHead(200)
  res.end("hello, koa！")
})
server.listen(3000, () => {
  console.log('🚀🚀~ sever at 3000');
})