INSERT INTO Marca (nome) VALUES
('Lacoste'), ('Olympikus'), ('Reebok'), ('Mizuno');

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