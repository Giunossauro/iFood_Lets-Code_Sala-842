const BeneficiosColaborador = require("./BeneficiosColaborador")

class Colaborador {
    #nome
    #funcao
    #salario
    #beneficios
    constructor(nome, funcao, salario){
        this.#nome = nome;
        this.#funcao = funcao;
        this.#salario = salario;
        this.#calcularBeneficios();
    }

    get nome() {
        return this.#nome;
    }

    get funcao() {
        return this.#funcao;
    }

    get salario() {
        return this.#salario;
    }

    get beneficios() {
        return this.#beneficios;
    }

    set nome(string) {
        this.#nome = string;
    }

    set funcao(string) {
        this.#funcao = string;
    }

    set salario(string) {
        this.#salario = string;
        this.#calcularBeneficios();
    }

    #calcularBeneficios(){
        this.#beneficios = new BeneficiosColaborador(
            this.#salario * 0.11,
            this.#salario * 0.8
        );
    }
}

/* const obj = {}

Object.defineProperty(obj,nome,"fulano");
obj.nome */

module.exports = Colaborador;