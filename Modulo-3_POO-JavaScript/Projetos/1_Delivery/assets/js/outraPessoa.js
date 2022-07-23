class outraPessoa {
    static contadorId = 0;
    static teste = ["a","b"];
    // #cpf;
    // #nome;
    // #pedido;
    // #score;
    // #observacoes;
    constructor(nome, cpf, pedido, score, observacoes){
        this.id = ++Pessoa.contadorId;
        this.nome = nome;
        this.cpf = cpf;
        this.pedido = pedido;
        this.score = score;
        this.observacoes = observacoes;
    }
}
//     getAll(){
//         return (this.#id.toString() + " - " + this.#nome + " - " + this.#cpf + " - " + this.#pedido + " - " + this.#score + " - " + this.#observacoes);
//     }

//     get id(){
//         return this.#id;
//     }
// }

/* const pessoa = new Pessoa("Fulano","123","111","score","asdas");
const pessoa2 = new Pessoa("Fulano","123b","111b","scoreb","asdasb"); */

/* console.log(pessoa);
console.log(pessoa.id());
console.log(pessoa.getAll());
console.log(pessoa2);
console.log(pessoa2.id());
console.log(pessoa2.getAll()); */









/* 
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const question1 = () => {
    return new Promise((resolve, reject) => {
        rl.question('q1 What do you think of Node.js? ', (answer) => {
            console.log(`Thank you for your valuable feedback: ${answer}`);
            resolve();
        });
    });
};

const question2 = () => {
    return new Promise((resolve, reject) => {
        rl.question('q2 What do you think of Node.js? ', (answer) => {
            console.log(`Thank you for your valuable feedback: ${answer}`);
            resolve();
        });
    });
};

const main = async () => {
    await question1();
    await question2();
    rl.close();
};

main();
 */
/*
const Loader = require("@googlemaps/js-api-loader");

const loader = new Loader({
    apiKey: "AIzaSyCZuz29ivnz5CCps7edMf4eU12UIlkz-ho",
    version: "weekly",
    ...{},
});

loader.load().then(() => {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
    });
});



function initMap() {
    var directionsService = new google.maps.DirectionsService();
    var directionsRenderer = new google.maps.DirectionsRenderer();
    var chicago = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
        zoom:7,
        center: chicago
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
  }
  
  function calcRoute() {
    var start = document.getElementById('start').value;
    var end = document.getElementById('end').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };
    directionsService.route(request, function(result, status) {
        if (status == 'OK') {
            directionsRenderer.setDirections(result);
        }
    });
}

initMap();












*/
module.exports = outraPessoa;