const Cliente = require("./cliente.js");

class ContaCorrente{
    constructor(cliente, saldo){
        this.cliente = cliente;
        this.saldo = saldo;
    }
    depositar(valor){
        if(this.validarValor(valor)){
            this.saldo += valor;
        }
    }

    sacar(valor){
        if(validarSubtracao(valor)){
            this.saldo -= valor;
        }
    }

    transferir(valor, cliente){
        if(this.validarSubtracao(valor)){
            let saldoAnterior = cliente.saldo;
            cliente.saldo += valor;
            if(saldoAnterior + valor == cliente.saldo){
                this.saldo -= valor;
                return true;
            }
            return false;
        }
    }

    receberTransferencia(valor){
        if(validarValor(valor)){
            let saldoAnterior = this.saldo;
            this.saldo += valor;
            if(saldoAnterior + valor == cliente.saldo){
                this.saldo -= valor;
                return true;
            }
            return false;
        }
    }

    validarSubtracao(valor){
        if(this.saldo >= valor && this.validarValor(valor)){
            return true;
        }
        console.log("saldo insuficiente");
        return false;
    }

    validarValor(valor){
        if(!isNaN(valor) && valor > 0){
            return true;
        }
        return false;
    }
}

const cliente1 = new Cliente("fulano", 19, "fulano@gmail.com");
const cliente2 = new Cliente("fulano2", 20, "fulano2@gmail.com");
const contaCorrente = new ContaCorrente(cliente1, 1000);

contaCorrente.depositar(100);
console.log(contaCorrente.saldo);

console.log("------");

contaCorrente.transferir(500,cliente2);
console.log(contaCorrente.saldo);