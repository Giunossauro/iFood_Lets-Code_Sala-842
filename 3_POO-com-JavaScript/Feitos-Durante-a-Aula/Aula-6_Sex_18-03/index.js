class Animal {
    constructor(nome, especie){
        this.nome = nome;
        this.especie = especie;
    }

    emitirSom(){
        console.log("Algum som");
    }
}
 
class Cachorro extends Animal {
    constructor(nome, especie){
        super(nome, especie);
    }

    emitirSom() {
        console.log("au au");
    }

    static exibirInfo(){
        console.log("Atras de toda criança sempre ha uma figura oculta, que é um cachorro.");
    }
}

Cachorro.exibirInfo();

const cachorro = new Cachorro("Spike", "Bulldog");
cachorro.emitirSom();
//cachorro.exibirInfo();