const fs = require('node:fs/promises');
const http = require('node:http');
//const axios = require('axios');

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');

  if (url.pathname == '/') {
    if (req.method == 'GET') {
      return read("./index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
  }

  if (url.pathname == '/login') {
    if (req.method == 'GET') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'POST') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'PUT') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'DELETE') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
  }

  if (url.pathname == '/address') {
    if (req.method == 'GET') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'POST') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'PUT') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'DELETE') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
  }

  if (url.pathname == '/data_credit_card') {
    if (req.method == 'GET') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'POST') {
      return read("index.html", (file) => {
        req.on('data', (newData) => {
          console.log(newData.toString());
          res.end();
        });
      });
    }
    if (req.method == 'PUT') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
    if (req.method == 'DELETE') {
      return read("index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200);
        res.end(file);
      });
    }
  }
}).listen(5000, 'localhost', () => {
  console.log(`Server is running on http://localhost:5000`);
});

const read = (file, callback) => fs.readFile(file)
  .then((buf) => {
    callback(buf);
  })
  .catch((err) => {
    console.log(err);
  }
);
