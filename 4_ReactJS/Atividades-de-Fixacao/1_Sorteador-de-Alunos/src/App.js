import { useState, useRef } from "react";
import "./styles.css";

import Input from "./input";
import Items from "./items";

export default function App() {
  const [esperando, setEsperando] = useState([
    "Aluno 1",
    "Aluno 2",
    "Aluno 3",
    "Aluno 4",
    "Aluno 5",
    "Aluno 6",
    "Aluno 7",
    "Aluno 8",
    "Aluno 9",
    "Aluno 10",
    "Aluno 11",
    "Aluno 12",
    "Aluno 13",
    "Aluno 14",
    "Aluno 15",
    "Aluno 16",
    "Aluno 17",
    "Aluno 18",
    "Aluno 19",
    "Aluno 20",
    "Aluno 21",
    "Aluno 22",
    "Aluno 23"
  ]);
  const [sorteados, setSorteados] = useState([]);
  const alerta = useRef(null);

  const addNome = (newNome) => {
    if (
      !esperando.find((nome) => nome === newNome) &&
      !sorteados.find((nome) => nome === newNome)
    ) {
      const newNomes = [...esperando, newNome];
      setEsperando(newNomes);
    } else {
      alerta.current.innerText = "Este nome já existe!";
      setTimeout(() => (alerta.current.innerText = " "), 2_000);
    }
  };

  const removeNome = (nome) => {
    setEsperando(esperando.filter((e) => e !== nome));
    setSorteados(sorteados.filter((e) => e !== nome));
  };

  const sortear = () => {
    if (esperando.length > 0) {
      const sorteado = esperando[Math.floor(Math.random() * esperando.length)];
      setEsperando(esperando.filter((e) => e !== sorteado));
      setSorteados([...sorteados, sorteado]);
    } else {
      alerta.current.innerText = "Não há mais estudantes para sortear!";
      setTimeout(() => (alerta.current.innerText = " "), 2_000);
    }
  };

  return (
    <>
      <Input adicionar={addNome} sortear={sortear} />
      <div id="alerta" ref={alerta}> </div>
      <div id="quadros">
        <div className="quadro">
          <Items nomes={esperando} removeNome={removeNome} />
        </div>
        <div className="quadro">
          <Items nomes={sorteados} removeNome={removeNome} />
        </div>
      </div>
    </>
  );
}
