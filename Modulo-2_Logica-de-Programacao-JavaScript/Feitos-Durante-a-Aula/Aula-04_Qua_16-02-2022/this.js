/**
 * Em JavaScript, usa-se this de forma semelhante ao uso de pronomes em linguagens naturais, como o inglês ou francês. 
 * Escreve-se: “João está correndo rápido porque ele está tentando pegar o trem”. Note o uso do pronome “ele”. 
 * Poderia se ter escrito: “João está correndo rápido porque João está tentando pegar o trem”. 
 * Não se reutiliza “João” dessa maneira. De uma maneira graciosamente semelhante, em JavaScript se usa a palavra-chave this como um atalho, um referente; 
 * ou seja, o sujeito no contexto ou o sujeito do código em execução.
 * 
 * Funções em JavaScript têm propriedades, assim como os objetos têm propriedades. E quando uma função é executada, 
 * ela obtém a propriedade this — uma variável com o valor do objeto que invoca a função na qual this é usado.
 */

const fn = function () {
    return this;
}

const obj = {
    nome: "Giu",
    falar: () => this
}

const globalObj = this;

console.log(fn());
console.log(globalObj);

const arrow = () => this;

console.log(globalObj === arrow());