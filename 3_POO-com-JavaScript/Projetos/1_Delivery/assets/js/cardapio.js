
const Prato = require('./prato')

class Cardapio {
    constructor(listaPratos){
        this.listaPratos = listaPratos;
    }
    
    pratoExiste(nome) {
        return this.listaPratos.some(prato => prato.nome === nome)
    }

    /*validandoPrato{
      if(!this.pratoExiste(prato.nome) && prato.tipo === undefined && prato)
    }*/
    
    incluirPrato(prato){
        if(!this.pratoExiste(prato.nome)) {
            this.listaPratos.push(prato);
            return `${prato.nome}, tipo: ${prato.tipo}, com valor de: ${prato.valor} reais. Foi adicionado com sucesso ao seu cardápio!`;
        }
        return `${prato.nome}, tipo: ${prato.tipo}, com valor de: ${prato.valor} reais. Já está no cardápio!`;
    }
    
    removerPrato(prato){
        if(!this.pratoExiste(prato.nome)){ 
            return `Não foi possível localizar ${prato.nome} no cardápio`;
        }    
        this.listaPratos.splice(this.listaPratos.indexOf(prato), 1);
        return `${prato.nome}, tipo: ${prato.tipo}, com valor de ${prato.valor} reais, foi removido com sucesso do cardápio!`;
    }
    
    alterarPrato(pratoAntigo, pratoNovo){
        this.removerPrato(pratoAntigo)
        this.incluirPrato(pratoNovo)
        return `${pratoNovo.nome} foi adicionado com sucesso no lugar do ${pratoAntigo.nome}`
    }
    
    //  listarPratos() {
    //     for (let i = 0; i < this.listaPratos.length; i++) {
    //       //if (this.listaPratos[i].tipo == tipo) {
    //         if (i === 0) {console.log(`Pratos do cardápio:`)}
    //         console.log(`Prato: ${i + 1},       
    //             ${this.listaPratos[i].nome}, preço: ${this.listaPratos[i].valor}
    //             Ingredientes: ${this.listaPratos[i].ingredientes}`
    //         )
    //       //}
    //     }
    // } 

    listarPratos() {
      return this.listaPratos;
    } 
    
    buscarPrato(nome){
        const porNome = prato => prato.nome === nome
        const pratoEncontrado = this.listaPratos.filter(porNome)
        
        if (pratoEncontrado.length === 0){
            return "Prato não encontrado!"
        }
        
        return pratoEncontrado[0]
    }
}

module.exports = Cardapio;