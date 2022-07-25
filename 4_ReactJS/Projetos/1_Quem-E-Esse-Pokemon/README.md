# Quem é Esse Pokemon?? - Guess Who | Cara a cara single player
  
---  
  
## Atividade Principal 1  

Projeto deve ser feito usando React e publicado em alguma plataforma como [Netlify](https://www.netlify.com/) ou [Surge](https://github.com/sintaxi/surge#readme).  

Tema do jogo fica a critério do grupo escolher.  

### Regras do jogo:  
 
No inicio do jogo deve ser possível ver lista completa de elementos.  

Um dos elementos tem que ser escolhido pela aplicação sem que o usuário saiba qual. O objetivo do usuario é descobrir qual o elemento selecionado pela aplicacao.  

Deve haver um jeito de selecionar filtros com características de cada elemento. Ao selecionar uma característica nova, verificar se o elemento, escolhido pela aplicação no passo anterior, tem aquela característica ou não.  

Caso o elemento tenha, devemos filtrar a lista de elementos para conter apenas os que tenham a característica selecionada.  

Caso o elemento não tenha a característica, filtrar lista de elementos para conter apenas os elementos que não tem a característica. Processo se repete até todos os filtros forem selecionados OU usuário escolher um dos elementos.  

Usuário deve poder fazer sua escolha a qualquer momento.  

Caso elemento selecionado pelo usuário seja o mesmo que o selecionado pela aplicação, mostrar mensagem de sucesso; caso contrário, mostrar mensagem de erro e avisar qual era o certo.  

O usuário deve conseguir reiniciar o jogo a qualquer momento.  

Não é necessario estar bonito.  

#### Bonus:  

Limitar escolha de filtros quando sobrar apenas X elementos para que usuário seja obrigado a escolher um.  

Criar uma pontuação baseado no tempo que o usuário levou desde o inicio do jogo até o fim E/OU na quantidade de filtros que utilizou.  

Permitir que usuario remova um dos filtros selecionados anteriormente.
Adicionar algum audio para as acoes.  

#### Help

Eu fiz um scriptzinho em node q talvez ajude voces tbm!  

Fiz 150 chamadas pra API do pokemon e montei 2 JSONs, um deles com pokemons e suas caracteristicas e outro com caracteristicas unicas pra montar os filtros.  
[Fetch Pokemon do Professor](./fetch-pkm-do-professor/)

E segue os 2 JSONs tbm:  
[Pokemons](./fetch-pkm-do-professor/pokemons.json)
[Filters](./fetch-pkm-do-professor/filters.json)

#### Grupos:  
Grupos de até 5 pessoas.  
Pode fazer sozinho.  

Enviar grupos aqui:
(hidden)  
  
## Grupo:  
- Giuliano Morelli (eu).  

###### Prazo: 09/04/2022 ~ 15/04/2022, prorrogado para todos os grupos até 20/04/2022  
