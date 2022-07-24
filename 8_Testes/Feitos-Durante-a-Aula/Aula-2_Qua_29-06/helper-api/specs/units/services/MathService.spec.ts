import { MathService } from '../../../src/services/MathService'

describe('MathService', () => {
  let _service: MathService

  it ('deveria instanciar corretamente a classe', () => {
    _service = new MathService()

    expect(_service).toBeTruthy()
  })

  it('deveria resultar 2, se somado 1 + 1', () => {
    const resultado = _service.getSum(1, 1)
    
    expect(resultado).toBe(2)
  })

  it('deveria resultar 4, se somado 3 + 1', () => {
    const resultado = _service.getSum(3, 1)
    
    expect(resultado).toBe(4)
  })

  it ('O metodo getSubtract deveria retornar 1 se passado x=2 e y=1', () => {
    const result = _service.getSubtract(2, 1)

    expect(result).toBe(1)
  })

  it.each([
    [1, 1, 1],
    [1, 2, 2],
  ])('%i * %i = %i', (x, y, result) => {
    expect(x * y).toBe(result)
  })

  it.each([
      { x: 1, y: 3, result: 3 },
      { x: 1, y: 4, result: 4 },
    ])('$x * $y = $result', ({ x, y, result }) => {
      expect(x * y).toBe(result)
    })
})