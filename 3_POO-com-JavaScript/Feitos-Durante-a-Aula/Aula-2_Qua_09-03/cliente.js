class Cliente{
    constructor(nome, idade, email){
        this.nome = nome;
        this.idade = idade;
        this.email = email;
    } 

    imprime(){
        console.log("O cliente " + this.nome + " tem " + this.idade + " anos e seu email é: " + this.email);
    }

    obterInformacoes(){
        return `O cliente ${this.nome} tem ${this.idade} anos e seu email é: ${this.email}`;
    }
}

//pesquisar prototype https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects

// function Person(name) { this.name = name; }
// p = new Person('foo')
// this.__proto__ = new Human();

const cliente = new Cliente("fulano", 30, "fulano@gmail.com");

console.log(cliente.obterInformacoes());
cliente.imprime();

module.exports = Cliente;