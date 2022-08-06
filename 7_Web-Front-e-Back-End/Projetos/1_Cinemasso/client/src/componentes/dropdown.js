function Dropdown({main, titulo1, titulo2, titulo3, link1='#', link2='#', link3='#'}){
    return(
        <div class="dropdown">
        <button class="dropbtn">{main}</button>
        <div class="dropdown-content">
          <a href={link1} value={titulo1}>{titulo1}</a>
          <a href={link2} value={titulo2}>{titulo2}</a>
          <a href={link3} value={titulo3}>{titulo3}</a>
        </div>
      </div>
    )
}



export default Dropdown


/*
          <Dropdown
            main='Programação'
            titulo1='filmes'
            titulo2='salas'
            titulo3='sessões'
          />


<div class="dropdown">
<button class="dropbtn">Cinemas</button>
<div class="dropdown-content">
  <a href="#" value="cinemark">Cinemark</a>
  <a href="#" value="cinemark">Kinoplex</a>
  <a href="#" value="cinemark">Cineplex</a>
</div>
</div> 

<div class="dropdown">
<button class="dropbtn">Programação</button>
<div class="dropdown-content">
  <a href="#" value="filmes">Filmes</a>
  <a href="#" value="salas">Salas</a>
  <a href="#" value="sessoes">Sessões</a>
</div>
</div>

*/