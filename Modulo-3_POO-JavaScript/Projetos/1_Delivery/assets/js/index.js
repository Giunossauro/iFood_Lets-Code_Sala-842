  // CONSTS DE IMPORTACAO

const Pessoa = require("./pessoa");
const Cliente = require("./cliente");
const Entregador = require("./entregador");
const Lojista = require("./lojista");
const Prato = require("./prato")
const Cardapio = require("./cardapio");
const Endereco = require("./endereco");
const Pedido = require("./pedido");
const AppGerenciador = require("./appGerenciador");

// CONSTS DE IMPORTACAO

/*TESTESPADRONIZADOS-TESTESPADRONIZADOS-TESTESPADRONIZADOS-TESTESPADRONIZADOS*/

console.log('------------ Passo 0 -> Inicialização das Variáveis ------\n')
// Pratos
const pizzaCalabresa = new Prato('Pizza Calabresa', 'Principais', 25, 'calabresa e muçarela')
const mcChicken = new Prato('McChicken', 'Principais', 20, 'pão com gergelim, frango empanado crocante, maionese e alface')
const bigMac = new Prato('BigMac', 'Principais', 24, 'pão, queijo, molho especial, dois hamburgueres, alface e tomate')
const sopaVerde = new Prato('Sopa Verde', 'Principais', 11, 'tempero especial, espinafre, calabresa')
const sucoDetox = new Prato('Suco Detox', 'Bebidas', 11, 'limão, cenoura, hortelã')

//Cardapios
const cardapioFausto = new Cardapio([pizzaCalabresa, sopaVerde, sucoDetox])
const cardapioPizzaria = new Cardapio([pizzaCalabresa])
const cardapioMcDonalds = new Cardapio([mcChicken, bigMac])

//Endereços
// >>> Endereços Lojistas:
const enderecoPizzariaVeridiana = new Endereco('Rua das Alfaces', 777, 'Hortaliças', 'Cidade Vegetal', '28820-000')
const enderecoLojistaFausto = new Endereco('Rua Meire', 191, 'Bairro Monte', 'Águas Claras', 67000000)
const enderecoMcDonalds = new Endereco('Rua das Couves', 666, 'Hortaliças', 'Cidade Vegetal', '28820-001')

// >>> Endereços Clientes:
const enderecoPedro = new Endereco('Rua Pereira', 441, 'Castelo Norte', 'Águas Claras', 64530000)

//Lojistas
const pizzariaVeridiana = new Lojista('Pizzaria Veridiana', '12345678901', enderecoPizzariaVeridiana, 4.6, cardapioPizzaria)
const lojistaFausto = new Lojista('Fausto', '7495825940', enderecoLojistaFausto, 5.0, cardapioFausto)
const mcDonalds = new Lojista('McDonalds', '01234567890', enderecoMcDonalds, 5.0, cardapioMcDonalds)

//Clientes
const clientePedro = new Cliente('Pedro', '3495830941', enderecoPedro, 4.6)

//Entregador
const entregadoraSilvia = new Entregador('Silvia', '7318250943', 52520000, 5.0)


console.log('------------ Passo 1 -> Testes de Lojista (parte 01) -----\n')

console.log('===== Visualizando Lojistas\n')
console.log(pizzariaVeridiana)
console.log(lojistaFausto)
console.log(mcDonalds)

// ===== Visualizando Cardapios dos Lojistas
console.log('===== Visualizando Cardapios dos Lojistas\n')

console.log(pizzariaVeridiana.nome + ' Cardápio:')
console.log(pizzariaVeridiana.listarCardapio())

console.log(lojistaFausto.nome + ' Cardápio:')
console.log(lojistaFausto.listarCardapio())

console.log(mcDonalds.nome + ' Cardápio:')
console.log(mcDonalds.listarCardapio()) 

// ===== Incluindo, Removendo e Alterando pratos no cardápio através dos lojistas
console.log('==== Incluindo, Removendo e Alterando pratos no cardápio através dos lojistas\n')

