/*
Criar uma classe que implemente o reajuste
salarial de um colaborador.

Esta classe receberá como argumento o
colaborador e o percentual de reajuste
dele e fará o recalculo dos benefícios
dele.

Vamos criar, também, uma classe chamada
Colaborador, que terá como atributos o
nome, a função e o salário dele.

A classe ReajusteSalarial deverá retornar
apenas o nome do colaborador e o novo
salário dele.
*/

const Colaborador = require("./Colaborador")

class ReajusteSalarial{
    #colaborador;
    #percentualReajuste;
    constructor(novoColaborador, percentualReajuste){
        this.#colaborador = novoColaborador;
        this.#percentualReajuste = percentualReajuste;
    }

    #reajustarSalario(){
        this.#colaborador.salario = (this.#colaborador.salario * (this.#percentualReajuste + 1)).toLocaleString("pt-br",{});
    }

    #calcularBeneficios

    mostrarNovoSalario(){
        this.#reajustarSalario();
        return `
            Colaborador: ${this.#colaborador.nome}
            Novo salário: ${this.#colaborador.salario}
        `
    }

    mostrarBeneficiosColaborador(){
        return this.#colaborador.mostrarNovoSalario;
    }
}

const colaborador = new Colaborador("Fulano", "programador", 10000);
const salario = new ReajusteSalarial(colaborador, 0.3);

console.log(salario.mostrarNovoSalario());
console.log(salario.mostrarBeneficiosColaborador());