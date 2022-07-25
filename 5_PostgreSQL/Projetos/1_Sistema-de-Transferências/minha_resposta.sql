--Respostas na linha 163 em diante
CREATE DATABASE SistemaFinanceiro
  WITH ENCODING = 'UTF-8';

SET DATESTYLE = 'DMY';
 
--   Sobre a modelagem, pesquisei e pensei em diversas situações que
-- poderiam ocorrer na vida real, mas tentei deixar da forma mais
-- simplificada, me segurando para não colocar um monte de coisas
-- que não precisam para a atividade.

CREATE TABLE IF NOT EXISTS Agencia(
	id SMALLINT GENERATED ALWAYS AS IDENTITY,
	nome VARCHAR(15) NOT NULL,
	endereco VARCHAR(200) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Cliente(
	id INT GENERATED ALWAYS AS IDENTITY,
	conta CHAR(7) NOT NULL,
	saldo DECIMAL(15,2) NOT NULL DEFAULT 0.00,
	agenciaId SMALLINT NOT NULL,
	cpf CHAR(11) NOT NULL,
	nome VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
	senha VARCHAR(500) NOT NULL,
	dataNascimento DATE NOT NULL,
	endereco VARCHAR(200) NOT NULL,
	PRIMARY KEY(id),
	CONSTRAINT FK_Cliente_Agencia
    FOREIGN KEY(agenciaId)
    REFERENCES Agencia(id)
);

CREATE INDEX IX_Cliente_agenciaId ON Cliente(agenciaId);

CREATE TABLE IF NOT EXISTS Transacao(
	origemId INT NOT NULL,
	destinoId INT NOT NULL,
	momento DATE NOT NULL DEFAULT NOW()::timestamp,-- sei que da pra crar role p/ q ninguém edite
	valor DECIMAL(15,2) NOT NULL DEFAULT 0.00,
	PRIMARY KEY(origemId,destinoId),
	CONSTRAINT FK_Transacao_Cliente_Origem
    FOREIGN KEY(origemId) REFERENCES Cliente(id),
	CONSTRAINT FK_Transacao_Cliente_Destino
    FOREIGN KEY(destinoId) REFERENCES Cliente(id)
);

INSERT INTO Agencia
(
	nome,
	endereco,
	telefone
)
VALUES
(
	'Agencia 1',
	'Rua A, n 1, Maua - SP, CEP 15.954-888',
	'5513912345678'
),
(
	'Agencia 2',
	'Rua B, n 3, Diadema - SP, CEP 98.765-432',
	'5511912345678'
),
(
	'Agencia 3',
	'Rua C, n 3, Barueri - SP, CEP 12.456-789',
	'5511912345678'
);

INSERT INTO Cliente
(
	conta,
	saldo,
	agenciaId,
	cpf,
	nome,
	email,
	telefone,
	senha,
	dataNascimento,
	endereco
)
VALUES
(
	'1234561',
	1.51,
	1,
	'12345678911',
	'Fulano',
	'fulano@mail.com',
	'552199990001',
	'3ho9fupoj^çinjçoijÇOIjN´8OajhO8AjFIOAJFÇL',
	'01/01/2001',
	'Rua D, 1, Maua - SP, CEP 15.954-001'
),
(
	'2345678',
	1.52,
	2,
	'12345678912',
	'FulanA',
	'fulana@mail.com',
	'552199990002',
	'3ho9fupoj^çinjçoijÇOIjN´8OajhO8AjFIOAJFÇL',
	'01/01/2002',
	'Rua E, 2, Maua - SP, CEP 15.954-002'
),
(
	'3456783',
	1.53,
	1,
	'12345678913',
	'Ciclano',
	'ciclano@mail.com',
	'552199990003',
	'3ho9fupoj^çinjfgt3##f´8OajhO8AjFIOAJFÇL',
	'01/01/2003',
	'Rua F, 3, Maua - SP, CEP 15.954-003'
),
(
	'1456784',
	1.54,
	3,
	'12345678914',
	'CiclanA',
	'ciclana@mail.com',
	'552199990004',
	'3ho9fupoj^çinjçoijÇOIjN´8OajhO8AjFIOAJFÇL',
	'01/01/2004',
	'Rua G, 4, Maua - SP, CEP 15.954-004'
),
(
	'1634555',
	1.55,
	2,
	'12345678915',
	'Beltrano',
	'beltrano@mail.com',
	'552199990005',
	'3ho9fupoj^çinjçoijÇOIjN´844fFFfe3AJFÇL',
	'01/01/2005',
	'Rua H, 5, Maua - SP, CEP 15.954-005'
),
(
	'8529636',
	1.56,
	3,
	'12345678916',
	'BeltranA',
	'beltrana@mail.com',
	'552199990006',
	'3ho9fupoj^çinjçoijÇOIjN´8OajhO8AjFIOAJFÇL',
	'01/01/2006',
	'Rua I, 6, Maua - SP, CEP 15.954-006'
);

INSERT INTO Transacao (origemId,destinoId,valor) VALUES
	(1,2,1.00),(2,1,0.50),(1,3,0.40),(3,2,0.30),(4,5,0.60),
	(5,6,0.80),(6,2,0.70),(5,1,0.30),(4,3,0.20),(1,6,0.25);
	
--------------------------------------------------------------------------------------

-- 1
CREATE VIEW VW_SaldoTotalPorAgencia AS
	SELECT Ag.id AS AgId, SUM(Cl.saldo) AS SaltoTotalDaAgencia
		FROM Cliente Cl
			INNER JOIN Agencia Ag ON Cl.agenciaId = Ag.id
		GROUP BY Ag.id;

SELECT * FROM VW_SaldoTotalPorAgencia;

-- 2
CREATE VIEW VW_Transacoes
	SELECT AO.nome, CO.conta, AD.nome, CD.conta, to_char(momento,'DD/MM/YYYY'),TR.valor
		FROM Transacao TR
			INNER JOIN Cliente CO ON CO.id = TR.origemId
			INNER JOIN Cliente CD ON CD.id = TR.destinoId
			INNER JOIN Agencia AO ON CO.agenciaId = AO.id
			INNER JOIN Agencia AD ON CD.agenciaId = AD.id

-- 3 - fiz rapidinho
CREATE PROCEDURE atualizaSaldo(idOrigem INT, idDestino INT, valorTransferido DECIMAL(15,2))
	LANGUAGE SQL
	BEGIN ATOMIC
		UPDATE Cliente SET saldo = saldo - valorTransferido
			WHERE idOrigem = id;
		UPDATE Cliente SET saldo = saldo + valorTransferido
			WHERE idDestino = id;
	END;

SELECT saldo FROM Cliente
	WHERE id = 1 OR id = 2;

CALL atualizaSaldo(1,2,1.11);

SELECT saldo FROM Cliente
	WHERE id = 1 OR id = 2;

-- 4
CREATE VIEW VW_TOTAL AS
SELECT
CL.conta,
(SELECT COUNT( * ) FROM Transacao TRC WHERE TRC.origemId = CL.id OR TRC.destinoId = CL.id),
(SELECT SUM(TOR.valor) FROM Transacao TOR WHERE TOR.origemId = CL.id) AS enviado,
(SELECT SUM(TDE.valor) FROM Transacao TDE WHERE TDE.destinoId = CL.id) AS recebido
FROM Cliente CL
ORDER BY CL.id;

-- cópia das transacoes após a CALL do ex. 3:
-- (1,2,1.00),(2,1,0.50),(1,3,0.40),(3,2,0.30),(4,5,0.60),
-- (5,6,0.80),(6,2,0.70),(5,1,0.30),(4,3,0.20),(1,6,0.25),
-- (1,2,1.11);

-- Atualizei a tabela transacao com
-- id BIGINT GENERATED ALWAYS AS IDENTITY,
-- primary key(id);

-- E adicionei o seguinte insert no procedure atualizaSaldo:
-- INSERT INTO Transacao (origemId,destinoId,valor)
-- VALUES (idOrigem,idDestino,valorTransferido);
