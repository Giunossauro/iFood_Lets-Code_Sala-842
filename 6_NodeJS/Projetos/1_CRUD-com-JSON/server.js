const fs = require('node:fs/promises');

const server = require("node:http");
server.createServer((req, res) => {
  const { method } = req;
  const url = new URL(req.url, `https://${process.env.YOUR_HOST || '0.0.0.0'}`);
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE',
    'Access-Control-Max-Age': 2592000
  };

  if (url.pathname == '/') {
    if (method == "GET") {
      if (url.searchParams.has('id')){
        read("./storage.json", (file) => {
          console.log(paramsToObject(url.searchParams.entries()));
          file = JSON.parse(file);
          file.push(paramsToObject(url.searchParams.entries()));
          console.log(`Getado ${JSON.stringify(paramsToObject(url.searchParams.entries()))}!`);
          fs.writeFile("./storage.json", JSON.stringify(file));
          //res.end();
        });
      }
      return read("./public/index.html", (file) => {
        res.setHeader('content-type', 'text/html;charset=utf-8');
        res.writeHead(200, headers);
        res.end(file);
      });
    } 

    if (method == "POST") {
      return read("./storage.json", (file) => {
        req.on('data', (newData) => {
          file = JSON.parse(file);
          newData = JSON.parse(newData.toString());
          newData = paramsToObject(Object.entries(newData));
          file.push(newData);
          console.log(`Postado ${JSON.stringify(newData)}!`);
          fs.writeFile("./storage.json", JSON.stringify(file));
          res.writeHead(200, headers);
          res.end();
        });
      });
    }

    if (method == "PUT") {
      return read("./storage.json", (file) => {
        req.on('data', (newData) => {
          file = JSON.parse(file);
          newData = JSON.parse(newData.toString());
          newData = paramsToObject(Object.entries(newData));
          const index = file.findIndex(e => e.id == newData.id);
          file[index] = newData;
          console.log(`Putado ${JSON.stringify(newData)}!`);
          fs.writeFile("./storage.json", JSON.stringify(file));
          res.writeHead(200, headers);
          res.end();
        });
      });
    }

    if (method == "DELETE") {
      return read("./storage.json", (file) => {
        req.on('data', (newData) => {
          file = JSON.parse(file);
          newData = JSON.parse(newData.toString());
          newData = paramsToObject(Object.entries(newData));
          file = file.filter(e => e.id != newData.id);
          console.log(`Deletado ${JSON.stringify(newData)}!`);
          fs.writeFile("./storage.json", JSON.stringify(file));
          res.writeHead(200, headers);
          res.end();
        });
      });
    }

    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.writeHead(403, headers);
    return res.end("método não permitido");
  }

  else if (url.pathname == '/json') {
    if (method == "GET"/*  || method == "POST" */) {
      return read(
        './storage.json',
        (file) => {
          res.setHeader('content-type', 'application/json;charset=utf-8');
          res.writeHead(200, headers);
          res.end(file);
        }
      );
    }

    if (method == "POST") {
      return read(
        './storage.json',
        (file) => {
          req.on('data', (newData) => {
            file = JSON.parse(file);
            newData = new URLSearchParams(newData.toString());
            newData = paramsToObject(newData.entries());
            file.push(newData);
            console.log(`Postado ${JSON.stringify(newData)}!`);
            fs.writeFile("./storage.json", JSON.stringify(file));
            res.writeHead(200, headers);
            res.end();
          });
        }
      );
    }
  } else {
    res.writeHead(404);
    res.end('not found');
  }
}).listen(process.env.PORT || 5000, process.env.YOUR_HOST || '0.0.0.0', () => {
  console.log(`Server is running on netlifyyyyyyy`);
});


const read = (file, callback) => fs.readFile(file)
  .then((buf) => {
    callback(buf);
  })
  .catch((err) => {
    console.log(err);
  }
);

const paramsToObject = (entries) => {
  const result = {}
  for (const [key, value] of entries) {
    if (key == 'id' || key == 'num') {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}