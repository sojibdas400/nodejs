const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  let url = req.url;
  let method = req.method;
  if (url === "/") {
    res.write(`<html>
    <head>
      <title>This is the welcome page</title>
    </head>
    <body>
      <h2>Learn nodejs</h2>
  
      <form action="/message" method="POST">
        <input type="text" name="message" />
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>`);
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message", message, () => {
        console.log("File write ends");
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write(`<html>
    <head>
        <title>My First Page</title>
    </head>
    <body>
        <h2>Hello from my demo server!!!!</h2>
    </body>
    </html>`);
  return res.end();
});

server.listen(5000);
