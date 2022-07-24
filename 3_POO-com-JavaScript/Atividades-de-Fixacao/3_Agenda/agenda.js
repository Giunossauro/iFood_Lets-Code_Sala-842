/* Crie uma modelagem de classes para uma agenda capaz de armazenar
contatos. Através dessa agenda é possível
 incluir, ok
 remover, ok
 buscar e
 listar
contatos já cadastrados. */

class Agenda{
    #contatos = [];
    adicionarContato(contato){
        this.#contatos.push(contato);
    }

    removerContato(id){
        if(!isNaN(id)){
            let removido;
            this.#contatos = this.#contatos.filter(function(valor){
                if (id == valor.id) removido = true;
                return id != valor.id;
            });
            if(removido){
                console.log("Contato removido.");
                return;
            }
            console.log("Contato não encontrato.")
        }
    }

    buscarContato(query){
        let achou = false;
        let resultado = "Nenhum contato encontrato. Por favor, verifique o termo buscado.";
        this.#contatos.forEach(function(contato){
            Object.values(contato).forEach(function(atributo){
                if (atributo.toString().includes(query) && achou){
                    resultado = "Foram encontrados mais de um contato. Por favor, especifique melhor a busca."
                }
                else if(atributo.toString().includes(query) && !achou){
                    resultado = contato;
                }
            });
        });
        return resultado;
    }

    listarContatos(){
        return this.#contatos;
    }
}

class Contato{
    static gid = 0;
    constructor(nome, telefone){
        this.id = Contato.gid++;
        this.nome = nome;
        this.telefone = telefone;
    }
}
console.log("\n\n\n\n\n\n\n");

const agenda = new Agenda();

agenda.adicionarContato(new Contato("Fulano","(11) 98765-4321"));
agenda.adicionarContato(new Contato("Ciclano","(11) 92345-6521"));
agenda.adicionarContato(new Contato("Beltrano","(11) 99885-8555"));

let contato1 = agenda.buscarContato("Fulan");
let contato2 = agenda.buscarContato("92345-6521");
let contato3 = agenda.buscarContato("998858555");

console.log("Veja os dados do contato 1: ");
console.log(contato1);
console.log("============================================================================");

console.log("Veja os dados do contato 2: ");
console.log(contato2);
console.log("============================================================================");

console.log("Veja os dados do contato 3: ");
console.log(contato3);
console.log("============================================================================");

console.log("Contatos antes da remoção:");
console.log(agenda.listarContatos());
console.log("============================================================================");

console.log("Removendo contato 2 buscando por parte de um atributo:");
agenda.removerContato(contato2.id);
console.log("============================================================================");

console.log("Contatos depois da remoção:");
console.log(agenda.listarContatos());