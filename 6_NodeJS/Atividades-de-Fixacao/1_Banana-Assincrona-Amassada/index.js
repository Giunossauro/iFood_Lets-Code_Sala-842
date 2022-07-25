console.log("Vamos fazer banana amassada.\nReceita:");

fetch("https://raw.githubusercontent.com/adrianosferreira/afrodite.json/master/afrodite.json").then((response) => {
    return response.json();
  }).then((json) => {
    verReceita(json);
    amassar(banana);
    console.log("Não esquece da aveia!");
    div.innerHTML += "<p>Não esquece da aveia!</p>";
  }).catch((error) => {
    console.log(error);
    div.innerHTML += `<p>${error}</p>`;
});

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function banana(){
  console.log("splish..");
  div.innerHTML += "<p>splish..</p>";
  await sleep(333);
  console.log("splish..");
  div.innerHTML += "<p>splish..</p>";
  await sleep(333);
  console.log("splish..");
  div.innerHTML += "<p>splish..</p>";
  await sleep(333);
  console.log("Pronto!");
  div.innerHTML += "<p>Pronto!</p>";
}

function amassar(callback){
  callback();
}

function verReceita(receitas){
  const nomeDasReceitas = [];
  for (const receita of receitas){
    nomeDasReceitas.push(receita.nome);
  }
  let temReceita = false;
  for (let index  = 0; index < nomeDasReceitas.length; index++){
    if(nomeDasReceitas[index].toUpperCase().includes("BANANA AMASSADA")){
      console.log(json[index]);
      div.innerHTML += `<p>${json[index]}</p>`;
      temReceita = true;
    }
  }
  if(!temReceita){
    console.log("Amassa a banana, joga a aveia e amassa mais.")
    div.innerHTML += "<p>Amassa a banana, joga a aveia e amassa mais.</p>";
  }
}