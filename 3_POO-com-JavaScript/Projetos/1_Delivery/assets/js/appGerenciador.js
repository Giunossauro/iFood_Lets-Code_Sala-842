//const Pedido = require("./pedido");
/*
anotação particular de alguém
    entregador listaAndamento
    cliente tudo
    lojista tudo
*/

class AppGerenciador {
    static listaDeLojistas = []

    static listaPendentes = []     //quando o cliente envia o pedido, falta algum lojista aceitar
    static listaSemEntregador = [] //pedidos aceitos pelos lojistas
    static listaAndamento = []     //pedidos sendo entregues
    static listaFinalizados = []   //pedidos entregues e confirmados pelo motoboy e cliente
    static listaCancelados = []    //pedidos cancelados

    //muda o pedido do listaPendentes para listaSemEntregador
    static aceitaPedido(pedido) {
        const listaPendentes = AppGerenciador.listaPendentes
        
        AppGerenciador.listaSemEntregador.push(pedido)
        
        AppGerenciador.listaPendentes = listaPendentes.filter(
            pedidoAceito => pedidoAceito.id != pedido.id
        )
    }

    //muda o pedido do listaSemEntregador para listaAndamento
    static colocarEntregador(pedido) {
        const listaSemEntregador = AppGerenciador.listaSemEntregador
        
        AppGerenciador.listaAndamento.push(pedido)
        
        AppGerenciador.listaSemEntregador = listaSemEntregador.filter(
            pedidoAceito => pedidoAceito.id != pedido.id
        )
    }

    //muda o pedido do listaAndamento para listaCancelador
    static finalizaPedido(pedido) {
        const listaAndamento = AppGerenciador.listaAndamento
        
        AppGerenciador.listaFinalizados.push(pedido)
        
        AppGerenciador.listaAndamento = listaAndamento.filter(
            pedidoAceito => pedidoAceito.id != pedido.id
        )
    }

    //muda o pedido do listaSemEntregador para listaCancelados
    static cancelarPedido(pedido) {
        
        const listaSemEntregador = AppGerenciador.listaSemEntregador
        if (listaSemEntregador.some(element => element.id == pedido.id)){
            
            AppGerenciador.listaCancelados.push(pedido)
            
            AppGerenciador.listaSemEntregador = listaSemEntregador.filter(
                pedidoAceito => pedidoAceito.id != pedido.id
            )
        } else {
            const listaPendentes = AppGerenciador.listaPendentes
            
            AppGerenciador.listaCancelados.push(pedido)
            
            AppGerenciador.listaPendentes = listaPendentes.filter(
                pedidoAceito => pedidoAceito.id != pedido.id
            )
        }
    }
}

module.exports = AppGerenciador