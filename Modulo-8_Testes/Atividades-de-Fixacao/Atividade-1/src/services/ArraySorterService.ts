export class ArraySorterService {
  constructor() {}

  arraySorter = (arrayDePalavras: string[]): string[] => {
    console.log(arrayDePalavras);
    arrayDePalavras = ["a","b"];
    return arrayDePalavras;
  };
}
