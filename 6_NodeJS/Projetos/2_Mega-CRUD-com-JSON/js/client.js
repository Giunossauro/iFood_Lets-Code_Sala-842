function request(metodo,rota) {
  console.log("dasdsa",
    Object.entries(e.getElementsByTagName("input")).map(f => f[1].value)
  );
  axios({
    method: metodo,
    url: rota,
    data: JSON.stringify(
      {
        registroId: registroId.value,
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        endereco: endereco.value,
        senha: senha.value
      }
    ),
  })
  .then(function(response) {
    console.log("agfadf22222as",response);
  })
  .catch(function(error) {
    console.error("adsadas",error);
  }); 
}

// esta requisicao axios serve pra renderizar os dados na tela a primeira vez
axios.request('http://localhost:8081/post')
  .then(res => {
    document.getElementById('visualizarJson').innerText = res.data.map(e => `<p>${JSON.stringify(e)}</p>`);
  })
  .catch(err => console.log(err)
);