class Pessoa {
    static contadorId = 0;

    constructor(nome, cpf_cnpj, endereco, score) {
        this.id = ++Pessoa.contadorId;
        this.nome = nome;
        this.cpf = cpf_cnpj;
        this.endereco = endereco;
        this.score = score;
    }
}

module.exports = Pessoa;