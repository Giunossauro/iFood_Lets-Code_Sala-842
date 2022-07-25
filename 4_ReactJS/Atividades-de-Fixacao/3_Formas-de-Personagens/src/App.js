import { useRef } from "react";
import "./styles.css";

export default function App() {
  const personagens = new Map([
    [ 
      "goku",
      [
        "https://www.einerd.com.br/wp-content/uploads/2017/02/goku-890x466.jpg",
        "https://s.aficionados.com.br/imagens/gokukaio-kenvsvegetanv_cke.jpg",
        "https://s.aficionados.com.br/imagens/dragon-ball-z-super-saiyan-goku_cke.jpg",
        "https://s.aficionados.com.br/imagens/funko-pop-dragon-ball-z-super-saiyan-3-goku-492-nuevo-d-nq-np-812883-mla29350084353-022019-f_cke.jpg"
      ]
    ],
    [
      "vegeta",
      [
        "https://criticalhits.com.br/wp-content/uploads/2020/05/vegeta-base.jpg",
        "https://i1.sndcdn.com/artworks-y1WcOJwtzfhThB5i-kDG3rg-t500x500.jpg",
        "https://i.pinimg.com/originals/33/37/b0/3337b04a4873c6e2c49b3a1dd97fea93.jpg"
      ]
    ]
  ]);
  const forma = useRef(null);
  const mostraForma = (personagem, index) => {
    forma.current.innerHTML = `<img src="${
      personagens.get(personagem)[index]
    }" />`;
  };
  console.log(personagens.get("goku")[0]);

  return (
    <div className="App">
      <div className="quadro">
        <h1>Goku</h1>
        <h3>Formas</h3>
        <button onClick={() => mostraForma("goku", 0)}>Forma 1</button>
        <button onClick={() => mostraForma("goku", 1)}>Forma 2</button>
        <button onClick={() => mostraForma("goku", 2)}>Forma 3</button>
        <button onClick={() => mostraForma("goku", 3)}>Forma 4</button>
      </div>
      <div className="quadro">
        <h1>Vegeta</h1>
        <h3>Formas</h3>
        <button onClick={() => mostraForma("vegeta", 0)}>Forma 1</button>
        <button onClick={() => mostraForma("vegeta", 1)}>Forma 2</button>
        <button onClick={() => mostraForma("vegeta", 2)}>Forma 3</button>
      </div>
      <div ref={forma}>a</div>
    </div>
  );
}
