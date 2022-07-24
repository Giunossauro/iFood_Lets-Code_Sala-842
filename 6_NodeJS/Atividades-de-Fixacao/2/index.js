// 1 - criando callback hell - contando até 10 rapidão
const callbackHell_1 = [];
for(let contador = 1; contador <= 10; contador++){
  callbackHell_1.push(
    function(callback){
      setTimeout(() => {
        console.log("\nID: ",contador);
        callback();
      }, 300);
    }
  );
}

// 2 - criando equivalente do callback hell usando Promises
const callbackHell_2 = [];
for(let contador = 1; contador <= 10; contador++){
  callbackHell_2.push(
    function(callback){
      callback();
      return fetch(`https://pokeapi.co/api/v2/pokemon-species/${contador}/`);
    }
  );
}

// 3 - criando equivalente do callback hell usando Async Await
const callbackHell_3 = [];
for(let contador = 1; contador <= 10; contador++){
  callbackHell_3.push(
    async function(callback){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${contador}/`);
      callback();
      console.log("Color: ",(await response.json()).color.name);
    }
  );
}

(async function(){
  // misturando os callbacks 1, 2, 3 e 4
  callbackHell_1[0](() => 
    callbackHell_2[0](() => 
      callbackHell_3[0](() => 
        callbackHell_1[1](() => 
          callbackHell_2[1](() => 
            callbackHell_3[1](() => 
              callbackHell_1[2](() => 
                callbackHell_2[2](() => 
                  callbackHell_3[2](() => 
                    callbackHell_1[3](() => 
                      callbackHell_2[3](() => 
                        callbackHell_3[3](() => 
                          callbackHell_1[4](() => 
                            callbackHell_2[4](() => 
                              callbackHell_3[4](() => 
                                callbackHell_1[5](() => 
                                  callbackHell_2[5](() => 
                                    callbackHell_3[5](() => 
                                      callbackHell_1[6](() => 
                                        callbackHell_2[6](() => 
                                          callbackHell_3[6](() => 
                                            callbackHell_1[7](() => 
                                              callbackHell_2[7](() => 
                                                callbackHell_3[7](() => 
                                                  callbackHell_1[8](() => 
                                                    callbackHell_2[8](() => 
                                                      callbackHell_3[8](() => 
                                                        callbackHell_1[9](() => 
                                                          callbackHell_2[9](() => 
                                                            callbackHell_3[9](async() => {
// PROMISE ALL E PROMISE RACE - PROMISE ALL E PROMISE RACE - PROMISE ALL E PROMISE RACE - PROMISE ALL E PROMISE RACE
                                                              await sleep(450);
                                                              const callback_4 = [];
                                                              for (let index = 0; index < 10; index++){
                                                                const aux = await callbackHell_2[index](()=>{});
                                                                callback_4.push(aux.json());
                                                              }
                                                              const responseAll = await Promise.all(callback_4);
                                                              responseAll.forEach((e) => console.log(e.name));
                                                              await sleep(450);
                                                              const responseRace = await Promise.race(callbackHell_2);
                                                              console.log(
                                                                "\nVENCEDOR: ",(
                                                                  await (
                                                                    await responseRace(()=>{})
                                                                  ).json()
                                                                ).name,"\ncostuma ser o Bulbasauro mesmo... Bicho corre!"
                                                              );
                                                            })
                                                          ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                                                        )
                                                      )
                                                    ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                                                  )
                                                )
                                              ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                                            )
                                          )
                                        ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                                      )
                                    )
                                  ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                                )
                              )
                            ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                          )
                        )
                      ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
                    )
                  )
                ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
              )
            )
          ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
        )
      )
    ).then((p)=>p.json()).then((json)=>console.log("Name: ",json.name))
  );
})()

function sleep(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}
