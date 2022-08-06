
function Sala({ nome, linkExterno, imagem, capacidade, filmes }) {
    return (
        
        <p className='conteinerFilmeEInfo'>
            
            <div className="folderSalas"
                style={{backgroundImage: `url(${imagem})`}}  
            >
                {/*<div className='tituloFilme' style={{margin:'1vw 0'}}>{titulo}</div>*/}
                

            <div style={{fontSize: '7vw', position:'relative', bottom:'-11vw'}}>{nome}</div>
            </div>
            <div style={{color:'rgb(255, 38, 255)'}}><b>Lugares: {capacidade} assentos</b>  </div>
        </p>
    )
}



export default Sala



/*                <a href={linkExterno} style={{ textDecoration: 'none' }}
                target='_blank'>
                <img src={imagem} alt='img sala'
                    className="salaIndividual"
                /></a>*/