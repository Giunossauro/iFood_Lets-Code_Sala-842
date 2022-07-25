class Pessoa{
    static #contador = 0;

    constructor(nome){
        this.nome = nome;
        this.id = ++Pessoa.#contador;
    }
}

const p1 = new Pessoa("João");
const p2 = new Pessoa("Maria");
const p3 = new Pessoa("Ana");
 
console.log(p1);
console.log(p2);
console.log(p3);