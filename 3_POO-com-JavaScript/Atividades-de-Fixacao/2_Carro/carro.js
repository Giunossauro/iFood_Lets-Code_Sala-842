class Carro {
    constructor(proprietario, placa, marca, modelo, ano, cor, metragem = 0){
        this.proprietario = proprietario;
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
        this.metragem = metragem;
        this.velocidade = 0;
        this.movendo = false;
        this.parado = true;
    }

    andar(sentido){
        metragem.innerText = `Percorrido: ${this.metragem.toFixed(2)} (em metros)`;
        if(sentido === "acelera") this.metragem += +(++this.velocidade / 36).toFixed(2);
        else if (sentido === "desacelera"){
            if(this.velocidade > 0) {
                this.metragem += +(--this.velocidade / 36).toFixed(2);
            }
        }
        else console.log("informe um sentido válido: \"acelera\" ou \"desacelera\"");
    }
}

const carro = new Carro("Fulano", "ABC-0123","Ford","KA",2000,"azul");

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

//indica que é uma função assíncrona, ou seja, fora de sincronia
async function delay(){
    carro.parado = false;
    if (carro.velocidade < 200){

        //aqui diz que é para esperar, apesar de a funcao estar fora de sincronia
        await sleep(100);
        carro.andar("acelera");

        visor.innerText = `Velocidade: ${carro.velocidade} (em km/h)`;
        console.log(`Velocidade: ${carro.velocidade} (em km/h)`);
        
        //observação: o await só funciona dentro de função assíncrona!
        if (carro.movendo) await delay();

        visor.innerText = `Velocidade: ${carro.velocidade - 1} (em km/h)`;
        console.log(`Velocidade: ${carro.velocidade - 1} (em km/h)`);
    }
    while (carro.movendo) {
        await sleep(100);
    }
    if (carro.parado) {
        carro.velocidade = 0;
        return;
    }
    await sleep(100);
    carro.andar("desacelera");
}


mover.addEventListener("mousedown", function(){carro.movendo = true;delay();});
mover.addEventListener("mouseup", function(){carro.movendo = false;});

mover.addEventListener("touchstart", function(){carro.movendo = true;delay();});
mover.addEventListener("touchend", function(){carro.movendo = false;});
interromper.addEventListener("click", function(){
    carro.parado = true;
    if(carro.velocidade > 5 && carro.velocidade < 21){
        //acrescentar no body acrescenta apos o script, o que intencionalmente quebra o site
        document.body.innerHTML += "<strong style='color: red'>Que parada brusca! Você bateu?</strong>";
        label.innerText += "(quebrado)";
        console.error("Que parada brusca! Você bateu?");
        shake(1000);
    }
    else if(carro.velocidade > 20 && carro.velocidade < 31){
        document.body.innerHTML += "<strong style='color: red'>Você bateu! Sorte que não estava muito rápido...</strong>";
        label.innerText += "(quebrado)";
        console.error("Você bateu! Sorte que não estava muito rápido...");
        shake(2000);
    }
    else if(carro.velocidade > 30 && carro.velocidade < 45){
        document.body.innerHTML += "<strong style='color: red'>Você bateu feio!! Você está bem?</strong>";
        label.innerText += "(quebrado)";
        console.error("Você bateu feio!! Você está bem?");
        shake(3000);
    }
    else if (carro.velocidade > 44){
        document.body.innerHTML += "<strong style='color: red'>Ligue para a ambulância!!! A batida foi feia...</strong>";
        label.innerText += "(quebrado)";
        console.error("Ligue para a ambulância!!! A batida foi feia...");
        shake(5000);
    }
});

botaoDados.addEventListener("click", function(){
    if (carro.velocidade > 0) carro.movendo = true;
    dados.innerHTML = "<hr>";
    Object.entries(carro).forEach(parDeValores => {
        dados.innerHTML += `<p>${parDeValores[0]}: ${parDeValores[1]}</p>`
    });
    carro.movendo = false;
});

console.log("Dados do carro: \n");

Object.entries(carro).forEach(parDeValores => {
    console.log(`${parDeValores[0]}: ${parDeValores[1]}.`)
});

function shake(time){
    if (!/shake/.test(document.body.className)) {
        document.body.className += ' shake';

        // remove shake class after 3 seconds
        window.setTimeout(function() {
            document.body.className = document.body.className.replace(' shake', '');
        }, time);
    }
}