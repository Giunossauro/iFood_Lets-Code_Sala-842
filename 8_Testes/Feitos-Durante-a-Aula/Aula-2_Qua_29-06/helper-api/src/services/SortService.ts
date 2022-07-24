export enum TipoOrdenacao {
  Asc = 0,
  Desc = 1
}

export class SortService {
  getSort = (
    palavras: (string | number)[],
    removerDuplicados: boolean,
    ordenacao?: TipoOrdenacao
  ): (string | number)[] => {
    let result = [...palavras]

    if (ordenacao !== null && Object.values(TipoOrdenacao).includes(ordenacao!)) {
      result.sort()

      if (ordenacao === TipoOrdenacao.Desc)
        result.reverse()
    }

    if (removerDuplicados)
      result = [...new Set(result)]

    return result
  }
}