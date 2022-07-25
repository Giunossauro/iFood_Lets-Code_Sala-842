class FiguraGeometrica{
    constructor(base = [], altura = base){
        this.base = base;
        this.altura = altura;
    }
 
    calcularArea(){
        return `A área é: ${this.base * this.altura}`;
    }
}

class Quadrado extends FiguraGeometrica{
    constructor(base = []){
        super(base);
    }
}

class Retangulo extends FiguraGeometrica{
    constructor(base, altura){
        super(base, altura);
    }
}

class Triangulo extends FiguraGeometrica{
    constructor(base, altura){
        super(base, altura);
    }

    calcularArea(){
        return `A área é: ${(this.base * this.altura) / 2}`;
    }
}

class Circulo extends FiguraGeometrica{
    constructor(base, altura){
        super(base, altura);
    }

    calcularArea(){
        return `A área é: ${(this.base / 2) * (this.base / 2) * Math.PI}`;
    }
}

const quadrado = new Quadrado(5);
const retangulo = new Retangulo(3, 4);
const triangulo = new Triangulo(3, 4);
const circulo = new Quadrado(4);

console.log(quadrado.calcularArea());
