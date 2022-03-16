class Usuario {
    #nome;
    #sexo;
    #email;

    constructor(nome, sexo, email){
        this.#nome = nome;
        this.#sexo = sexo;
        this.#email = email;
    }

    get nome(){
        return this.#nome;
    }

    get sexo(){
        return this.#sexo;
    }

    get email(){
        return this.#email;
    }

    set nome(valor){
        this.#nome = valor;
    }

    set sexo(valor){
        this.#sexo = valor;
    }

    set email(valor){
        this.#email = valor;
    }
}

const usuario = new Usuario("Fulano", "masc", "mm@mmm.com");
console.log(usuario.getNome());
console.log(usuario.getSexo());
console.log(usuario.getEmail());
usuario.setNome("Testiano");
console.log(usuario.getNome());