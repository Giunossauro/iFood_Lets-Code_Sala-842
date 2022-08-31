const http = require('http');
const fs = require('fs');

const server = http.createServer(async (req, res) => {
  const {url, method} = req;

  function genId(file) {
    file = JSON.parse(file.toString());
    const higherId = file.data.reduce(function(prev, curr) {
      return (prev.id > curr.id) ? prev.id : curr.id;
    }, 1) ;
    return higherId + 1;
  }

  const writeJson = async (filePath) => {
    try {
      let jsonFile = (await fs.promises.readFile(filePath)).toString();
      jsonFile = JSON.parse(jsonFile);
      
      let newJson = '';
      req.setEncoding('utf8');
      for await (const chunk of req) {
        newJson += chunk;
      }
      console.log(newJson);
      res.end(newJson);

      newJson = paramsToObject(
        Object.entries(
          JSON.parse(
            newJson.toString()
          )
        )
      );

      if (url == "/"){
        response.end(jsonFile);
        return; 
      }
      else if (method == "POST" && url != "/success") {
        console.log(JSON.stringify(jsonFile))
        newJson.id = genId(JSON.stringify(jsonFile));
        
        jsonFile.data.push(newJson);
        console.log(`Postado ${JSON.stringify(newJson)}!`);
      }
      else if (method == "PUT"){
        jsonFile.data = jsonFile.data.map(e => {
          return e.id == newJson.id ? newJson : e;
        });
      }
      else if (method == "DELETE"){
        jsonFile.data = jsonFile.data.filter(e => e.id != newJson.id);
      }
      await fs.promises.writeFile(filePath, JSON.stringify(jsonFile));

    } catch (error){
      //res.statusCode = 500;
      console.error("______",error,"______");
      res.end('Não foi possível carregar o HTML da página.');
    }
  }

  if (url == "/") {
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/index.html')).toString());
      return;
    }
  }

  if (url == "/style.css") {
    if (method == "GET") {
      res.setHeader('content-type', 'text/css;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/style.css')).toString());
      return;
    }
  }

  if (url == "/favicon.ico") {
    if (method == "GET") {
      res.setHeader('content-type', 'image/x-icon');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/favicon.ico')));
      return;
    }
  }
  
  else if (url == "/registration") {
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/register_client.html')).toString());
      return;
    }
    if (method == "POST" || method == "PUT" || method == "DELETE") {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.writeHead(200);
      writeJson("./json/client_register.json");
      res.end((await fs.promises.readFile('./json/client_register.json')).toString());
      return;
    }
    return;
  }
  
  else if (url == "/address") {

    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/address_client.html')).toString());
      return;
    }
    else if (method == "POST" || method == "PUT" || method == "DELETE") {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.writeHead(200);
      writeJson("./json/client_address.json");
      res.end((await fs.promises.readFile('./json/client_address.json')).toString());
      return;
    }
    return;
  }
  
  else if (url == "/credit_card_data") {
    
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/credit_card_client.html')).toString());
      return;
    }
    else if (method == "POST" || method == "PUT" || method == "DELETE") {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.writeHead(200);
      writeJson("./json/cliente_credit_card_data.json");
      res.end((await fs.promises.readFile('./json/cliente_credit_card_data.json')).toString());
      return;
    }
    return;
  }
  
  else if (url == "/success") {
     
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/success.html')).toString());
      return;
    }
    
    if (method == "POST") {
      res.setHeader('content-type', 'application/json;charset=utf-8');
      res.writeHead(200);
      let body = '';
      body += '\n{\"register\": '    + (await fs.promises.readFile('./json/client_register.json')).toString()          + '\n,';
      body += '   \"address\": '     + (await fs.promises.readFile('./json/client_address.json')).toString()           + '\n,';
      body += '   \"credit_card\": ' + (await fs.promises.readFile('./json/cliente_credit_card_data.json')).toString() + '\n}\n';
      res.end(body);
      return;
    }
    return; 
  }

  else if (url == "/upar-imagem"){
     
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/uparimagem.html')).toString());
      return;
    }
     
    if (method == "POST") {
      let newImage = '';
      req.setEncoding('latin1');
      for await (const chunk of req) {
        newImage += chunk;
      }
      try {
        await fs.promises.writeFile('./img/imagem.png',newImage,'latin1');
      } catch (e) {
        console.log("erro: ", e);
        res.end("erro: ", e.toString());
      }
      res.writeHead(200);
      res.end("imagem enviada!");
      return;
    }
    return; 
  }

  else if (url == "/ver-imagem"){
     
    if (method == "GET") {
      res.setHeader('content-type', 'text/html;charset=utf-8');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./html/verimagem.html')).toString());
      return;
    }
     
    return;
  }

  else if (url == "/img/imagem.png"){
     
    if (method == "GET") {
      res.setHeader('content-type', 'image/png');
      res.writeHead(200);
      res.end((await fs.promises.readFile('./img/imagem.png','latin1')));
      return;
    }
     
    return;
  } 
  
  else {
    res.setHeader('content-type', 'text/html;charset=utf-8');
    res.writeHeader(404)
    res.end('<h1>Page Not Found</h1>')
  }
}).listen(process.env.PORT || 8081, process.env.YOUR_HOST || '0.0.0.0', () => {
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