
function Filme({ titulo, duracao, linkExterno, imagem, categoria }) {
    return (
        <div className='conteinerFilmeEInfo'>
            <div className="folderFilme">
                {/*<div className='tituloFilme' style={{margin:'1vw 0'}}>{titulo}</div>*/}
                <a href={linkExterno} style={{ textDecoration: 'none' }}
                target='_blank'>
                <img src={imagem} alt='poster'
                    className="filmeIndividual"
                /></a>
            </div>

            <div className='informacoesAdicionaisFilmes' >
                <span>Título: {titulo}</span> <br />
                <span>Duração: {duracao} min</span> <br />
                <span>Categoria: </span><br />
                <span> </span>
            </div>
        </div>
    )
}



export default Filme



