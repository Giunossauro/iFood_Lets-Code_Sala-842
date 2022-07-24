export default function Items({ nomes, removeNome }) {
    return (
      <ul>
        {nomes.map((nome) => (
          <li key={nome}>
            <button onClick={() => removeNome(nome)} title="remover">
              🗑
            </button>{" "}
            - {nome}
            <br />
          </li>
        ))}
      </ul>
    );
  }
  