let checklist = [];
        let checkedOk = false;
        let erro = false;
        let tempPromptVar;
        let podeSair = true;

        const AcionarLider = {SMS: function(){}};
        const Portaria = {Autorizar: function(resultadoChecklist){
            resultadoChecklist ? console.log("Pode sair!") : console.log("Nao pode sair...")
        }};

        function perguntaAberta(perguntaSobre){
            while(!checkedOk){
                if (!erro){
                    tempPromptVar = prompt("Por favor, informe " + perguntaSobre + ": ");
                }
                else{
                    tempPromptVar = prompt("VALOR INVALIDO! Por favor, informe o(a) " + perguntaSobre + ": ");
                }
                if (tempPromptVar){
                    checklist.push(tempPromptVar);
                    checkedOk = true;
                }
                else{
                    erro = true;
                }
            }
            checkedOk = false;
            erro = false;
        }

        function perguntaFechada(perguntaSobre){
            while(!checkedOk){
                if (!erro){
                    tempPromptVar = prompt("O estado " + perguntaSobre + " esta ok? (S/N)");
                }
                else{
                    tempPromptVar = prompt("VALOR INVALIDO! O estado do(a)(s) " + perguntaSobre + " esta ok? (S/N)");
                }
            
                if (tempPromptVar == "s" || tempPromptVar == "S"){
                    checklist.push("O estado "+ perguntaSobre + " esta(o) ok");
                    checkedOk = true;
                }
                else if (tempPromptVar == "n" || tempPromptVar == "N"){
                    checklist.push("O estado "+ perguntaSobre + " nao esta(o) ok");
                    checkedOk = true;
                    if (perguntaSobre == "dos pneus" || perguntaSobre == "dos farois"){
                        AcionarLider.SMS();
                        podeSair = false;
                    }
                }
                else{
                    erro = true;
                }
            }
            checkedOk = false;
            erro = false;
        }

        perguntaAberta("a placa do carro");

        checklist.push(prompt("Por favor, informe o modelo do carro: "));
        checklist.push(prompt("Por favor, informe o ano do carro: "));

        perguntaAberta("a quilometragem do carro");
        perguntaAberta("o nome do(a) motorista");
        perguntaAberta("a matricula do(a) motorista");

        perguntaFechada("dos pneus");
        perguntaFechada("da lataria");
        perguntaFechada("dos farois");
        perguntaFechada("do nivel de combustivel");

        Portaria.Autorizar(podeSair);