# Cinemasso  

---  

## Atividade Principal 1 (em grupo)

Criar aplicação web usando os conceitos vistos ao longo do módulo e do curso.  

Serão avaliadas questões como implementação de API RESTful, modelagem de recursos, uso correto dos métodos HTTP, qualidade e legibilidade de código.  

##### Obrigatório  

1. Necessário criar, pelo menos, 3 recursos que tenham algum nível de relacionamento. e.g. hotel, hóspede, e reserva.

2. Criar rotas no serviço, usando path params, que suportem a interação com esses recursos, e.g.
```
a. /hoteis
    i. /hotel/1
    ii. /hotel1/reservas
b. /hospedes
c. /reservas
    i. /reservas/9/hospedes
```

3. Suportar query params com 3 funcionalidades: sortBy, algum tipo de filtro como nome ou qtd de estrelas, e limit. e.g.
```
a. /hoteis?sortBy=name
b. /hoteis?nome=sh3r4t0n
c. /hoteis?limit=5
```

4. Todas rotas devem suportar, pelo menos, GET, PUT, POST, e DELETE.

5. Ter, pelo menos, uma rota onde é possível visualizar algum dos recursos usando uma view engine; 

6. Projeto deve usar um padrão de pastas modularizado, e.g.

![Hierarquia de Arquivos](https://github.com/Giunossauro/IFood_Lets-Code_Sala-842/blob/master/7_Web-Front-e-Back-End/Projetos/1_Cinemasso/Images/Hierarquia-de-Arquivos.png)

7. Serviço deve conseguir salvar e buscar dados de algum sistema de storage, podendo ser o próprio filesystem;  

8. Deve ser possível ler e escrever dados através de algum cliente HTTP como Postman, cURL, Insomnia.  

##### Extra  

1. Usar Postgres como storage;  

2. Usar uma aplicação React como view.  

## Grupo  
- [Ana Clara](https://github.com/acbarbeta);  
- Giuliano Morelli (eu);  
- [Lincoln Rodrigo](https://github.com/LinkolnR);  
- [Milan Moreira](https://github.com/Milan-Cruz);  
- [Rodrigo Rangel](https://github.com/rodrigo-rngl).  

O trabalho foi feito em grupo pelo [Replit](https://replit.com/@Giunossauro/AtvPrincipal2).  

###### Prazo: 27/05/2022 ~ 01/06/2022 (prorrogado prorrogado para todos os grupos até 06/06/2022)  
