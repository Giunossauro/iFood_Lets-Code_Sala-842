CREATE TABLE filmes (
    id SERIAL PRIMARY KEY,
    titulo varchar(100) not null,
    cinema varchar(100) not null,
    horario varchar(100) not null,
    sala varchar(100) not null
)

INSERT INTO filmes (titulo, cinema, horario, sala)
    VALUES ('Homem Aranha', 'Cinemark', '21:00', '4b')

INSERT INTO filmes (titulo, cinema, horario, sala)
    VALUES ('Incrível Hulk', 'Cinemark', '19:00', '4b')

SELECT * from filmes

DROP TABLE filmes