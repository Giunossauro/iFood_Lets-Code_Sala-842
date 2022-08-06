--criando cada uma das tabelas
DROP table categorias

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
	imagemSrc varchar(180), 
	linkInfo varchar(180),
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
	('Crime'),
	('Romance')
	;
SELECT * FROM categorias;

-- povoando Filmes
INSERT INTO filmes (nome, duracao, categoriaId, imagemSrc, linkInfo)
	VALUES
	('Vingadores: Ultimato', 182, 1,
		'https://lumiere-a.akamaihd.net/v1/images/690x0w_br_9e5801a5.jpeg?region=0%2C0%2C690%2C1035',
		'https://www.google.com/search?q=vingadores+ultimato+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Janela Secreta', 96, 2,
		'https://br.web.img2.acsta.net/medias/nmedia/18/87/08/24/19871833.jpg',
		'https://www.google.com/search?q=a+janela+secreta+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('O Escafandro e a Borboleta', 112, 3,
		'https://play-lh.googleusercontent.com/xyrpyfKQtjmzvykRyoOoIoCjYKRkaN8gmMRZzo3EcvRW3bafwE7qLpK92jvoxXB_hjk',
		'https://www.google.com/search?q=o+escafandro+e+a+borboleta+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Star Wars: Episódio VI - O Retorno de Jedi', 131, 1,
		'https://br.web.img3.acsta.net/pictures/14/05/19/22/57/276761.jpg',
		'https://www.google.com/search?q=elenco+do+filme+star+wars+o+retorno+de+jedi+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('O Senhor dos Anéis: As Duas Torres', 179, 4,
		'https://br.web.img2.acsta.net/medias/nmedia/18/92/34/89/20194741.jpg',
		'https://www.google.com/search?q=senhor+dos+aneis+as+duas+torres+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Pokémon: Detetive Pikachu', 104, 4,
		'https://lojasaraiva.vteximg.com.br/arquivos/ids/12116167/1008073506.jpg?v=637142274348530000',
		'https://www.google.com/search?q=pikachu+detetive+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Seven: Os Sete Pecados Mortais', 127, 5,
		'https://br.web.img2.acsta.net/c_310_420/pictures/210/124/21012465_2013061319170245.jpg',
		'https://www.google.com/search?q=seven+os+sete+crimes+capitais+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Exterminador do Futuro 2 - O Julgamento Final', 137, 1,
		'https://br.web.img2.acsta.net/medias/nmedia/18/92/91/08/20224693.jpg',
		'https://www.google.com/search?q=exterminador+do+futuro+2+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Closer - Perto Demais', 104, 6,
		'https://static.wikia.nocookie.net/dublagempedia/images/8/8d/01-08-CLOSER-PERTO-DEMAIS.jpg/revision/latest?cb=20200514002729&path-prefix=pt-br',
		'https://www.google.com.br/search?q=closer+filme&sxsrf=ALiCzsbiYtxsO-BUITNMAPxb2fWUVDgjTg%3A1655991093247')
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
	--sessoes da sala A
	(6, 1, '2022-06-22 20:00:00' ),
	(9, 1, '2022-06-22 17:40:00' ),
	(8, 1, '2022-06-22 14:30:00' ),
	(6, 1, '2022-06-24 20:00:00' ),
	(9, 1, '2022-06-24 17:40:00' ),
	(8, 1, '2022-06-24 14:30:00' ),
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
	(8, 4, '2022-06-24 19:30:00' )
	;
	SELECT * FROM sessoes;