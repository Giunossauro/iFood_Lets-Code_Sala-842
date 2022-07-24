// Falta: fechar pedido, cancelar pedido realizado (se não houver entregador)
const Pessoa = require("./pessoa")
const Pedido = require("./pedido")
const AppGerenciador = require("./appGerenciador");
const Lojista = require("./lojista")

class Cliente extends Pessoa {
    constructor(nome, cpf_cnpj, endereco, score) {
        super(nome, cpf_cnpj, endereco, score)
        this.listaCarrinho = []
        this.listaEndereco = []
        this.listaEndereco.push(endereco)
        this.enderecoEscolhido = endereco
        this.temPedidoComLojista = false
        this.pedido
    }
  
    listarEnderecos(){
        return this.listaEndereco
    }

    cadastrarNovoEndereco(novoEndereco) {
        if(this.endereco.id !== novoEndereco.id){
          this.listaEndereco.push(novoEndereco);
          return 'Esse endereço foi cadastrado com sucesso!'
        }
        return 'Esse endereco já está cadastrado!'
    }
    
    escolherEndereco(outroEndereco) {
        this.enderecoEscolhido = this.listaEndereco.filter(endereco => endereco.id == outroEndereco.id)
        return this.enderecoEscolhido
    }
    
    removerEndereco(enderecoRemovido){
        if (this.listaEndereco.length <= 1) {
            return 'Não é possível remover seu único endereço.'
        }
        if (this.listaEndereco.some(elemento => elemento.id == enderecoRemovido.id)) {
            this.listaEndereco = this.listaEndereco.filter(endereco => endereco.id !== enderecoRemovido.id)
            if (enderecoRemovido.id != this.enderecoEscolhido.id){
                this.enderecoEscolhido = this.listaEndereco[this.listaEndereco.length - 1]
                return `Endereco ${enderecoRemovido.id} removido! Como era seu endereco atual, seu novo endereco atual é ${this.enderecoEscolhido.id}`;
            }
            return `Endereco ${enderecoRemovido.id} removido.`
        }
        return "Impossível, esse endereço não existe!"
    }

    listarLojistas() {
        let impressao = ``
        AppGerenciador.listaDeLojistas.forEach(lojista => impressao = impressao +`${lojista.nome}\n`);
        return impressao
    }
    
    escolherLojista(lojista) {
        this.lojista = lojista
        return `O lojista escolhido é ${this.lojista.nome}`
    }

    listarCardapio() {
        if(this.lojista) {
            return this.lojista.listarCardapio()
        } 
        return 'Erro, escolha um restaurante antes!'
    }

    adicionarItemCarrinho(nome) {
        const indexDoPrato = this.lojista.cardapio.listaPratos.findIndex((element) => element.nome == nome);
        if (indexDoPrato >= 0) {
            this.listaCarrinho.push(this.lojista.cardapio.listaPratos[indexDoPrato])
            return `Prato: ${nome} adicionado.`
        } 
        return 'Esse prato não existe nesse restaurante!'
    }

    listarCarrinho() {
        if (this.listaCarrinho.length == 0) {
            return 'Seu carrinho está vazio. Vá escolher comidas!'
        }
            return this.listaCarrinho
      }
  
    removerItemCarrinho(nome) {
        const indexDoPrato = this.lojista.cardapio.listaPratos.findIndex((element) => element.nome == nome);
        if (indexDoPrato >= 0) {
            this.listaCarrinho = this.listaCarrinho.filter(prato => prato.nome != nome)
            return `${nome} removido com sucesso!`
        }
        return 'Esse prato não existe nesse carrinho!'
    }

    limparCarrinho(){
        if(this.listaCarrinho.length == 0){
          return `Carrinho já está vazio`
        }
        this.listaCarrinho = []
        return 'O carrinho foi esvaziado!'
    }
    // ===============

    // Pedido
  
    gerarPedido() {
        if (this.listaCarrinho.length == 0) {
            return 'Seu carrinho está vazio. Vá escolher comidas!'
        }
        let preco = 0
        this.listaCarrinho.forEach(prato => { preco += prato.valor
        });
        this.pedido = new Pedido(this.lojista, this.listaCarrinho, this, preco)
        this.listaCarrinho = []
        return 'Pedido gerado com sucesso.'
    }

    listarPedidoAtual(){
        return this.pedido
    }

    encaminharPedido() {
        if (this.temPedidoComLojista) {
            return 'Você já tem um pedido!'
        }
        this.temPedidoComLojista = true
        AppGerenciador.listaPendentes.push(this.pedido)
        return 'Pedido encaminhado ao restaurante.'
    }

    cancelarPedido(motivo = "Cliente desistiu.") {
        if (this.pedido != null) {
            if (this.pedido.confirmacaoEntregador == false) {
                this.temPedidoComLojista = false
                this.pedido.estaCancelado = true
                this.pedido.motivoCancelamento = motivo
                AppGerenciador.cancelarPedido(this.pedido)
                console.log('Pedido cancelado com sucesso.')
            }
            else{
                console.log('Pedido já saiu para a entrega e não pode ser cancelado!')
            }
        }
        else{
            console.log('Pedido não existe, sua lista está vazia!')
        }
    }

    receberPedidoEntregue(idPedido) {
        const pedido = AppGerenciador.listaAndamento.filter(element => element.id == idPedido)
        pedido.confirmacaoRecebido = true
        pedido.finalizarPedido()
        this.temPedidoComLojista = false
        return "Bom apetite!"
    }

    // pratoExisteLojista(nome) {
    //     if(this.lojista) {
    //         return this.lojista.pratoExisteCardapio(nome)
    //     } else {
    //         return 'Erro, escolha um restaurante antes!'
    //     }
    // }
  
}

module.exports = Cliente