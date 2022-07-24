import { StringService } from "../../../src/services/StringService"

describe('Executando teste na classe StringService', () => {
  let _service: StringService

  it ('Deveria intanciar corretamente a classe StringService', () => {
    _service = new StringService()
  })

  it ('Deveria limpar palavras duplicadas de ["a", "a", "a", "b"] e retornar ["a", "b"]', () => {
    // Arrange
    const palavras = ["a", "a", "a", "b"]
    const resultadoEsperado = ["a", "b"]

    // Act
    const result = _service.removerDuplicados(palavras)

    // Assert
    expect(result).toStrictEqual(resultadoEsperado)
  })
})
