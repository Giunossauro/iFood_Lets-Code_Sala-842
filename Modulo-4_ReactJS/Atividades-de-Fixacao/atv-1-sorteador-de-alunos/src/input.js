import { useRef } from "react";

export default function Input({ adicionar, sortear }) {
  const inputElement = useRef(null);

  const handleOnClick = (e) => {
    e.preventDefault();
    const input = inputElement.current.value;
    if (input) {
      adicionar(input);
      inputElement.current.value = "";
    }
  };

  return (
    <>
      <button onClick={sortear}>Sortear</button>
      <br />
      <br />
      <form>
        <input
          id="inputElementId"
          ref={inputElement}
          type="text"
          placeholder="Nome"
        />
        <button onClick={handleOnClick}>Adicionar Aluno</button>
      </form>
    </>
  );
}
