class Locacao {
    static contador = 0;
    constructor(idVeiculo, dataInicio, dataFinal, quantidadeParcelas){
        this.id = ++Locacao.contador;
        this.idVeiculo = idVeiculo;
        this.dataInicio = dataInicio;
        this.dataFinal = dataFinal;
        this.quantidade = quantidadeParcelas;
    }
} 