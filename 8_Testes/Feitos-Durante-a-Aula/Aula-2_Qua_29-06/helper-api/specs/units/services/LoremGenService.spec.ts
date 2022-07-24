import { LoremGenService } from "../../../src/services/LoremGenService"

describe('Executando teste na classe LoremGenService', () => {
  let _service: LoremGenService

  it ('Deveria intanciar corretamente a classe LoremGenService', () => {
    _service = new LoremGenService()
  })

  it ('Deveria retornar um subarray ["Lorem", "ipsum"]', () => {
    // Arrange
    const resultadoEsperado: string[] = ["Lorem", "ipsum"]
    const qtdDePalavras: number = 2

    // Act
    const result = _service.getLorem(qtdDePalavras)

    // Assert
    expect(result).toStrictEqual(resultadoEsperado)
    expect(result).toHaveLength(qtdDePalavras)
  })

  //////////////////////////////// correcao ///////////////////////////////////

  it('Deveria me retornar 45 palavras', () => {
    // Arrange
    const quantidadePalavras = 45

    // Act
    const result = _service.getLorem(quantidadePalavras)

    // Assert
    expect(result.length).toBe(quantidadePalavras)
    expect(result).toHaveLength(quantidadePalavras)
  })

  it('Não deveria estourar um erro, quando passado um valor valido', () => {
    expect(() => _service.getLorem(20)).not.toThrow()
  })

  /* it('Deveria estourar um erro, quando passado um tipo incorreto', () => {
    expect(() => _service.getLorem("uma palavra" as any)).toThrow('Apenas números são permitidos.')
  })

  it('Deveria estourar um erro, quando passado um tipo incorreto NaN', () => {
    expect(() => _service.getLorem(Number.NaN)).toThrow()
  })

  it('Deveria estourar um erro ao passar um número negativo', () => {
    expect(() => _service.getLorem(-2)).toThrow()
  }) */
})
