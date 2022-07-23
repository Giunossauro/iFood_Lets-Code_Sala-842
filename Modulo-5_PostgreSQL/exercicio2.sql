--create database controleDeUsuario;

create table Departamentos(
	id int generated always as identity,
	nome varchar(60) not null,
	primary key(id)
);

create table Funcionalidades(
	id int generated always as identity,
	nome varchar(60) not null,
	primary key(id)
);

create table DptosFuncs(
	dptoId int,
	funcId int,
	primary key(dptoId, funcId),
	constraint FK_DptosFuncs_Dptos foreign key(dptoId) references Departamentos(id),
	constraint FK_DptosFuncs_Funcs foreign key(funcId) references Funcionalidades(id)
);

create table Usuarios(
	cpf varchar(15),
	nome varchar(60) not null,
	email varchar(60) not null,
	dataNascimento date not null,
	dptoId int not null,
	validado boolean not null default false,
	excluido boolean not null default false,
	primary key(cpf),
	constraint FK_usuarios_departamentos foreign key(dptoId) references Departamentos(id)
);

---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------
-- Resposta
-- https://github.com/DaviGn/PostgreTurma842/blob/main/resposta%20ex2.sql
---------------------------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------------------------

-- create table Funcionalidades (
-- 	id int generated always as identity,
-- 	nome varchar(60) not null,	
-- 	primary key(id)
-- );

-- create table Departamentos (
-- 	id int generated always as identity,
-- 	nome varchar(60) not null,
-- 	primary key(id)
-- );

-- create table DepartamentosFuncionalidades (
-- 	DepartamentoId int,
-- 	FuncionalidadeId int,
-- 	primary key(DepartamentoId, FuncionalidadeId),
-- 	constraint FK_DepartamentosFuncionalidades_Departamentos foreign key(DepartamentoId) references Departamentos(id),
-- 	constraint FK_DepartamentosFuncionalidades_Funcionalidades foreign key(FuncionalidadeId) references Funcionalidades(id)
-- );

-- create table Usuarios (
-- 	cpf varchar(11) not null,
-- 	nome varchar(60) not null,
-- 	email varchar(60) not null,
-- 	senha varchar(500) not null,
-- 	dtnascimento date not null,
-- 	departamentoId int not null,
-- 	validado boolean not null default false,
-- 	excluido boolean not null default false,
-- 	primary key(cpf),
-- 	constraint FK_Usuarios_Departamentos foreign key(departamentoId) references Departamentos(id)
-- );

----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------
-- aula 3 - insert e update com select.sql
-- github.com/DaviGn/PostgreTurma842/blob/main/aula%203%20-%20insert%20e%20update%20com%20select.sql
----------------------------------------------------------------------------------------------------
----------------------------------------------------------------------------------------------------

-- adaptacao que fiz
ALTER TABLE Usuarios
ADD COLUMN senha varchar(200);

--Exemplo de insert com select
insert into Usuarios
values ('12312312312', 'Davi Nascimento', 'teste@teste.com',
	   '1997-10-29',1 ,false,false,'du9f8y8dfyd78yfdgfyugff',
	   (select Id from Departamentos where nome = 'Contabilidade'));

--Exemplo de insert com select formatando data
SET datestyle = "DMY";

insert into Usuarios
values ('12312312314', 'Davi Nascimento', 'teste@teste.com',
	   '29/10/1997',2 ,false,false,'du9f8y8dfyd78yfdgfyugff',
	   (select Id from Departamentos where nome = 'Contabilidade'));

-- Exemplo de update com select
update Usuarios set nome = 'Davi G Nascimento'
where cpf = (select cpf from Usuarios where email = 'teste123@teste.com');

-- Meus inserts

--insert into departamentos (nome)
--values ('vendas'), ('contabilidade'),('financeiro');

--insert into funcionalidades (nome)
--values ('vendas'), ('contabilidade'),('financeiro'), ('estoque'),('NFe');

--select * from departamentos;
--select * from departamentos;

--insert into dptosFuncs (dptoId, funcId)
--values ();

--select Usuarios from Departamentos where nome(Departamento) equal 'contabilidade';