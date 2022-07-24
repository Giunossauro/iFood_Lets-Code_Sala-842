const AppGerenciador = require("./appGerenciador")

class Pedido {
    static contadorId = 0
        
    constructor(lojista, carrinho, cliente, preco) {
        this.id = ++Pedido.contadorId
        this.lojista = lojista
        this.carrinho = carrinho
        this.cliente = cliente
        this.preco = preco
        this.confirmacaoLojista = false //pelo lojista
        this.confirmacaoEntregador = false //pelo entregador antes de entregar
        this.confirmacaoEntregue = false //pelo entregador depois de entregar
        this.confirmacaoRecebibo = false //pelo cliente
        this.estaCancelado = false
        this.dataCriacao = new Date(); //Giu: mudei 19:19 da quinta, antes era: Date(Date.now())
        this.dataFinalizacao = 0;
    }
    
    confirmarLojista() {
        this.confirmacaoLojista = true;
        AppGerenciador.aceitaPedido(this)
    }
    
    receberEntregador(entregador) {
        this.entregador = entregador;
        this.confirmacaoEntregador = true;
        AppGerenciador.colocarEntregador(this);
    }

    finalizarPedido() {
        if (this.confirmacaoEntregue && this.confirmacaoRecebibo) {
            this.dataFinalizacao = new Date()
            AppGerenciador.finalizarPedido(this)
        }
    }
}

module.exports = Pedido;