--criando cada uma das tabelas
drop table categorias

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
	imagemSrc varchar(180) not null default
		'https://live.staticflickr.com/65535/52169216355_06d9d6725f_o.jpg',
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
		'https://live.staticflickr.com/65535/52168106693_e291c8970a_o.jpg',
		'https://www.google.com/search?q=vingadores+ultimato+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Janela Secreta', 96, 2,
		'https://live.staticflickr.com/65535/52168096726_498107fa3f_o.jpg',
		'https://www.google.com/search?q=a+janela+secreta+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('O Escafandro e a Borboleta', 112, 3,
		'https://live.staticflickr.com/65535/52166778705_839836d7bc_o.jpg',
		'https://www.google.com/search?q=o+escafandro+e+a+borboleta+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Star Wars: Episódio VI - O Retorno de Jedi', 131, 1,
		'https://live.staticflickr.com/65535/52167061492_e16790fb56_o.jpg',
		'https://www.google.com/search?q=elenco+do+filme+star+wars+o+retorno+de+jedi+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('O Senhor dos Anéis: As Duas Torres', 179, 4,
		'https://live.staticflickr.com/65535/52168339924_24e95dd7e4_o.jpg',
		'https://www.google.com/search?q=senhor+dos+aneis+as+duas+torres+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Pokémon: Detetive Pikachu', 104, 4,
		'https://live.staticflickr.com/65535/52167061532_d07b06ba94_o.png',
		'https://www.google.com/search?q=pikachu+detetive+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Seven: Os Sete Pecados Mortais', 127, 5,
		'https://live.staticflickr.com/65535/52168084361_7ae4f7a234_o.jpg',
		'https://www.google.com/search?q=seven+os+sete+crimes+capitais+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Exterminador do Futuro 2 - O Julgamento Final', 137, 1,
		'https://live.staticflickr.com/65535/52167061467_7fa256e1b8_o.jpg',
		'https://www.google.com/search?q=exterminador+do+futuro+2+filme&rlz=1C1CHZN_pt-BRBR990BR990'),
	('Closer - Perto Demais', 104, 6,
		'https://live.staticflickr.com/65535/52167074007_e8f452556d_o.jpg',
		'https://www.google.com.br/search?q=closer+filme&sxsrf=ALiCzsbiYtxsO-BUITNMAPxb2fWUVDgjTg%3A1655991093247')
	;
SELECT * FROM filmes;

--povoando Salas
INSERT INTO salas (nome, capacidade, imagemSrc)
	VALUES
	('A', 250,
		'https://live.staticflickr.com/65535/52169216355_06d9d6725f_o.jpg'),
	('B', 300,
		'https://live.staticflickr.com/65535/52168742998_36df515c0d_o.jpg'),
	('C', 170,
		'https://live.staticflickr.com/65535/52167711832_ac314043ab_o.jpg'),
	('D', 215,
		'https://live.staticflickr.com/65535/52168742953_abdc675669_o.jpg')
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