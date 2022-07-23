import { somar } from './matematica'

test('Se 1 + 1 = 2', function () {
  const resulta = somar(1, 1)

  expect(resulta).toBe(2)
})

test('Se 1 - 1 = 0', function () {
  expect(1 - 1).toBe(0)
})