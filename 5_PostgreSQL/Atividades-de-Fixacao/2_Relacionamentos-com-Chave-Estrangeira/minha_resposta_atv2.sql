CREATE TABLE Departamentos(
	id INT GENERATED ALWAYS AS IDENTITY,
	nome VARCHAR(60) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE Funcionalidades(
	id INT GENERATED ALWAYS AS IDENTITY,
	nome VARCHAR(60) NOT NULL,
	PRIMARY KEY(id)
);

CREATE TABLE DptosFuncs(
	dptoId INT,
	funcId INT,
	PRIMARY KEY(dptoId, funcId),
	CONSTRAINT FK_DptosFuncs_Dptos
    FOREIGN KEY(dptoId)
    REFERENCES Departamentos(id),
	CONSTRAINT FK_DptosFuncs_Funcs
    FOREIGN KEY(funcId)
    REFERENCES Funcionalidades(id)
);

CREATE TABLE Usuarios(
	cpf VARCHAR(15),
	nome VARCHAR(60) NOT NULL,
	email VARCHAR(60) NOT NULL,
	dataNascimento DATE NOT NULL,
	dptoId INT NOT NULL,
	validado BOOLEAN NOT NULL DEFAULT false,
	excluido BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY(cpf),
	CONSTRAINT FK_usuarios_departamentos
    FOREIGN KEY(dptoId)
    REFERENCES Departamentos(id)
);