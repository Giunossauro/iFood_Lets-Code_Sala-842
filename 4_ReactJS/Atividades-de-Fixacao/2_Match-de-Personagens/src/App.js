import { useRef } from "react";
import "./styles.css";
 
export default function App() {
  const elementoInput = useRef(null);
  const elementoPersonagem = useRef(null);

  const verifica = (e) => {
    if (e.target.value === "Goku"){
      elementoPersonagem.current.innerHTML = `
          <img src="https://www.einerd.com.br/wp-content/uploads/2017/02/goku-890x466.jpg" />
      `
    }
    else{
      elementoPersonagem.current.innerHTML = `
        <h1>personagem vem aqui</h1>
      `
    }
  };

  return (
    <div className="App">
      <input
        placeholder="nome do personagem"
        type="text"
        ref={elementoInput}
        onChange={verifica}
      />
      <br />
      <div ref={elementoPersonagem}>
        <h1>personagem vem aqui</h1>
      </div>
      <h3>Dica: é o Goku!</h3>
    </div>
  );
}
