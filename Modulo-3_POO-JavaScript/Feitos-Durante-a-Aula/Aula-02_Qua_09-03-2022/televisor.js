class Canal{
    constructor(emissora, numero){
        this.emissora = emissora;
        this.numero = numero;
    }
}

class Televisor{
    constructor(fabricante, modelo, canalAtual, canais, volume){
        this.fabricante = fabricante;
        this.modelo = modelo;
        this.canalAtual = canalAtual;
        this.canais = canais;
        if(!volume || isNaN(volume) || volume < 0 || volume >= 100){
            this.volume = 0;
            return;
        }
        this.volume = volume;
    }

    aumentarVolume(){
        if(this.volume + 1){
            ++this.volume;
        }
    }

    diminuirVolume(){
        if(this.volume > 0){
            --this.volume;
        }
    }

    trocarCanal(numeroCanal){
        if(listaCanais.some(canalProcurado => canalProcurado.numero == numeroCanal)){
            this.canalAtual = numeroCanal;
        }
    }

    sintonizarNovoCanal(canal){
        if(!listaCanais.some(canalProcurado => canalProcurado.numero == canal.numero)){
            this.listaCanais.push(canal);
        }
    }

    verificarCanalExiste(numeroCanal){
        return listaCanais.some(canalProcurado => canalProcurado.numero == numeroCanal);
    }
}

const sbt = new Canal("SBT",4);
const globo = new Canal("Globo",5);
const band = new Canal("Band",13);
const record = new Canal("Record",7);

const televisor = new Televisor("CCE", "TFCV588", 5, [sbt, globo, band], 15);

console.log(televisor);