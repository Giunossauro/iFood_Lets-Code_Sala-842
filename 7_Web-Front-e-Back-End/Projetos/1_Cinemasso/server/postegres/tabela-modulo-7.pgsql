--criando cada uma das tabelas


CREATE TABLE categorias (
	id int generated always as identity,
	nome varchar(60) not null,
	primary key (id)
);

CREATE TABLE filmes (
	id int generated always as identity,
	nome varchar(60) not null,
	duracao bigint not null,
	categoriaId int not null,
	link varchar,
	imagem varchar,
	primary key (id),
	constraint FK_Filme_Categoria foreign key(categoriaId) references categorias(id)
);

CREATE TABLE salas (
	id int generated always as identity,
	nome varchar(60) not null,
	capacidade int not null,
	primary key (id)
);

CREATE TABLE sessoes (
	id int generated always as identity,
	filmeId int not null,
	salaId int not null,
	dataInicio timestamp not null,
	primary key (filmeId, salaId, id),
	constraint FK_Sessao_Filme foreign key(filmeId) references filmes(id),
	constraint FK_Sessao_Sala foreign key(salaId) references salas(id)
);

--povoando Categorias
INSERT INTO categorias (nome)
	VALUES
	('Ação'),
	('Suspense'),
	('Drama'),
	('Aventura'),
	('Crime')
	;
SELECT * FROM categorias;

-- povoando Filmes
INSERT INTO filmes (nome, duracao, categoriaId, link, imagem)
	VALUES
	('Vingadores: Ultimato', 182, 1,'https://www.google.com/search?client=firefox-b-d&q=Vingadores%3A+Ultimato','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMwtU95JygcmCq4e3XPpL9W0ATjGFoQCQm16dbpIp7BM36B7lH'),

	;
SELECT * FROM filmes;

--povoando Salas
INSERT INTO salas (nome, capacidade)
	VALUES
	('A', 250),
	('B', 300),
	('C', 170),
	('D', 215)
	;
SELECT * FROM salas;

INSERT INTO sessoes (filmeId, salaId, dataInicio)
	VALUES
	--sessoes da sala B
	(1, 2, '2022-06-21 09:00:00'),
	(1, 2, '2022-06-23 09:00:00'),
	(1, 2, '2022-06-25 11:00:00'),
	(3, 2, '2022-06-21 12:30:00' ),
	(3, 2, '2022-06-23 12:30:00' ),
	(3, 2, '2022-06-25 14:30:00' ),
	--sessoes da sala C
	(2, 3, '2022-06-21 08:40:00' ),
	(2, 3, '2022-06-23 08:40:00' ),
	(2, 3, '2022-06-25 10:40:00' ),
	(4, 3, '2022-06-21 10:40:00' ),
	(4, 3, '2022-06-23 10:40:00' ),
	(4, 3, '2022-06-25 12:40:00' ),
	--sessoes da sala D
	(5, 4, '2022-06-20 15:00:00' ),
	(5, 4, '2022-06-22 15:00:00' ),
	(5, 4, '2022-06-24 16:00:00' ),
	(7, 4, '2022-06-20 18:30:00' ),
	(7, 4, '2022-06-22 18:30:00' ),
	(8, 4, '2022-06-24 19:30:00' ),
	--sessoes da sala A
	(6, 1, '2022-06-22 20:00:00' ),
	(6, 1, '2022-06-24 20:00:00' )
	;
	SELECT * FROM sessoes;

	drop table categorias