const pizzaFrango = new Prato('Pizza de Frango', 'Principais', 25, 'Frango, muçarela e vebola.')
const pizzaPortuguesa = new Prato('Pizza Portuguesa', 'Principais', 28, 'calabresa, muçarela, presunto, tomate, cebola e pimentão')
const pizzaTresQueijos = new Prato('Pizza 3 Queijos', 'Principais', 28, 'muçarela, gorgonzola, parmesão')

console.log(pizzariaVeridiana.incluirPrato(pizzaFrango))
console.log(pizzariaVeridiana.incluirPrato(pizzaPortuguesa))
console.log(pizzariaVeridiana.incluirPrato(pizzaTresQueijos))

console.log(pizzariaVeridiana.listarCardapio())

console.log(pizzariaVeridiana.removerPrato(pizzaPortuguesa))

const pizzaQuatroQueijos = new Prato('Pizza 4 Queijos', 'Principais', 28, 'muçarela, gorgonzola, parmesão e provolone')

console.log(pizzariaVeridiana.alterarPrato(pizzaTresQueijos, pizzaQuatroQueijos))

console.log(pizzariaVeridiana.listarCardapio())

console.log('------------ Passo 2 -> Testes de Cliente ----------------\n')

console.log(clientePedro.listarEnderecos())
console.log(clientePedro.cadastrarNovoEndereco(enderecoPedro))

const segundoEnderecoPedro = new Endereco('Rua Macieira', 442, 'Castelo Sul', 'Águas Escuras', 74530000);

console.log(clientePedro.cadastrarNovoEndereco(segundoEnderecoPedro))

console.log(clientePedro.listarEnderecos())

console.log(clientePedro.escolherEndereco(segundoEnderecoPedro))
console.log(clientePedro.removerEndereco(segundoEnderecoPedro))

console.log(clientePedro.listarEnderecos())

console.log(clientePedro.listarLojistas())

console.log(clientePedro.escolherLojista(lojistaFausto))
console.log(clientePedro.escolherLojista(mcDonalds))

console.log(`As lojas disponníveis são: ${clientePedro.listarCarrinho()}`)

console.log(clientePedro.adicionarItemCarrinho('Suco Detox'))
console.log(clientePedro.adicionarItemCarrinho('Pizza Calabresa'))
console.log(clientePedro.adicionarItemCarrinho('Sopa Verde'))

console.log(clientePedro.adicionarItemCarrinho('BigMac'))
const coca = new Prato('Coca-Cola', 'Bebidas', 7, '---')
const guarana = new Prato('Guaraná', 'Bebidas', 6, '---')
console.log(mcDonalds.incluirPrato(coca))
console.log(mcDonalds.incluirPrato(guarana))
console.log(clientePedro.adicionarItemCarrinho('Coca-Cola'))
console.log(clientePedro.adicionarItemCarrinho('Guaraná'))

console.log(clientePedro.listarCarrinho())

console.log(clientePedro.removerItemCarrinho('Guaraná'))

console.log(clientePedro.listarCarrinho())

console.log(clientePedro.gerarPedido())
console.log(clientePedro.listarPedidoAtual())
console.log(clientePedro.encaminharPedido())

console.log('------------ Passo 3 -> Testes de Lojista (parte 02) -----')

//Giu refatorou com return 18:38 e continuou desde então
console.log(mcDonalds.listarPedidosPendentes())// (está no console.log)
//mcDonalds.aceitarPedido(id)
console.log(mcDonalds.listarPedidosPendentes())

//console.log(mcDonalds.recusarPedido(1, "não quero!!!")) //comentar para aceitar
console.log(mcDonalds.aceitarPedido(1)) // id do pedido do Pedro - ja envia ao entregador - precisamos desmembrar
//console.log(mcDonalds.cancelarPedido(1, "mudei de ideia")) //comentar para continuar
console.log(mcDonalds.listarPedidosAtualizados()) //retorna um objeto monstruoso

//metodos de manipulação de cardápio já foram testados

console.log('------------ Passo 4 -> Testes de Entregador -------------')
//entregadoraSilvia
console.log(entregadoraSilvia.abreTurno())
console.log(entregadoraSilvia.verPedidos())
