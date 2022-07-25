class Hero{
    constructor(id, nome, publicadora){
        this.id = id;
        this.nome = nome;
        this.thumbnail = publicadora;
    }
}

class HeroesList {
    constructor(heroes){
        this.heroes = heroes;
    } 

    adicionarHeroi(heroi){
        this.heroes.push(heroi);
    }
}

const h1 = new Hero(1, "The Flash", "DC");
const h2 = new Hero(2, "Wolverine", "Marvel");
const h3 = new Hero(3, "Mulher Maravilha", "DC");

const list = new HeroesList([h1, h2, h3]);

const listJson = JSON.stringify(list);

console.log(list);
console.log("=========================");
console.log(listJson);