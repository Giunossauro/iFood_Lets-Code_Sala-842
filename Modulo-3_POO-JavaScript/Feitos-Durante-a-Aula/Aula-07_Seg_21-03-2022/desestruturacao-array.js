const carros = ["Fiat Mobi", "Fiat Toro", "Hyunday HB20", "Honda Civic"];

const novoArray1 = carros;
const novoArray2 = [...carros];

carros[0] = "Toyota Corolla";

console.log(carros);
console.log(novoArray1);
console.log(novoArray2);

// usando o spread, o array passa por valor, não por referência (padrão)

