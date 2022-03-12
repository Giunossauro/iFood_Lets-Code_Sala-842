/**
 * Escreva um algoritmo que permita a leitura dos nomes de 10 pessoas e
 * armaze os nomes lidos em um vetor.
 * 
 * Após isto, o algoritmo deve permitir a leitura de mais 1 nome qualquer
 * de pessoa e depois escrever a mensagem ACHEI, se o nome estiver entre
 * os 10 nomes lidos anteriormente (guardados no vetor), ou NÃO ACHEI
 * caso contrário.  
 * 
 * Obs: Utilize a interface html para receber os dados do usuário
 */

const elementoNomes = document.getElementById("nomes");
const elementoNome = document.getElementById("nome");
let nomes = [];
let contador = 0;

const salvar = () => {
    imprimir(document.getElementById("nome").value);
    ++contador;
    
    if (contador == 10){
        ++contador;
        document.getElementById("botao").value = "Procurar";
    }
};

const imprimir = (nome) => {
    if(contador < 10){
        nomes.push(nome);
        elementoNomes.innerHTML += `
            <span class="text-center fs-3">
                ${nome}${contador != 9 ? " - " : ""}
            </span>
        `;
    }
    else if(nome == nomes.find(nomeProcurado => nomeProcurado == nome)){
        elementoNomes.innerHTML += `
            <p class="text-center fs-2 mt-2">
                ACHEI
            </p>
        `;
    }
};

elementoNome.addEventListener("keydown", function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("botao").click();
        elementoNome.value = "";
    }
}); 