class Animal {
    constructor(nome, cor, especie){
        this.nome = nome;
        this.cor = cor;
        this.especie = especie;
    }

    emitirSom(){
        return "Hello, world!";
    }
}

class Cachorro extends Animal{
    constructor(nome, cor, especie = "Cachorro"){
        super(nome, cor, especie);
    }

    emitirSom(){
        return "bark";
    }

    
}

const cachorro = new Cachorro("Rex","roxo");

console.log(cachorro.nome);
console.log(cachorro.cor);
console.log(cachorro.especie);
console.log(cachorro.emitirSom());