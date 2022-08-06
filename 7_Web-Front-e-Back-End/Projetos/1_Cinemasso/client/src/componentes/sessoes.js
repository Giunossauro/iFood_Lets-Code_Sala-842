
function Sessao({ nome, linkExterno, imagem, capacidade, filmes, horario, datainicio }) {
   
    const options = { hour: "2-digit", minute: "numeric" }
    const dataHora = new Date(datainicio).toLocaleDateString()
    const Hora = new Date(datainicio).toLocaleTimeString(undefined, options)
    
    return (
        <div className='conteinerFilmeEInfoSessao'>
            <div className="folderSessao">
                <h2>{nome}</h2>
                {/*<div className='tituloFilme' style={{margin:'1vw 0'}}>{titulo}</div>*/}
                <a href={linkExterno} style={{ textDecoration: 'none' }}
                target='_blank'>
                <img src={imagem} alt='poster'
                    className="filmeIndividual"
                /></a>
            </div>

            <div>
            <span>Filme: </span> <br />
                <span>Sala: </span> <br />
                <span>Dia:{dataHora}</span> <br />
                <span>Horário:{Hora}</span>
            </div>
        </div>
    )
}



export default Sessao
