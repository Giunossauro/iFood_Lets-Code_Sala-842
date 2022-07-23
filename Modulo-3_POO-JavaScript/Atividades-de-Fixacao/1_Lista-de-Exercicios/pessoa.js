class Pessoa{
    #nome;
    #dtNasc;
    constructor(nome, dtNasc){
        this.#nome = nome;
        this.#dtNasc = Date.parse(dtNasc.concat("T00:00-03:00"));
    }

    #calcularIdade(){
        return Math.floor(
            ((((((Date.now() - this.#dtNasc) / 1000) / 60) / 60) / 24) / 365)
        );
    }

    detalharPessoa(){
        return `${this.#nome}, ${this.#calcularIdade()} anos`;
    }
}

const pessoa = new Pessoa("Fulano", "2000-04-25");
console.log();
console.log(pessoa.detalharPessoa());
console.log();
//alert(pessoa.detalharPessoa());
