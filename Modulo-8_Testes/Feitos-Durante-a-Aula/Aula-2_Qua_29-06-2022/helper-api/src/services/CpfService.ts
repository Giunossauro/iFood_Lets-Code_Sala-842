export class CpfService {
  //constructor(){}
  validate(bruteCpf: string): boolean {

    if (bruteCpf.length > 14 || bruteCpf.length < 11)
      return false

    const cpf: string = bruteCpf.replace(".","").replace(".","").replace("-","")
    
    if (isNaN(Number(cpf)))
      return false

    let repeatedCount: number = 0;

    for (let outerIndex: number = 0; outerIndex < 9; outerIndex++) {
      for (let innerIndex: number = 0; innerIndex < 9; innerIndex++) {
        if (outerIndex == innerIndex) continue
        if (cpf[outerIndex] == cpf[innerIndex]) repeatedCount++
      }
    }

    if (repeatedCount == 72) // 78 = 9*8 => pq o inner tem 1 q repete pq é o msm
      return false

    const cpfArray: number[] = cpf.split("").map(char => Number(char))

    const verifyingDigits: number[] = this.#generateVerifyingDigits(cpfArray.slice(0,9))

    return cpfArray[9] == verifyingDigits[0] && cpfArray[10] == verifyingDigits[1]
  }

  generate(): string {
    let baseCpf: number[] = []

    for (let index: number = 0; index < 9; index++){
      baseCpf.push(Math.floor(Math.random() * 10))
    }

    return baseCpf.concat(
      this.#generateVerifyingDigits(baseCpf)
    ).join("")
  }

  #generateVerifyingDigits(baseCpf: number[]): number[]{
    const verifyingDigits: number[] = []
    for (let cpfIndex = 10; cpfIndex <= 11; cpfIndex++){
      verifyingDigits.push((
        (!verifyingDigits[0] ? baseCpf : [...baseCpf, verifyingDigits[0]])
        .map((value: number, mapIndex: number) => value * (cpfIndex - mapIndex))
        .reduce((prev: number, cur: number) => prev + cur)
        * 10
      ) % 11)
    }
    return verifyingDigits
  }
}
/*
 #generateVerifyingDigits(baseCpf: number[]): number[]{
    const firstVerifyingDigit: number = (
      baseCpf
      .map((value: number, index: number) => value * (10 - index))
      .reduce((prev: number, cur: number) => prev + cur)
      * 10
    ) % 11
    
    const secondVerifyingDigit: number = (
      [...baseCpf, firstVerifyingDigit]
      .map((value: number, index: number) => value * (11 - index))
      .reduce((prev: number, cur: number) => prev + cur)
      * 10
    ) % 11
  }
*/