class Endereco {
    static contadorId = 0
    constructor(rua, numero, bairro, cidade, cep) {
        this.id = ++Endereco.contadorId
        this.rua = rua
        this.numero = numero
        this.bairro = bairro
        this.cidade = cidade
        this.cep = cep
    }
}

module.exports = Endereco