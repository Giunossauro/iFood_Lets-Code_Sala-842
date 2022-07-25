# Checklist

---

## Atividade Principal 1  

###### Link para visitar a página da atividade: [CLIQUE AQUI](http://htmlpreview.github.io/?)

### Print:

![Print]()

## Requisitos

Uma empresa de transportes pretende automatizar a gestão de frota de seus veiculos, e querem automatizar um processo de preenchimento de checklists, hoje esse processo é feito manualmente, e contém os seguintes passos:  

* O motorista chega na empresa  
* Pega o checklist com o lider  
* Verifica o carro  
* Preenche o checklist   
* Leva o checklist preenchido ao lider  
* Validar o checklist  
* Pegar autorização  
* Pegar o carro  
* Ir a portaria  
* Apresentar a autorização  

###### Criar um pequeno algoritimo que automatize e que perminte que seja preenchido um checklist com os seguintes campos:

* Placa
* Modelo
* Ano
* Km
* Nome do motorista
* Matrícula do motorista
* Estados dos Pneus - OK/Não OK
* Lataria - OK/Não OK
* Farois - OK/Não OK
* Nível de combustível - OK/Não OK

#### Regras de Negócio
1ª - Campos Obrigatórios
* Placa
* Km
* Nome do motorista

2ª - Restrições
* O pneu deve estar bom para sair da empresa
* Os farois devem estar bons para sair da empresa
* O lider precisa ser acionado por qualquer não conformidade do veículo

##### Existe um sistema que dispara SMS para o lider  
` AcionarLider.SMS //função que avisa o lider `

##### Existe outro sistema ligado a portaria
` Portaria.autorizar // função que autoriza na portaria `

###### Prazo: ? ~ ?  
