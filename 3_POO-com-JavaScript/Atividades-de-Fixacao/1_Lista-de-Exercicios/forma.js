//Crie um objeto chamado Forma, que tem o atributo tipo e um método
//chamado obterTipo.

class Forma{
    #tipo;
    constructor(tipo){
        this.#tipo = tipo;
    }

    obterTipo(){
        return this.#tipo;
    }
}

//module.exports = Forma; descomentar para rodar no node