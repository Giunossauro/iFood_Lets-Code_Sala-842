const fn = function () {
    return this;
}

const obj = {
    nome: "Giu",
    falar: () => this
}

const globalObj = this;

console.log(fn());
console.log(globalObj);