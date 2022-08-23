# Quem é Esse Pokemon?? - Guess Who | Cara a cara single player
  
---  
  
## Atividade Principal 1  

###### Link para visitar a página da atividade: [CLIQUE AQUI](https://guess-who-pokemon.herokuapp.com/)

## Requisitos

Projeto deve ser feito usando React e publicado em alguma plataforma como [Netlify](https://www.netlify.com/) ou [Surge](https://github.com/sintaxi/surge#readme).  

Tema do jogo fica a critério do grupo escolher.  

### Regras do jogo:  
 
- [x] No início do jogo deve ser possível ver lista completa de elementos;  

- [x] Um dos elementos tem que ser escolhido pela aplicação sem que o usuário saiba qual. O objetivo do usuario é descobrir qual o elemento selecionado pela aplicacao;  

- [x] Deve haver um jeito de selecionar filtros com características de cada elemento. Ao selecionar uma característica nova, verificar se o elemento, escolhido pela aplicação no passo anterior, tem aquela característica ou não;  

- [x] Caso o elemento tenha, devemos filtrar a lista de elementos para conter apenas os que tenham a característica selecionada;  

- [x] Caso o elemento não tenha a característica, filtrar lista de elementos para conter apenas os elementos que não tem a característica. Processo se repete até todos os filtros forem selecionados OU usuário escolher um dos elementos;  

- [x] Usuário deve poder fazer sua escolha a qualquer momento;  

- [x] Caso elemento selecionado pelo usuário seja o mesmo que o selecionado pela aplicação, mostrar mensagem de sucesso; caso contrário, mostrar mensagem de erro e avisar qual era o certo;  

- [x] O usuário deve conseguir reiniciar o jogo a qualquer momento;  

- [x] Não é necessário estar bonito.  

#### Bônus:  

- [x] Limitar escolha de filtros quando sobrar apenas X elementos para que usuário seja obrigado a escolher um;  

- [x] Criar uma pontuação baseada no tempo que o usuário levou desde o inicio do jogo até o fim E/OU na quantidade de filtros que utilizou;  

- [x] Permitir que usuário remova um dos filtros selecionados anteriormente;

- [x] Adicionar algum áudio para as ações.  

#### Help

Eu fiz um scriptzinho em node q talvez ajude voces tbm!  

Fiz 150 chamadas pra API do pokemon e montei 2 JSONs, um deles com pokemons e suas características e outro com características únicas pra montar os filtros.  
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

###### Known issues:   
- Remover um filtro verde (que o pokemon secreto possui) faz todos pokemons voltarem pra lista.