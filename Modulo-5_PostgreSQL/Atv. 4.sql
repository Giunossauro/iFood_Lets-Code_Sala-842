-- Atv. 4
-- 1) Liste Id, Nome, Marca e Valor de todos os produtos e ordene por marca;
-- 2) Faça a mesma coisa que o item 1, mas liste apenas os produtos da marca "Nike";
-- 3) Liste a Marca, a quantidade e o valor total de produtos que
--    são da respectiva marca e ordene pela quantidade;
-- 4) Faça a mesma coisa do item 3 mas liste somente as marcas
--    que possuem mais de 1 produto relacionado a elas;
-- 5) Liste todas as Marcas que não possuem produtos relacionados com ela e ordene por nome da marca;

-- é como um for aninhado...

-- select M.nome, COUNT(*) as qtd, SUM(P.valor)
-- 	from produto P
-- 		inner join marca M
-- 			on P.marcaId = M.id
-- 	GROUP BY M.nome
--	ORDER BY qtd;

-- select M.nome, COUNT(*) as qtd, SUM(P.valor)
-- 	from produto P
-- 		inner join marca M
-- 			on P.marcaId = M.id
-- 	GROUP BY M.nome
-- 		HAVING COUNT(*) > 1
-- 	ORDER BY qtd;




























----------------------------------------------------------------------------------------------------
-- Atv. 3
-- 1) Liste todos os clientes em ordem alfabética;
-- 2) Liste todos os produtos que contenham o nome 'Vans';
-- 3) Liste os IDs das marcas dos produtos e a quantidade de produtos de cada marca (não se preocupe com o nome da marca, apenas o Id na tabela produto);
-- 4) Faça a mesma consulta do item 3, porém somente as marcas que possuem mais de 1 produto;

-- 5) Agrupe por marca os produtos que o preço for acima da
--    média de todos os produtos;

-- 6) Liste todos os produtos de maior valor de cada marca.
-- 1	"Puma Suede"			400.00	3
-- 2	"Adidas Breaknet"		300.00	2
-- 3	"Adidas Grant Court"	279.00	2
-- 4	"Nike AirForce One"		800.00	1
-- 5	"Vans Old School"		300.00	4
-- 6	"Vans Ultrarange"		500.00	4

-- SELECT marcaId, MAX(valor)
-- 	FROM Produto
-- 	GROUP BY marcaId;

-- -- OK - com alias apenas no select principal
-- SELECT P.* FROM Produto P
-- WHERE P.valor = (SELECT MAX(valor) FROM Produto WHERE P.marcaId = marcaId);

-- -- OK - com alias apenas no select principal, mas sem usar no WHERE principal
-- SELECT P.* FROM Produto P
-- WHERE valor = (SELECT MAX(valor) FROM Produto WHERE P.marcaId = marcaId);

-- -- ERRO - com alias apenas no subselect
-- SELECT * FROM Produto
-- WHERE valor = (SELECT MAX(P.valor) FROM Produto P WHERE P.marcaId = marcaId);
-- -- retorna o maior de todos

-- -- ERRO - com alias apenas no subselect E sem usá-lo
-- SELECT * FROM Produto
-- WHERE valor = (SELECT MAX(valor) FROM Produto P WHERE P.marcaId = marcaId);
-- -- retorna o maior de todos

-- -- OK - com alias nos 2 selects
-- SELECT P1.* FROM Produto P1
-- WHERE P1.valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = P1.marcaId);

-- -- OK - com alias nos 2 selects, mas sem usá-lo no WHERE do principal
-- SELECT P1.* FROM Produto P1
-- WHERE valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = P1.marcaId);

-- -- ERRO - com alias nos 2 selects, mas sem o do principal no WHERE do sub
-- SELECT P1.* FROM Produto P1
-- WHERE P1.valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = marcaId);
-- -- retorna o maior de todos

-- -- ERRO - com alias nos 2 selects, mas sem o do principal no WHERE do sub E sem usar no WHERE principal
-- SELECT P1.* FROM Produto P1
-- WHERE valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = marcaId);
-- -- retorna o maior de todos

-- -- OK - com alias nos 2 selects, mas sem o do sub no WHERE do principal
-- SELECT P1.* FROM Produto P1
-- WHERE valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P1.marcaId = marcaId);

-- -- OK - com alias nos 2 selects, mas sem usar no principal
-- SELECT * FROM Produto P1
-- WHERE valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = P1.marcaId);

-- -- ERRO - com alias nos 2 selects, mas sem usar no principal E sem o do principal no WHERE do sub
-- SELECT * FROM Produto P1
-- WHERE valor = (SELECT MAX(P2.valor) FROM Produto P2 WHERE P2.marcaId = marcaId);
-- -- retorna o maior de todos

-- -- OK - com alias nos 2 selects, mas sem usar no sub
-- SELECT P1.* FROM Produto P1
-- WHERE valor = (SELECT MAX(valor) FROM Produto P2 WHERE P2.marcaId = P1.marcaId);

-- -- OK - com alias nos 2 selects, mas sem usar no sub E sem o do sub no WHERE do principal
-- SELECT P1.* FROM Produto P1
-- WHERE valor = (SELECT MAX(valor) FROM Produto P2 WHERE P1.marcaId = marcaId);

-- -- OK - com alias nos 2 selects, mas sem usar nos 2
-- SELECT * FROM Produto P1
-- WHERE valor = (SELECT MAX(valor) FROM Produto P2 WHERE P2.marcaId = P1.marcaId);
