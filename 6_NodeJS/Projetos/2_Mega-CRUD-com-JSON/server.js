const http = require("http");
const fs = require("fs");

const convert_hero_to_string = (bot) => {
    return `<li>${bot.nome} (${bot.equipe}), ${bot.voa == "sim" ? "voador" : "não voa"} - Status: ${bot.sobrevive == "sim" ? "Online" : "Destruído"}</li>`;
}
(async ()=>{
const readHeroes = (callback) => {
    return fs.promises.readFile("./transformers.json")
            .then((buffer) => {
                const robots = JSON.parse(buffer.toString());

                callback(robots);
            })
            .catch((error) => {
                console.error(error);
                //res.end("Não foi possível ler o JSON...");
            });
}

function generateId() {
    return readHeroes((robots) => {
        const higherId = robots.transformer.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev.id : current.id
        }, 1)
        higherId + 1
    })
}

let a = await readHeroes(generateId);
console.log("fasda",a)
})()


// const generatyId = (callback) => {
//     return fs.promises.readFile("./transformers.json")
//             .then((buffer) => {
//                 const robots = JSON.parse(buffer.toString());
                
//                 const higherId = robots.transformer.reduce(function(prev, current) {
//                     return (prev.id > current.id) ? prev : current
//                 }, 1)
//                 callback(higherId);
//             })
//             .catch((error) => {
//                 console.error(error);
//                 res.end("Não foi possível ler o JSON...");
//             });
// }
// console.log(generatyId(()=>{}));

const server = http.createServer((req, res) => {
    const {url, method} = req;

    //console.log(req);
    console.log(url, method);

    if (url == "/") {
        if (method == "GET") {
            return readHeroes((robots) => {
                res.setHeader('Content-Type', 'text/html;charset=utf-8');

                res.end(`
                    <h1>Lista de Transformers de Beast Wars</h1>
                    <ul>
                        ${robots.transformer.reduce((prev_str, hero) => {
                            return prev_str + convert_hero_to_string(hero);
                        }, "")}
                    </ul>
                `);
            });
        } else if (method == "POST") {
            return readHeroes((robots) => {
                req.on('data', new_hero => {
                    new_hero = JSON.parse(new_hero);
                    new_hero.id = robots.last_id + 1;
                    robots.transformer.push(new_hero);
                    robots.last_id = new_hero.id;
                    
                    fs.promises.writeFile("./transformers.json", JSON.stringify(robots));

                    res.end(`Posted ${JSON.stringify(new_hero)}!`);
                });
            })
        } else if (method == "PUT") {
            return readHeroes((robots) => {
                req.on('data', update_hero => {
                    update_hero = JSON.parse(update_hero);
                    
                    const id = update_hero.id;

                    const hero_idx = robots.transformer.findIndex((hero) => {
                        return hero.id == id;
                    })

                    robots.transformer[hero_idx].nome_real = update_hero.nome_real;
                    
                    fs.promises.writeFile("./transformers.json", JSON.stringify(robots));

                    res.end(`Updated ${JSON.stringify(update_hero)}!`);
                });
            })
        } else if (method == "DELETE") {
            return readHeroes((robots) => {
                req.on('data', update_hero => {
                    update_hero = JSON.parse(update_hero);
                    
                    const id = update_hero.id;

                    const hero_idx = robots.transformer.findIndex((hero) => {
                        return hero.id == id;
                    })

                    if (hero_idx != -1) {
                        robots.transformer.splice(hero_idx, 1);
                        fs.promises.writeFile("./transformers.json", JSON.stringify(robots));

                        return res.end(`Deleted ${JSON.stringify(update_hero)}!`);
                    }

                    res.writeHead(404);
                    res.end('ROBOT NOT FOUND');
                });
            })
        }
    }

    res.writeHead(404);
    return res.end('PAGE NOT FOUND');
});

server.listen(8081, 'localhost', () => {
    const address = server.address();
    console.log(`Servidor cibernético rodando ${address.address}:${address.port}`);
});