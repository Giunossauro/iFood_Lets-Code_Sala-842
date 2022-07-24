class Prato {
    constructor(nome, tipo, valor, ingredientes){
        
        this.nome = nome;
        if (isNaN(tipo) && (tipo == 'Entradas' || tipo == 'Principais' || tipo == 'Bebidas' || tipo == 'Sobremesas')){
            this.tipo = tipo;
        } else {
            console.log('Não existe esse tipo de prato!')
        }
        if (Number(valor) && valor > 0){
            this.valor = valor;
        } else {
            console.log('O valor deve ser um número maior que 0!')
        } 
        this.ingredientes = ingredientes;
    }
}

module.exports = Prato