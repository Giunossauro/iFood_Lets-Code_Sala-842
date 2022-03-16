class BeneficiosColaborador{
    #colaborador
    #inss
    #fgts
    constructor(colaborador, inss, fgts){
        this.#colaborador = colaborador;
        this.#inss = inss;
        this.#fgts = fgts;
    }

    mostrarBeneficios(){
        return `
            INSS: ${this.#inss}
            FGTS: ${this.#fgts}
        `
    }

    get inss() {
        return this.#inss;
    }

    get fgts() {
        return this.#fgts;
    }

    set inss(valor) {
        this.#inss = valor;
    }

    set fgts(valor) {
        this.#fgts = valor;
    }
}

module.exports = BeneficiosColaborador;