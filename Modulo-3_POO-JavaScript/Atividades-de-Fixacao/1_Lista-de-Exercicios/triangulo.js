//const Forma = require("./forma"); descomentar para rodar no node

class Triangulo extends Forma{
    #a;
    #b;
    #c;
    constructor(a,b,c){
        super("Triangulo");
        this.#a = a;
        this.#b = b;
        this.#c = c;
    }

    obterPerimetro(){
        return this.#a + this.#b + this.#c;
    }
}

const triangulo = new Triangulo(3,3,3);
let templateString = `O tipo da forma é: \"${
    triangulo.obterTipo()
}\" e seu perímetro é: ${
    triangulo.obterPerimetro()
}`;

console.log(templateString);
//alert(templateString);
console.log();
