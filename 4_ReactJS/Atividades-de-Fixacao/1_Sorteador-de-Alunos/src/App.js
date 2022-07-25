import { useState, useRef } from "react";
import "./styles.css";

import Input from "./input";
import Items from "./items";

export default function App() {
  const [esperando, setEsperando] = useState([
    "Leandro Fernandes Patrício", 
    "Rithie Natan Carvalhaes Prado",
    "Rodrigo Mendes de Souza",
    "Rodrigo Ribeiro Rangel",
    "Weatherly Moura Albuquerque",
    "Cláudio Makoto Miyata",
    "Flavius Marcelino da Costa",
    "Julia da Costa Telles Téo",
    "Murilo Henrique de Oliveira",
    "Pedro Henrique Rodrigues Gomes",
    "Danniel Dias Augusto",
    "Jéssica Silva Pereira Oliveira Mascarenhas",
    "João Vitor Nunes dos Santos",
    "Wallace Goulart",
    "Giuliano Mitteroheffer Morelli",
    "Lincoln Rodrigo Pereira de Melo",
    "Nicolas da Matta Freire Araujo",
    "Victor Guilherme dos Santos Silva",
    "Ana Clara Barbeta Vicente",
    "Daniel Lopez Giraldo",
    "Milan Moreira Cruz",
    "Thatyara Alves Gomes",
    "Wesley Matheus Sardinha"
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
