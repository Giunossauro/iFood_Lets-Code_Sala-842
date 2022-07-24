class Usuario {
    #nome;
    #sexo;
    #email;

    constructor(nome, sexo, email){
        this.#nome = nome;
        this.#sexo = sexo;
        this.#email = email;
    }

    getNome(){
        return this.#nome;
    }

    getSexo(){
        return this.#sexo;
    }

    getEmail(){
        return this.#email;
    }

    setNome(valor){
        this.#nome = valor;
    }

    setSexo(valor){
        this.#sexo = valor;
    }

    setEmail(valor){
        this.#email = valor;
    }
}

const usuario = new Usuario("Fulano", "masc", "mm@mmm.com");
console.log(usuario.getNome());
console.log(usuario.getSexo());
console.log(usuario.getEmail());
usuario.setNome("Testiano");
console.log(usuario.getNome());