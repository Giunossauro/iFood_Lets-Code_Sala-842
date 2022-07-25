class Bola{
    constructor(cor, raio){
        this.cor = cor;
        this.raio = raio;
        this.area = this.calcularArea();
        this.volume = this.calcularVolume();
    }
 
    imprimeCor(){
        console.log(`A cor da bola é: ${this.cor}`);
    }

    calcularArea(){
        return 4 * Math.PI * this.raio * this.raio;
    }

    calcularVolume(){
        return (4 * Math.PI * this.raio * this.raio * this.raio) / 3;
    }
}

const bola = new Bola("Branca", 5.75);
console.log(bola);