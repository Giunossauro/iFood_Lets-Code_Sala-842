----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 1.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%201.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

create table Cidade (
	id int primary key,
	nome varchar
);

insert into Cidade (id, nome)
values (3, null);

insert into Cidade (id)
values (5);

insert into Cidade 
values (7, 'São Paulo');

insert into Cidade 
values (8, 'São Caetano'),
(9, 'São Bernardo');

alter table cidade alter column nome type varchar(20);

update cidade set nome = ''
where nome is null;

alter table cidade alter column nome set not null;

delete from cidade
where nome = '';

select * from Cidade;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 2.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%202.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

create table if not exists Alunos (
	Cpf varchar(14), -- para ignorar .
	Nome varchar,
	Email varchar,
	primary key(Cpf)
);

insert into Alunos values ('123.123.123-12', 'Davi');
insert into Alunos values ('123.123.123-13', 'Fulano', 'teste@teste.com');
insert into Alunos values ('123.123.123-15', null, 'teste@teste.com');

update Alunos set Nome = '' where Nome is null;
update Alunos set Email = '' where Email is null;

alter table Alunos alter column Nome type varchar(60);
alter table Alunos alter column Nome set not null;
alter table Alunos alter column Email type varchar(60);
alter table Alunos alter column Email set not null;

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 2 parte 2.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%202%20parte%202.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

create table Estado(
	Id int generated always as identity,
	primary key(Id)
);
create table Pais(
	Id int generated always as identity,
	nome varchar(2) NOT NULL,
	primary key(Id)
);

insert into Pais(nome) values('1'),('2'),('3'),('4'),('5'),('6'),('7'),('8');

select * from pais;

delete from pais where id > 6;

select * from pais;

insert into Pais(nome) values('7');

-- o novo id será 9
select * from pais;

delete from pais where id > 6;

-- Reseta o generated always as identity
ALTER TABLE Pais ALTER COLUMN Id RESTART WITH 7;

insert into Pais(nome) values('7'); -- id seria 10, mas continua do 7

-- o novo id será 7
select * from pais;

-- Formula do alter
-- ALTER TABLE NomeDaTabela [ADD, ALTER, DROP] [COLUMN, CONSTRAINT];

-- Criar a coluna
-- ALTER TABLE Estado ADD COLUMN PaisId int not null default 1;

--ou
ALTER TABLE Estado ADD COLUMN PaisId int; --nullable

update Estado set PaisId = 1 where Paisid is null;
ALTER TABLE Estado alter column PaisId set not null;

-- Criar a constraint
ALTER TABLE Estado ADD CONSTRAINT FK_Estado_Pais foreign key(PaisId) references Pais(Id);

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 2 parte 3.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%202%20parte%203.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

create table Produto (
	Id int generated always as identity,
	nome varchar (100) not null,
	primary key(Id)
);

create table Cliente (
	Id int generated always as identity,
	nome varchar (100) not null,
	primary key(Id)
);

create table MotivoDevolucao (
	Id int generated always as identity,
	nome varchar (100) not null,
	primary key(Id)
);

create table Compra (
	Id int generated always as identity,
	ClienteId int not null,
	MotivoDevolucaoId int,
	primary key(Id),
	constraint FK_Compra_Cliente foreign key(ClienteId) references Cliente(Id),
	constraint FK_Compra_MotivoDevolucao foreign key(MotivoDevolucaoId) references MotivoDevolucao(Id)
);

-- Chave primária composta
CREATE TABLE ItensCompra (
	-- Chave primária
	CompraId int not null,
	ProdutoId int not null,
	------------
	Qtd decimal(10, 2) not null,
	primary key (CompraId, ProdutoId),
	constraint FK_ItensCompra_Compra foreign key(CompraId) references Compra(Id),
	constraint FK_ItensCompra_Produto foreign key(ProdutoId) references Produto(Id)
);


CREATE TABLE NFE (
	Id int generated always as identity,
	primary key (Id)
);

CREATE TABLE ItensNFE (
	NFEId int not null,
	CompraId int not null,
	ProdutoId int not null,
	primary key (NFEId, CompraId, ProdutoId),
	constraint FK_ItensNFE_NFE foreign key (NFEId) references NFE(Id),
	constraint FK_ItensNFE_ItensCompra foreign key (CompraId, ProdutoId) 
		references ItensCompra(CompraId, ProdutoId)
);

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 2 alteracoes produtos.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%202%20alteracoes%20produtos.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

alter table Produto add column Valor decimal(10,2) not null;

create table Marca (
	id int generated always as identity,
	nome varchar(50) not null,
	primary key(id)
);

alter table Produto add column MarcaId int not null;
alter table Produto add constraint FK_Produto_Marca foreign key(marcaId) references marca(id);

insert into marca (nome) values ('Nike'), ('Adidas'), ('Puma'), ('Vans');

insert into Produto (nome, valor, marcaId)
values
('Puma Suede', 400, (select Id from Marca where Nome = 'Puma')),
('Adidas Breaknet', 300, (select Id from Marca where Nome = 'Adidas')),
('Adidas Grant Court', 279, (select Id from Marca where Nome = 'Adidas')),
('Nike AirForce One', 800, (select Id from Marca where Nome = 'Nike')),
('Vans Old School', 300, (select Id from Marca where Nome = 'Vans')),
('Vans Ultrarange', 500, (select Id from Marca where Nome = 'Vans'));

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 3 - insert e update com select.sql
-- github.com/DaviGn/PostgreTurma842/blob/main/aula%203%20-%20insert%20e%20update%20com%20select.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

-- encontra-se na atividade controledeusuario

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- Resposta Atividade 3 - ORDER BY e GROUP BY.sql
-- 
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

-- 1
INSERT INTO Cliente (nome) VALUES('Fulano'),('Ciclano'),('Beltrano');
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
-- usei somenta a tabela produto considerando que não será listada marca sem ao menos 2 produtos
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

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 4 joins.sql
-- https://github.com/DaviGn/PostgreTurma842/blob/main/aula%204%20joins.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

-- LEFT JOIN
select * from Produto p    -- Esquerda
inner join Marca m on p.MarcaId = m.Id;  -- Direita

-- Colocando condição a mais no join
select * from Departamentos d
left join Usuarios u on d.Id = u.DepartamentoId and u.Excluido = false;

-- RIGHT JOIN
select * from Marca;     -- Esquerda
--junte com a tabela 
--Produto -- Direita

-- Colocando condição a mais no join
select d.*, u.* from Usuarios u
right join Departamentos d on d.Id = u.DepartamentoId and u.Excluido = false;

-- Exemplo de junção mais complexa para criar um report de compra com quantidade de itens
select cp.Id, cl.nome, m.nome motivoDevolucao, count(*) as QtdItens, sum(i.Qtd) QtdTotalItensComprados
from Compra cp
inner join Cliente cl on cp.ClienteId = cl.Id
left join MotivoDevolucao m on cp.MotivoDevolucaoId = m.Id
inner join ItensCompra i on cp.id = i.CompraId
group by cp.Id, cl.nome, m.nome
order by sum(i.Qtd) desc;
