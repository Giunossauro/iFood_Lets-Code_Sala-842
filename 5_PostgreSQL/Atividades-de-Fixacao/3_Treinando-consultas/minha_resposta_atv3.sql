-- 1
INSERT INTO Cliente (nome) VALUES ('Fulano'), ('Ciclano'), ('Beltrano');
SELECT * FROM Cliente ORDER BY nome;

-- 2
SELECT * FROM Produto WHERE UPPER(nome) LIKE '%VANS%';

-- 3
-- usei as duas tabelas porque pode existir marca sem produto registrado
SELECT Marca.id,COUNT(Produto.marcaId)
  FROM Marca, Produto
    WHERE Marca.id = Produto.marcaId
  GROUP BY Marca.id
  ORDER BY Marca.id;

-- 4
-- usei somenta a tabela produto considerando que nÃ£o serÃ¡ listada marca sem ao menos 2 produtos
SELECT DISTINCT marcaId, COUNT(marcaId)
  FROM Produto
  GROUP BY marcaId
    HAVING COUNT(marcaId) > 1
  ORDER BY marcaId;

-- 5
-- ESTÁ ERRADO, EU SEI
SELECT DISTINCT marcaId, COUNT(marcaId)
  FROM Produto
  GROUP BY marcaId
    HAVING COUNT(marcaId) > 1 AND AVG(valor) < valor
  ORDER BY marcaId;