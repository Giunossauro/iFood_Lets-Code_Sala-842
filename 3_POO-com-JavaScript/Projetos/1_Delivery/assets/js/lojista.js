const Pessoa = require("./pessoa");
const Prato = require("./prato")
const Cardapio = require("./cardapio");
const Pedido = require("./pedido")
const Cliente = require("./cliente")
const AppGerenciador = require("./appGerenciador")


class Lojista extends Pessoa {
    constructor(nome, cpf_cnpj, endereco, score, cardapio) {
        super(nome, cpf_cnpj, endereco, score)
        this.cardapio = cardapio
        this.entrarNoApp()
        this.listaPedidosLojista = []
    }
    
    entrarNoApp() {
        if (AppGerenciador.listaDeLojistas.some(algumLojista => algumLojista === this))
        {
            return 'Loja cadastrada anteriormente.'
        } else
        {
            AppGerenciador.listaDeLojistas.push(this)
            return 'Loja cadastrada com sucesso.'
        }
    }

    //Métodos para cardapio
    pratoExisteCardapio(nome) {
        return this.cardapio.pratoExiste(nome);
    }

    listarCardapio() {
        return this.cardapio.listaPratos;
    }

    incluirPrato(novoPrato) {
        return this.cardapio.incluirPrato(novoPrato)
    }

    removerPrato(pratoExistente) {
        return this.cardapio.removerPrato(pratoExistente)
    }

    alterarPrato(pratoExistente, novoPrato) {
        return this.cardapio.alterarPrato(pratoExistente, novoPrato)
    }
    // =========================
  
    //Métodos para pedidos
    listarPedidosPendentes() {
        let contador = 0
        let pedidosPendentes = ""
        AppGerenciador.listaPendentes.forEach(element => {
            if (element.lojista.id == this.id) {
                //console.log
                //(`--------Id----------\n${element.id}\n------Cliente-------\n${element.cliente}\n------Carrinho------\n${element.carrinho}`)
                pedidosPendentes.concat(
                    `Pedido ${++contador}\n`,
                    '\n--------Id----------',
                    element.id,
                    '\n------Cliente-------',
                    element.cliente.nome,
                    '\n------Carrinho------',
                    element.cliente.nome,
                    '\n------Preco------',
                    element.preco,
                )
                return pedidosPendentes
            } else {
                return 'Método falhou.'
            }
        })
    }

    aceitarPedido(id) {
        const pedido = AppGerenciador.listaPendentes.find(element => element.id == id)

        //AppGerenciador está dentro de confirmarLojista, na classe Pedido
        pedido.confirmarLojista()
        this.listaPedidosLojista.push(pedido)
    }

    // aceitarPedido(pedido) {
    //     pedido.confirmarLojista()
    //     this.listaPedidosLojista.push(pedido)
    // }
    //FALTA IMPLEMENTAR - Giu, 19:21, quinta - acho que agora implementei
      //o AppGerenciador para aceitarPedido está no pedido.confirmarLojista()

    recusarPedido(idPedido, motivo = "Lojista recusou") {
        const pedidoARecusar = AppGerenciador.listaPendentes.find(element => element.id == idPedido)
        if ((pedidoARecusar.confirmacaoLojista == false) &&
        (pedidoARecusar.confirmacaoEntregador == false)) {
            this.listaPedidosLojista = this.listaPedidosLojista.filter(pedido => pedido.id != pedidoARecusar.id)
            pedido.motivoCancelamento = motivo
            AppGerenciador.cancelarPedido(pedido)
            return 'Pedido recusado com sucesso!'
        }
        return 'Só se pode recusar um pedido não aceito e sem entregador.'
        
        //this.pedido.confirmarLojista()
        //this.listaPedidosLojista.push(pedido)
    } //FALTA IMPLEMENTAR

    cancelarPedido(idPedido, motivo = "Lojista desistiu") {
        const pedidoACancelar = AppGerenciador.listaSemEntregador.find(element => element.id == idPedido)
        if ((pedidoACancelar.confirmacaoLojista == true) &&
        (pedidoACancelar.confirmacaoEntregador == false)) {
            this.listaPedidosLojista = this.listaPedidosLojista.filter(pedido => pedido.id != pedidoACancelar.id)
            pedido.motivoCancelamento = motivo
            AppGerenciador.cancelarPedido(pedido)
            return 'Pedido cancelado com sucesso!'
        }
        return 'Só se pode cancelar um pedido aceito e sem entregador.'
        
        //this.pedido.confirmarLojista()
        //this.listaPedidosLojista.push(pedido)
    } //FALTA IMPLEMENTAR

    // recusar pedido => if confirmacaoLojista = false
    // cancelar pedido => if confirmacaoLojista = true && confirmacaoEntregador = false

    listarPedidosAtualizados() {
        return this.listaPedidosLojista
    }
}
module.exports = Lojista