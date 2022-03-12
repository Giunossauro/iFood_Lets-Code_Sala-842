/**
 *  Escreva um algoritmo que imprima a tabuada (de 1 a 10) para os números
 * de 1 a 10. 
 */

const elementoResultado = document.getElementById("resultado");

const calcular = () => {
    elementoResultado.innerHTML = "";
    imprimir(1, 1);
};

const imprimir = (valor1, valor2) => {
    if(valor1 <= 10){
        if(valor2 <= 10){
            elementoResultado.innerHTML += `
                <p class="text-center fs-3">
                    ${valor1} x ${valor2} = ${valor1 * valor2}
                </p>
            `;
            imprimir(valor1, valor2 + 1);
        }
        else{
            elementoResultado.innerHTML += `
                <hr class="my-5">
            `;
            imprimir(valor1 + 1, 1);
            return;
        }
    }
    else{
        return;
    }
};