const data = require("./data.json");

const json = '{"id": 1,"nome": "The Flash","publicadora": "DC"},{"id": 2,"nome": "Wolverine","publicadora": "Marvel"},{"id": 3,"nome": "Mulher Maravilha","publicadora": "Marvel"},{"id": 4,"nome": "Capitão América","publicadora": "DC"},{"id": 5,"nome": "Chapolin Colorado","publicadora": "Televisa"}';

//console.log(JSON.parse(json));
//console.log(JSON.parse(data));
//console.log(json);
//console.log(data);

class Hero{
    /* id; 
    nome;
    publicadora;
    constructor(hero){
        Object.assign(this, hero);
    } */
    constructor(id, nome, publicadora){
        this.id = id;
        this.nome = nome;
        this.thumbnail = publicadora;
    }
}

class HeroesList {
    heroes;
    constructor(heroes){
        //Object.assign(this, heroes);
        //this.heroes = heroes;
        this.heroes = heroes.map(
            ({id, nome, publicadora}) =>
                new Hero(id, nome, publicadora)
        );
    }
}

//const heroesList1 = new HeroesList(data);
const heroesList2 = new HeroesList(data.heroes);

console.log("=================");
console.log("=================");
console.log("=================");
//console.log(heroesList1);
console.log("=================");
console.log(heroesList2);
console.log("=================");
console.log("=================");
console.log("=================");