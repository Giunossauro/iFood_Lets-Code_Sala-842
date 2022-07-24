const Pessoa = require("./pessoa")
const Pedido = require("./pedido")
const AppGerenciador = require("./appGerenciador")

class Entregador extends Pessoa {
    constructor(nome, cpf_cnpj, endereco, score) {
        super(nome, cpf_cnpj, endereco, score)
        this.estaDisponivel = false
        this.listaEntrega = []
    }

    //o entregador só pode aceitar pedido se estiver aberto o turno
    abreTurno(quantidadeDePedidos = 1) {
        if ((quantidadeDePedidos < 1) || (quantidadeDePedidos > 5)) {
            return "Escolha mais que 1 ou menos que 5 pedidos para entregar."
        }
        this.estaDisponivel = true
        this.quantidadeDePedidos = quantidadeDePedidos
        return `Turno aberto faça ${this.quantidadeDePedidos} entregas.`
    }

    // Aqui devolve uma lista de pedidos com o id a amostra
    //o entregador pode ver pedidos sem abrir seu turno
    verPedidos() {
        return AppGerenciador.listaSemEntregador
    }
    
    //o aceitarPedido vai mudar o pedido de AppGerenciador.listaSemEntregador para .listaAndamento, e...
    //... também vai colocar o pedido na lista particular do entregador colocar o nome do entregador no...
    //... objeto do pedido.
    aceitarPedido(idPedido) {
        const pedido = AppGerenciador.listaSemEntregador.filter(element => element.id == idPedido)
        if (this.estaDisponivel) {
            if (this.listaEntrega.length >= this.quantidadeDePedidos) {
                return 'Sua lista de entregas já está cheia.'
            }
            this.listaEntrega.push(pedido)
            let retorno = `Você já tem ${this.listaEntrega.length} pedido(s).`
            if (this.quantidadeDePedidos - this.listaEntrega.length) {
                retorno = retorno.concat(`Selecione mais ${
                        this.quantidadeDePedidos - this.listaEntrega.length
                    } para sair para entrega.`)
            }

            //já vai para o AppGerenciador (está incluso no pedido.receberEntregador)
            console.log("pedido")
            console.log(pedido)
            pedido.receberEntregador(this)
            return retorno
        }
        else { //mantive o else pra ficar mais legível Giu 19:02 sexta
            return 'Inicie o turno antes de aceitar um pedido.'
        }
    }

    //o pedido.finalizarPedido() só funciona se o cliente confirmar q recebeu. Ele tbm chama este método, 
    //que vai funcionar pra quem chamar por último
    entregaPedidoCliente(idPedido) {
        const pedido = AppGerenciador.listaAndamento.filter(element => element.id == idPedido)
        this.listaEntrega = this.listaEntrega.filter(element => element.id != pedido.id)
        pedido.confirmacaoEntregue = true
        pedido.finalizarPedido()
    }

    //abreTurno() e fechaTurno() simula se ele entra no app, mas ta só olhando e não via entregar
    fechaTurno() {
        if(this.listaEntrega.length == 0){
            this.estaDisponivel = false
            console.log("Bom descanso!")
        }
        else {
            console.log("Você ainda tem pedidos no Bag")
        }
    }
}

module.exports = Entregador