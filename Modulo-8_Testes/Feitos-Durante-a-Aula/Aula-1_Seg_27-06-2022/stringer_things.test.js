const csvOrdenador = require("./stringer_things");

test('ordenar palavras', function () {

  expect(csvOrdenador("oi;professor;tudo;bem;aaa;bbb;ccc"))
  .toBe(["aaa","bbb","bem","ccc","oi","professor","tudo"]);
});