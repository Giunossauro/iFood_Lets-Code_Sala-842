import { SortService, TipoOrdenacao } from "../../../src/services/SortService"

describe('Realizando caso de teste na classe SortService', () => {
  let _service: SortService

  it('Deveria construir corretamenta a classe SortService', () => {
    _service = new SortService()
  })

  it ('O método getSort deveria me retornar ["a", "b", "c"], quando lhe for passado ["c", "a", "b"]', () => {
    // Arrange
    const palavras = ["c", "a", "b"]
    const numbers = [3, 1, 2]
    const removerDuplicados = true
    const ordenacao = TipoOrdenacao.Asc
    const resultadoEsperadoString = ["a", "b", "c"]
    const resultadoEsperadoNumber = [1, 2, 3]

    // Act
    const resultString: (string | number)[] = _service.getSort(palavras, removerDuplicados, ordenacao)
    const resultNumber: (string | number)[] = _service.getSort(numbers, removerDuplicados, ordenacao)

    // Assert
    expect(resultString).toStrictEqual(resultadoEsperadoString)
    expect(resultNumber).toStrictEqual(resultadoEsperadoNumber)
  })

  it ('O método getSort não deveria estourar erro, quando a ordenação for undefined e deveria me retornar as palavras sem alteração', () => {
    // Arrange
    const palavras = ["a", "b", "c"]
    const removerDuplicados = false
    const ordenacao = undefined

    // Act
    // Assert
    expect(() => _service.getSort(palavras, removerDuplicados, ordenacao)).not.toThrowError()
  })
})
