const ordenar = require('./ordenador')

test('Ordenar palavras "a;c;d;b"', function () {
  const resulta = ordenar("a;c;d;b")

  expect(resulta).toBe("a;b;c;d")
})