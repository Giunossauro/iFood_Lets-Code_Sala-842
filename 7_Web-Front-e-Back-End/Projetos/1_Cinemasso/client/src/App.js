import FilmesClient from './clients/filmes';
import SalasClient from './clients/salas';
import SessoesClient from './clients/sessoes';
import './App.css';
import { useState, useEffect } from "react";

import Filme from './componentes/filmes.js'
import Sala from './componentes/salas'
import Sessao from './componentes/sessoes.js'
import Dropdown from './componentes/dropdown.js'
import DropdownSemDropdown from './componentes/dropdownSemDropdown'


function App() {
  const [telaEntrada, setTelaEntrada] = useState(true);
  const [getFilmes, setGetFilmes] = useState(false);
  const [getSalas, setGetSalas] = useState(false);
  const [getSessoes, setGetSessoes] = useState(false);

  const [informacaoDosFilmes, setInformacaoDosFilmes] = useState(false);

  const [filmes, setFilmes] = useState([])
  const [salas, setSalas] = useState([])
  const [sessoes, setSessoes] = useState([])

  useEffect(() => {
    (async () => {
      const movie = await FilmesClient.fetchFilmes()
      setFilmes(movie)

      const room = await SalasClient.fetchSalas()
      setSalas(room)

      const session = await SessoesClient.fetchSessoes()
      setSessoes(session)
    })()
  }, [])

  const abrirTelaInicial = () => {
    setTelaEntrada(true);
    setGetFilmes(false);
    setGetSalas(false);
    setGetSessoes(false);
  }

  const abrirFilmes = () => {
    setTelaEntrada(false);
    setGetFilmes(true);
    setGetSalas(false);
    setGetSessoes(false);
  }

  const abrirSalas = () => {
    setTelaEntrada(false);
    setGetFilmes(false);
    setGetSalas(true);
    setGetSessoes(false);
  }

  const abrirSessoes = () => {
    setTelaEntrada(false);
    setGetFilmes(false);
    setGetSalas(false);
    setGetSessoes(true);
  }

  




  return (
    <>
      <header>
        <div className='logo'>
          <img className='imgLogo' src='https://img.freepik.com/free-vector/click-movie-logo-vector_18099-258.jpg'
            alt='logo' onClick={() => abrirTelaInicial()} />
          <b><span onClick={() => abrirTelaInicial()}>O Último fã do Milan</span></b>
        </div>
        <div className='login_registro_procura'>
          <div style={{ margin: '2vw' }} >
            <span>
              👤 Login <br /> Não é cadastrado? Clique aqui
            </span>
          </div>
          <span>  <input placeholder='O que procura?' /> 🔎</span>
        </div>
      </header>

      <body>

        <nav>
          <Dropdown
            main='Cinemas'
            titulo1='cinemark'
            titulo2='kinoplex'
            titulo3='cineplex'
          />
          <div class="dropdown">
            <button class="dropbtn">Programação</button>
            <div class="dropdown-content">
              <a href='#' onClick={() => abrirFilmes()}>Filmes</a>
              <a href='#' onClick={() => abrirSalas()}>Salas</a>
              <a href='#' onClick={() => abrirSessoes()}>Sessões</a>
            </div>
          </div>


          <DropdownSemDropdown
            main='Preços' />
          <DropdownSemDropdown
            main='Bomboniere' />
          <DropdownSemDropdown
            main='Produtos' />
          <DropdownSemDropdown
            main='Próximos Lançamentos' />
        </nav>


        <div className='telaEntrada' style={{ display: telaEntrada ? "block" : "none" }}>
          <img className='imgFundo'
            src='https://cdn.dribbble.com/users/529449/screenshots/4851203/atm_neon_dribbble.jpg' alt='planoDeFundo' />
          <p>Onde os melhores momentos acontecem. Escolha uma sessão e relaxe. O filme já vai começar.
          </p>
        </div>

        <section style={{ display: getFilmes ? "block" : "none" }}>
        <p style={{fontSize:'5vw'}}><u> <b>Filmes</b></u></p> 
          { 
            <div className="filmesEmCartaz">
             
              {filmes.map((item) => (
                < >
                  <Filme
                    titulo={item.nome}
                    linkExterno={item.linkinfo}
                    imagem={item.imagemsrc}
                    duracao={item.duracao}
                    categoria={item.categoriaid}
                  />
                </>
              ))}
            </div>
          }
        </section>

        <section style={{ display: getSalas ? "block" : "none" }}>
        <p style={{fontSize:'5vw'}}><u> <b>Salas</b></u></p> 
        <p>As salas mais confortáveis para a sua sessão. Você vai se sentir em casa</p>
          {
            <div className="filmesEmCartaz">
              {salas.map((item) => (
                < >
                  <Sala
                    nome={item.nome}
                    capacidade={item.capacidade}
                    imagem={item.imagemsrc}
                  />
                </>
              ))}
            </div>
          }
        </section>

        <section style={{ display: getSessoes ? "block" : "none" }}>
        <p style={{fontSize:'5vw'}}><u> <b>Sessões</b></u></p> 
          {
            <div className="filmesEmCartaz">
              {sessoes.map((item) => (
                < >
                  <Sessao
                    salaid={item.salaid}
                    filmeid={item.filmeid}
                    datainicio={item.datainicio}
                  />
                </>
              ))}
            </div>
          }
        </section>


      </body>
      <footer>

        <div>
          Powered by:
          Giuliano Morelli, Julia Teo, Leandro Patrício e Milan Cruz
        </div>
        <div style={{marginTop:'0.5vw'}} >
          Let's Code Modulo 7: Programação Web Módulo III
        </div>

      </footer>
    </>
  );
}

export default App;

