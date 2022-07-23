INSERT INTO Marca (nome) VALUES
('Lacoste'),('Olympikus'),('Reebok'),('Mizuno');

-- 1
SELECT P.id, P.nome, M.nome, P.valor
	FROM Produto P
		INNER JOIN Marca M ON P.MarcaId = M.Id
	ORDER BY M.nome;

-- 2
SELECT P.id, P.nome, M.nome, P.valor
	FROM Produto P
		INNER JOIN Marca M ON P.MarcaId = M.Id 
	WHERE UPPER(M.nome) = 'NIKE'
	ORDER BY M.nome;

-- 3
SELECT M.nome, COUNT(*), SUM(P.valor)
	FROM Marca M
		LEFT JOIN Produto P ON M.id = P.marcaId
	GROUP BY P.marcaId, M.nome
	ORDER BY COUNT(*);

-- 4
SELECT M.nome, COUNT(*), SUM(P.valor) AS ValorTotal
	FROM Marca M
		LEFT JOIN Produto P ON M.id = P.marcaId
	GROUP BY P.marcaId, M.nome
		HAVING COUNT(*) > 1
	ORDER BY COUNT(*);

-- Ex 5
SELECT M.nome AS Marca
	FROM Produto P 
		RIGHT JOIN Marca M ON P.marcaid = M.id
	WHERE P.marcaid IS NULL
	ORDER BY Marca DESC;

-- 1	"Puma Suede"			400.00	3 400

-- 2	"Adidas Breaknet"		300.00
-- 3	"Adidas Grant Court"	279.00	2 579

-- 4	"Nike AirForce One"		800.00	1 800

-- 5	"Vans Old School"		300.00
-- 6	"Vans Ultrarange"		500.00	4 800

-- SELECT * FROM PRODUTO;

-- 3
SELECT  M.nome,(SELECT SUM(valor) FROM Produto WHERE valor = P.valor)
	FROM Marca M, Produto P
	WHERE P.MarcaId = M.Id
		--RIGHT JOIN Produto P ON P.MarcaId = M.Id