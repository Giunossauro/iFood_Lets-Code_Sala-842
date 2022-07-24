const http = require('http');
const fs = require('fs');
const axios = require('axios');

const server = http.createServer((request, response) => {
  const {url, method} = request;

  //atualizada 06/06 Milan
  function syncGenId(path) {
    const jsonString = fs.readFileSync(path);
    const jsonFile = JSON.parse(jsonString.toString());
    const higherId = jsonFile.data.reduce(function(prev, curr) {
        return (prev.id > curr.id) ? prev.id : curr.id;
    }, 1);
    return (higherId + 1)
  }

  function genId(filePath, callback) {
    fs.promises.readFile(filePath)
      .then((jsonFile) => {
        console.log(jsonFile.toString("hex"),"zzzzzzzzzzz")
        jsonFile = jsonFile.toString();
        console.log(jsonFile,"aaaaaaaaaaaaaaa")
        jsonFile = JSON.parse(jsonFile);
        console.log(jsonFile,"_____nfaknk")
        const higherId = jsonFile.data.reduce(function(prev, curr) {
            return (prev.id > curr.id) ? prev.id : curr.id;
        }, 1);
        callback(higherId + 1)
      })
      .catch((error) => {
        console.log(error);
      }
    );
  }

  const readHtml = (filePath) => {
    return fs.promises.readFile(filePath)
      .then((content) => {
        response.setHeader('content-type', 'text/html;charset=utf-8');
        response.writeHead(200);
        response.end(content);
      })
      .catch((error) => {
        response.writeHead(500);
        console.error(error);
        response.end('Não foi possível carregar o HTML da página.')
      }
    );
  };

  const readJson = (filePath) => {
    return fs.promises.readFile(filePath)
      .then((jsonFile) => {
        request.on('data', (newJson) => {
          //console.log(new URLSearchParams(newJson.toString()))
          jsonFile = JSON.parse(jsonFile);
          //JA VOLTO
          newJson = paramsToObject(
            Object.entries(
              JSON.parse(
                newJson.toString()
              )
            )
          );
          console.log(newJson);
          //Atualizado Milan 06/06
          //const newId = syncGenId(filePath);
        
          if (url == "/"){
            console.log("BACON")
            response.setHeader('content-type', 'application/json;charset=utf-8');
            response.writeHead(200);
            response.end(jsonFile);
            return; 
          }
          else if (method == "POST") {
            //atualizado Milan 06/06
            //const nextJson = newJson;
            genId(filePath,(newId) => {
              newJson.id = newId;
              
              jsonFile.data.push(newJson);
              console.log(`Postado ${JSON.stringify(newJson)}!`);
            })
          }
          else if (method == "PATCH"){
            jsonFile = jsonFile.data.map(e => {
              return e.id == newJson.id ? newJson : e;
            });
          }
          else if (method == "DELETE"){
            jsonFile.data = jsonFile.data.filter(e => e.id != newJson.id);
          }
          fs.promises.writeFile(filePath, JSON.stringify(jsonFile));

          if (filePath == "./json/client_register.json"){
            readHtml('./html/address_client.html');
          } 
          
          else if (filePath == "./json/client_address.json"){
            readHtml('./html/credit_card_client.html');
          }
          
          else if (filePath == "./json/credit_card.json"){
            readHtml('./html/sucesso.html');
          }
        });
      })
      .catch((error) => {
        response.writeHead(500);
        console.error(error);
        response.end('Não foi possível carregar o HTML da página.')
      }
    )
  }

  if (url == "/") {

    if (method == "GET") {
      readHtml('./html/index.html');
      return;
    }
    if (method == "POST"){
      console.log("________________")
      readJson("./json/client_register.json");
      return;
    }
    return;
  }
  
  else if (url == "/registration") {

    if (method == "GET") {
      readHtml('./html/register_client.html');
      return;
    }
    if (method == "POST" || method == "PATCH" || method == "DELETE") {
      readJson("./json/client_register.json");
      return;
    }
    /* if (method == "PATCH") {
      readJson("./json/client_register.json");
      return;
    }
    if (method == "DELETE") {
      readJson("./json/client_register.json");
      return;
    } */
    return;
  }
  
  else if (url == "/address") {
    
    if (method == "GET") {
      readHtml('./html/address_client.html')
    }
    else if (method == "POST") {
      readJson("./json/client_address.json");
    }
    else if (method == "PUT") {
      
    }
    else if (method == "DELETE") {
      
    }

    return;
  }
  
  else if (url == "/credit_card_data") {
    
    if (method == "GET") {
      readHtml('./html/credit_card_client.html');
    }
    else if (method == "POST") {
      readJson("./json/credit_card.json");
    }
    else if (method == "PUT") {
      
    }
    else if (method == "DELETE") {
      
    }
    return;
  }
  
  else {
    response.writeHeader(404)
    response.end('<h1>Page Not Found</h1>')
  }
})

server.listen(8081, 'localhost', () => {
  const address = server.address()

  console.log(`Servidor rodando em ${address.address}:${address.port}`)
})

const paramsToObject = (entries) => {
  const result = {}
  for (const [key, value] of entries) {
    if (key == "id" || key == "number" || key == "card_number" || key == "ccv") {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  }
  return result;
}