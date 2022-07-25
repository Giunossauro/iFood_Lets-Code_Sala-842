const pessoa = {
    nome: "Amaro",
    sobrenome: "Silva",
    id: 25,
    sexo: "M",
    endereco: {
        rua: "Rua A",
        numero: 254,
        complemento: "Bloco 54"
    }
};

// em obj literal as novas var precisam ter mesmo nome do obj
const {nome, sobrenome} = pessoa;
 
// ... em https://www.geeksforgeeks.org/javascript-spread-operator/
const {cpf, ...pessoaSemCPF} = pessoa;

console.log("=====================");
console.log(nome);
console.log(sobrenome);
console.log("=====================");

console.log("=====================");
console.log(pessoaSemCPF);
console.log(cpf);
console.log("=====================");