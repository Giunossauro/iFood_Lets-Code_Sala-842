CREATE DATABASE exercicio1;
CREATE TABLE exercicio1(
  nome VARCHAR(50)
  cpf VARCHAR(12) PRIMARY KEY
  email VARCHAR(255)
);

INSERT INTO exercicio1
  (nome, cpf, email)
VALUES
  (Giuliano Morelli, 123.456.789-10, giu@mail.com);

INSERT INTO exercicio1
  (nome, email)
VALUES
  (Fulano, fulano@mail.com),
  (ciclano, ciclano@mail.com);

ALTER TABLE exercicio1
  ALTER COLUMN cpf
  SET NOT NULL;

ALTER TABLE exercicio1
  ALTER COLUMN nome
  SET NOT NULL;

ALTER TABLE exercicio1
  ALTER COLUMN cpf
  SET NOT NULL;

ALTER TABLE exercicio1
  ALTER COLUMN nome SET NOT NULL,
  ALTER COLUMN nome TYPE varchar(60),
  ALTER COLUMN cpf SET NOT NULL,
  ALTER COLUMN cpf TYPE varchar(60),
  ALTER COLUMN email SET NOT NULL,
  ALTER COLUMN email TYPE varchar(60);