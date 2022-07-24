import { CpfService } from "../../../src/services/CpfService"

describe('Executando teste na classe CpfService', () => {
  let _service: CpfService

  it ('Deveria intanciar corretamente a classe CpfService', () => {
    _service = new CpfService()
  })

  it ('cpf', () => {
    // Arrange
    const expectedFalsyValidation: boolean = false
    const expectedTruthyValidation: boolean = true

    const expectedWrongGeneration: string = "554.898.887-26" //regexp?
    const expectedGeneration: string = "554.898.887-26" //regexp?

    const falsyCpf: string = "123.456.789-10"
    const truthyCpf: string = "123.456.789-10"

    // Act
    const validationResult = _service.validate(falsyCpf)
    const generationResult = _service.generate()

    // Assert
    expect(validationResult).toStrictEqual(expectedFalsyValidation)
    //expect(generationResult).toStrictEqual(expectedGeneration)
  })

  it.each([
    ["37847433826"], //colocar uns cpfs verdadeiros
    ["413.246.548-99"],
  ])('O CPF %s deve ser considerado verdadeiro', (cpf) => {
    expect(_service.validate(cpf)).toBeTruthy()
  })

  it.each([
    ["12345678910"],["11111111110"],["11111111153"],["11111123111"],
    ["1111da11111"],["1111991111"],["9"],["132"],
    ["9999999999999999999999"],["123456789101112"],["a"],["~~~~"],
    ["213.213.655-55"],["111.111.111-11"],["a.b.c-d"],["123-456-789.10"],
    ["abc"],[""],["_"],["00000000000"],
    ["000.000.000-00"],["000.000.000-01"],["00000000200"],["10000000000"],
  ])('O valor "%s" deve ser considerado um CPF falso', (cpf) => {
    expect(_service.validate(cpf)).toBeFalsy()
  })
})


/*
111.111.111-11
00000000000
000.000.000-00
*/
