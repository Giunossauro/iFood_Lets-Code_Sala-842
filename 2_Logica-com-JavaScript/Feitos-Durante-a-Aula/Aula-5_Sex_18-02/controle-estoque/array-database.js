const produtos = [{
    id: 1,
    nome: 'Arroz',
    quantidade: 10,
    valorEntrada: 7.50,
    margemLucro: 1.4,
    unidadeMedida: 'un',
    categoria: 'cereais',
    frente: 'cereais',
    fornecedor: 'Camil'
},{ 
    id: 2,
    nome: 'Feijão',
    quantidade: 15,
    valorEntrada: 5.50,
    margemLucro: 1.4,
    unidadeMedida: 'un',
    categoria: 'cereais',
    frente: 'cereais',
    fornecedor: 'Tio João'
},{
    id: 3,
    nome: 'Óleo de Soja',
    quantidade: 11,
    valorEntrada: 3.50,
    margemLucro: 1.4,
    unidadeMedida: 'un',
    categoria: 'condimentos',
    frente: 'condimentos',
    fornecedor: 'Soya'
},{
    id: 4,
    nome: 'Maionese',
    quantidade: 7,
    valorEntrada: 15.00,
    margemLucro: 1.4,
    unidadeMedida: 'un',
    categoria: 'condimentos',
    frente: 'condimentos',
    fornecedor: 'Heinz'
}];


const cadastrarProdutos = function(produto) {
    if(!produto.nome) {
        return console.log('Produto sem nome');
    }

    if(produto.quantidade < 0) {
        return console.log('Produto sem quantidade');
    }

    if(produto.valorEntrada <= 0) {
        return console.log('Produto sem preço de custo');
    }

    if(produto.margemLucro  <= 0) {
        return console.log('Produto sem margem de lucro');
    }

    produtos.push(produto);

    return produto;
}

const buscarProdutos = function () {
    return produtos;
}

const buscarProdutoPorId = function (idProduto) {
    let produto = {};

    produtos.forEach((elemento) => {
        if(elemento.id === idProduto) {
            produto = elemento;
        }
    })

    return produto;
}

const buscaGenerica = function (chave, valor) {
    let arrayProdutos = [];

    produtos.forEach((elemento) => {
        if(elemento[chave].toUpperCase() === valor.toUpperCase()) {
            arrayProdutos.push(elemento);
        }
    })

    return arrayProdutos;
}

const atualizarProduto = function(id, chave, valor) {
    if(chave === 'id') {
        return console.log('Não é possível alterar o ID');
    }
    produtos.forEach((elemento) => {
        if(elemento.id === id) {
            elemento[chave] = valor;
        }
    });
}

const deletarProdutoById = function(id) {
    produtos.forEach((elemento, i) => {
        if(elemento.id === id) {
            produtos.splice(i, 1);
            console.log(produtos);
        }
    });
}

const cadastrarVenda = function (venda){
    if(!venda.idProduto){
        return console.log("Id do produto não informado");
    }

    if(!venda.quantidade){
        return console.log("Quantidade não informada");
    }

    vendas.push(venda);

    const produto = buscarProdutoPorId(venda.idProduto);

    if(produto.quantidade <= 0){
        return console.log("Produto nao encontrado");
    }

    if(produto.quantidade < venda.quantidade){
        console.log("Quantidade indisponivel\n")
    }

    venda["preco"] = produto.valorEntrada * produto.margemLucro;

    atualizarProduto(venda.idProduto, produto.quantidade, produto.quantidade - 1);

}

module.exports = {
    cadastrarProdutos,
    buscarProdutos,
    buscarProdutoPorId,
    buscaGenerica,
    atualizarProduto,
    deletarProdutoById,
    cadastrarVenda
}