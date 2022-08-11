import { useEffect, useState, useRef } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Draggable from "react-draggable";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Select from "@mui/material/Select";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

import NavigationIcon from "@mui/icons-material/Navigation";

import "./App.css";

import filtersList from "./filters.json";
import pokemonsList from "./pokemons.json";

import HeaderTitles from "./components/HeaderTitles";
import SelectedContent from "./components/SelectedContent";

const filter = `blur(calc(10px + ${
  window.screen.width / document.getElementById("dpi").offsetWidth
}px)) grayscale(100%)`;

const secretPokemonIndex = Math.floor((Math.random() * (pokemonsList.length - 1)));
const secretPokemon = Object.entries(pokemonsList[secretPokemonIndex]);
const secretPokemonId = pokemonsList[secretPokemonIndex].id;

const intervals = [];

let isOnList = false;
let isOnListHandler = false;

const modalStyle = {
  transform: "translate(-50%, -50%)",
  color: "rgb(255, 255, 255)",
  bgcolor: "rgb(18, 18, 18)",
  border: "2px solid #000",
  position: "absolute",
  width: "60vmin",
  boxShadow: 24,
  top: "50%",
  left: "50%",
  p: 4,
};
const modalButtonStyle = { mt: 2, width: "100%", border: "1px solid gray" };

console.log("secretPokemon - ", secretPokemon[0][1], secretPokemon);

export default function App() {
  const nodeRefConfirm = useRef(null);
  const nodeRefSombra = useRef(null);

  const headerTitlesHeight = "5vh";
  const headerContentHeight = "17.5vh";
  const headerHeight = "calc(".concat(headerTitlesHeight, " + ", headerContentHeight, ")");
  const mainHeightCalc = "calc(100% - ".concat(headerHeight, ')');

  const [modalWelcomeState, setModalWelcomeState] = useState(true);
  const [modalSombraState, setModalSombraState] = useState(false);
  const [modalConfirmState, setModalConfirmState] = useState(false);
  const [modalResultState, setModalResultState] = useState(false);

  const [endOfGame, setEndOfGame] = useState(false);
  const [pokemons, setPokemons] = useState(pokemonsList);
  const [filters, setFilters] = useState(filtersList);
  const [filtrados, setFiltrados] = useState([]);
  const [selectState, setSelectState] = useState([...filtersList.map(() => false)]);
  const [activeElement, setActiveElement] = useState(false);
  const [pokemonEscolhido, setPokemonEscolhido] = useState(pokemons.map((p)=>p)[0].id);

  //será que precisa desta gambiarra??
  useEffect(() => { }, [selectState, pokemons, pokemonEscolhido]);
  useEffect(() => {
    setSelectState([...filtersList.map(() => false)]);
  }, [activeElement]);

  intervals.push(setInterval(() => {
    if (document.activeElement.classList[0] === "MuiPaper-root") {
      setActiveElement(!activeElement);
    }
    while (intervals.length > 1) {
      clearInterval(intervals.splice(0, 1)[0]);
    }
  }, 10));

  if (isOnListHandler) {
    isOnListHandler = false;
  } else {
    isOnList = false;
  }

  return (
    <>
      <HeaderTitles headerTitlesHeight={headerTitlesHeight} />

      {/* HEADER CONTENT */}
      <Container
        maxWidth={false}
        disableGutters={true}
        sx={{
          maxHeight: `${headerContentHeight}`,
          height: `${headerContentHeight}`,
          backgroundColor: "#30A7D7",
          position: "fixed",
          display: "flex",
          width: "100%",
          flexGrow: 1,
          pr: 0,
          pl: 1,
        }}
      >
        <SelectedContent filtrados={filtrados} />

        {/* SELECTABLE */}
        <Grid container spacing={1} sx={{
          gridTemplateColumns: "1fr 1fr 1fr",
          gridTemplateRows: "1fr 1fr",
          borderLeft: "2px solid black",
          alignItems: "safe center",
          overflow: "auto",
          minWidth: "65vw",
          width: "65vw",
          display: "grid",
          flexGrow: 1,
          m: 0,
          pt: ".5vh",
          pr: 0,
          pb: 1,
          pl: 1,
        }}>
          {filters.map((filterList, filtersIdx) => (
            <FormControl
              key={filtersIdx}
              sx={{
                backgroundColor: "#3089d7",
                maxWidth: "19.25vw",
                minWidth: "19.25vw",
                width: "19.25vw",
                m: 0,
                mb: ".5vh",
                p: 0,
              }}
              size="small"
            >
              <InputLabel
                id={Object.getOwnPropertyNames(filterList)}
                sx={{
                  minWidth: "calc(inherit - 14px)", //calc(45% + 9vw)
                  maxWidth: "calc(100% - 6px)",
                  fontSize: "1.9vmax",
                  textAlign: "center",
                  fontWeight: "bold",
                  top: "-2px",
                  left: "-10px",
                  pr: 0,
                  pl: 0,
                }}>
                {
                  filtersIdx === 3 ?
                  ''.concat('*', Object.getOwnPropertyNames(filterList)) :
                  Object.getOwnPropertyNames(filterList)
                }
              </InputLabel>
              <Select
                value={''}
                IconComponent={() => null}
                labelId={`${Object.getOwnPropertyNames(filterList)}`}
                label={Object.getOwnPropertyNames(filterList)}
                sx={{
                  pr: 0,
                  pl: 0,
                  fontSize: ".75em"
                }}
                open={selectState[filtersIdx]}
                onClick={() =>
                  setSelectState([...filtersList.map(
                    (_, idx) => filtersIdx === idx
                  )])
                }
                onClose={() =>
                  setSelectState([...filtersList.map(
                    () => false
                  )])
                }
                onChange={(event) => {
                  const selecionado = event.target.value;

                  secretPokemon.forEach((attr) => attr.forEach((value) => {
                    if (typeof value !== "object") {
                      if (value === selecionado) {
                        isOnList = true;
                        isOnListHandler = true;
                        return;
                      }
                    } else if (value.includes(selecionado)) {
                      isOnList = true;
                      isOnListHandler = true;
                    }
                  }));

                  setFiltrados([{
                    selecionado: selecionado,
                    isOnList: isOnList
                  }, ...filtrados]);

                  setPokemons(() => {
                    const pokemonsAsArray = pokemons.map(
                      pokemon => Object.entries(pokemon)
                    );
                    let filteredPokemonIndex = [];

                    pokemonsAsArray.forEach((pokemon, pokemonIdx) => pokemon.forEach(
                      (rootAttribute) => rootAttribute.forEach((attribute) => {
                        if (attribute !== selecionado) {
                          if (typeof attribute === "object") {
                            if (attribute.includes(selecionado)) {
                              filteredPokemonIndex.push(pokemonIdx);
                            }
                          }
                        } else {
                          filteredPokemonIndex.push(pokemonIdx);
                        }
                        return undefined;
                      })
                    ));

                    return pokemons.filter((_, pokemonIndex) => {
                      for (const value of filteredPokemonIndex) {
                        if (value === pokemonIndex) return isOnList;
                      }
                      return !isOnList;
                    });
                  });

                  setFilters(filters.map((actualFilterList) => {
                    const filterListAsArray = Object.entries(actualFilterList);

                    return Object.fromEntries([[
                      filterListAsArray[0][0],
                      filterListAsArray[0][1].filter((e) => e !== selecionado)
                    ]]);
                  }));
                }}
              >
                {Object.entries(filterList)[0][1].map((filterOption, filterOptionIndex) => (
                  <MenuItem
                    value={filterOption}
                    key={filterOptionIndex}
                  >
                    {filterOption}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
          <span style={{
            fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
            lineHeight: "1vh",
            fontSize: "1.6vh",
            minWidth: "300%",
            width: "300%",
          }}>
            *pokeapi com alguns formatos errados
          </span>
        </Grid>
        {/* /SELECTABLE */}
      </Container>
      {/* /HEADER CONTENT */}
      {/* /HEADER */}

      {/* MAIN */}
      <ImageList cols={
        window.innerWidth < 640 ? 3 : 5
      }
        sx={{
          maxWidth: "100%", minWidth: "100%", width: "100%",
          gridTemplateRows: "repeat(5, 1fr)",
          borderTop: "2px solid black",
          height: `${mainHeightCalc}`,
          top: `${headerHeight}`,
          m: 0, pt: 1, px: 0, pb: 0,
          backgroundColor: "#4DAD5B",
          position: "fixed",
          overflow: "auto",
        }}
      >
        {pokemons.map((pokemon, pokemonIndex) => (
          <ImageListItem
            onTouchStart={() => { }}
            key={pokemonIndex}
            sx={{
              width: "100%",
              height: "100%",
              cursor: "pointer"
            }}
            aria-label={`info about ${pokemon.Nome}`}
            onClick={() => {
              console.log();
              setPokemonEscolhido(pokemon.id);
              setModalConfirmState(true);
            }}
          >
            <img
              src={`${pokemon.sprite}`}
              srcSet={`${pokemon.sprite}`}
              alt={pokemon.Nome}
              loading="lazy"
              style={{
                borderRadius: ".5vmin"
              }}
            />
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 800 }}
              followCursor={true}
              placement="top-start"
              title={"".concat(pokemon.id, "-", pokemon.Nome)}
            >
              <div>
                <ImageListItemBar
                  title={"".concat(
                    pokemon.Nome[0].toUpperCase(),
                    pokemon.Nome.slice(1)
                  )}
                  alt={"".concat(
                    pokemon.id,
                    " - ",
                    pokemon.Nome[0].toUpperCase(),
                    pokemon.Nome.slice(1)
                  )}
                  subtitle={`Id: ${pokemon.id}`}
                  sx={{
                    borderRadius: ".7vmin",
                    maxWidth: "90%",
                    minWidth: "90%",
                    width: "90%",
                    maxHeight: "25%",
                    minHeight: "25%",
                    height: "25%",
                    ml: "5%",
                  }}
                />
              </div>
            </Tooltip>
          </ImageListItem>
        ))}
      </ImageList>
      {/* /MAIN */}

      {/* FOOTER */}
      <Draggable
        handle="#modal-confirm"
        open={modalConfirmState}
        onClose={() => setModalConfirmState(false)}
        nodeRef={nodeRefConfirm}
      >
        <Modal
          keepMounted
          ref={nodeRefConfirm}
          id="modal-confirm"
          hideBackdrop={false}
          open={modalConfirmState}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            transitionDuration: 500,
            sx: {
              maxWidth: "300vw",
              minWidth: "300vw",
              width: "300vw",
              maxHeight: "300vh",
              minHeight: "300vh",
              height: "300vh",
              overflow: "clip",
              top: "-150vh",
              left: "-150vw",
            }
          }}
          aria-labelledby="modal-confirm-title"
          aria-describedby={"modal-confirm-description"}
          onClose={() => setModalConfirmState(false) }
        >
          <Fade in={modalConfirmState}>
            <Box sx={modalStyle}>
              <Typography
                id="modal-confirm-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Tem certeza que {
                  pokemons.some((pokemon) => pokemon.id === pokemonEscolhido)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === pokemonEscolhido
                      ).Nome.toUpperCase()
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                } é o pokemon?
              </Typography>
              <Typography
                sx={{ mt: 2, textAlign: "center" }}
                id="modal-confirm-description"
              >
                Compare o pokemon com o imagem desfocada:
              </Typography>
              <span style={{ display: "flex", justifyContent: "center" }}><img
                width={"100%"}
                src={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).sprite
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                srcSet={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).sprite
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                alt={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).Nome
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                style={{
                  borderRadius: "0.5vmin",
                  filter: endOfGame ? '' : filter
                }}
              ></img></span>
              <Button
                sx={modalButtonStyle}
                onClick={() => {
                  setModalResultState(true);
                  setEndOfGame(true);
                }}
              >
                Veja se você acertou!
              </Button>
              <Modal
                keepMounted
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
                open={modalResultState}
                onClose={() => setModalResultState(false)}
                aria-labelledby="modal-result-title"
                aria-describedby="modal-result-description"
              >
                <Box sx={modalStyle}>
                  <Typography
                    id="modal-result-title"
                    variant="h6"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >{
                    secretPokemonId === pokemonEscolhido
                    ?
                    "Parabéns!!!"
                    :
                    "Ahhh... Você errou."
                  }</Typography>
                  
                  <Typography
                    sx={{ mt: 2, textAlign: "center" }}
                    id="modal-result-description"
                  >{
                    secretPokemonId === pokemonEscolhido
                    ?
                    `O ${
                      pokemons.find(
                        (pokemon) => pokemon.id === pokemonEscolhido
                      ).Nome.toUpperCase()
                    } é o pokemon escolhido!`
                    :
                    `O ${
                      pokemons.find(
                        (pokemon) => pokemon.id === secretPokemonId
                      ).Nome.toUpperCase()
                    } era o pokemon secreto.`
                  }</Typography>
                  <Button
                    sx={modalButtonStyle}
                    onClick={() => setModalResultState(false)}
                  >
                    {secretPokemonId === pokemonEscolhido ? "Beleza!!" : "Ok..."}
                  </Button>
                </Box>
              </Modal>
            </Box>
          </Fade>
        </Modal>
      </Draggable>
      <Modal
          keepMounted
          //ref={nodeRef}
          id="modal-welcome"
          hideBackdrop={false}
          open={modalWelcomeState}
          closeAfterTransition
          sx={{
            overflowY: "scroll",
            mt: 4,
            mb: 4
          }}
          BackdropComponent={Backdrop}
          BackdropProps={{
            transitionDuration: 500,
            sx: {
              maxWidth: "300vw",
              minWidth: "300vw",
              width: "300vw",
              maxHeight: "300vh",
              minHeight: "300vh",
              height: "300vh",
              overflow: "clip",
              top: "-150vh",
              left: "-150vw",
            }
          }}
          aria-labelledby="modal-welcome-title"
          aria-describedby={"modal-welcome-description"}
          onClose={() => setModalWelcomeState(false) }
        >
          <Fade in={modalWelcomeState}>
            <Box sx={{
              ...modalStyle,
              overflow: "scroll"
            }}>
              <Typography
                id="modal-welcome-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Quem é esse pokemon???
              </Typography>
              <span style={{ mt: 2, display: "flex", justifyContent: "center" }}><img
                width={"50%"}
                src={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).sprite
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                srcSet={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).sprite
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON".sprite
                }
                alt={
                  pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                    ?
                      pokemons.find((pokemon) => 
                        pokemon.id === secretPokemonId
                      ).Nome
                    :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                style={{
                  borderRadius: "0.5vmin",
                  filter: filter
                }}
              ></img></span>
              <Typography
                sx={{ mt: 2, textAlign: "center" }}
                id="modal-welcome-description"
              >
                <p>Você consegue adivinhar qual é este pokemon?</p>
                
                <p>Escolha as características que você acha que ele tem
                para limpar lista de todos os pokemons de acordo com as
                características do pokemon secreto.</p>
                
                <p>Quando quiser escolher, clique no pokemon e confirme.
                Tua pontuação será calculada de acordo com quantos filtros
                foram aplicados.</p>
                
                <p>Boa sorte!!!</p>
              </Typography>
              <Button
                sx={modalButtonStyle}
                onClick={() => setModalWelcomeState(false)}
              >
                Vamos lá?
              </Button>
            </Box>
          </Fade>
        </Modal>
        <Draggable
          handle="#modal-sombra"
          open={modalSombraState}
          onClose={() => setModalSombraState(false)}
          nodeRef={nodeRefSombra}
        >
          <Modal
            keepMounted
            id="modal-sombra"
            ref={nodeRefSombra}
            hideBackdrop={false}
            closeAfterTransition
            open={modalSombraState}
            BackdropComponent={Backdrop}
            BackdropProps={{
              transitionDuration: 500,
              sx: {
                maxWidth: "300vw",
                minWidth: "300vw",
                width: "300vw",
                maxHeight: "300vh",
                minHeight: "300vh",
                height: "300vh",
                overflow: "clip",
                top: "-150vh",
                left: "-150vw",
              }
            }}
            aria-labelledby="modal-sombra-title"
            aria-describedby={"modal-sombra-description"}
            onClose={() => setModalSombraState(false) }
          >
            <Fade in={modalSombraState}>
              <Box sx={{
                ...modalStyle,
                overflow: "hidden"
              }}>
                <Typography
                  id="modal-sombra-title"
                  variant="h6"
                  component="h2"
                  sx={{ textAlign: "center" }}
                >
                  Quem é esse pokemon???
                </Typography>
                <span style={{ display: "flex", justifyContent: "center" }}><img
                  width={"100%"}
                  src={
                    pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                      ?
                        pokemons.find((pokemon) => 
                          pokemon.id === secretPokemonId
                        ).sprite
                      :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                  }
                  srcSet={
                    pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                      ?
                        pokemons.find((pokemon) => 
                          pokemon.id === secretPokemonId
                        ).sprite
                      :
                    "ERRO AO BUSCAR O NOME DO POKEMON".sprite
                  }
                  alt={
                    pokemons.some((pokemon) => pokemon.id === secretPokemonId)
                      ?
                        pokemons.find((pokemon) => 
                          pokemon.id === secretPokemonId
                        ).Nome
                      :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                  }
                  style={{
                    borderRadius: "0.5vmin",
                    filter: filter
                  }}
                ></img></span>
                <Button
                  sx={modalButtonStyle}
                  onClick={() => setModalSombraState(false)}
                >
                  Ok?
                </Button>
              </Box>
            </Fade>
          </Modal>
        </Draggable>
        <Fab
          variant="extended"
          size={window.innerWidth < 640 ? "small" : "medium"}
          color="primary"
          aria-label="add"
          sx={{
            top: `calc(${window.innerHeight}px - 6rem - 2vh)`,
            left: `calc(${window.innerWidth}px - 10rem - 2vw)`,
          }}
          onClick={() => setModalSombraState(true)}
        >
          <NavigationIcon sx={{ mr: 1 }} />
          VER SOMBRA
        </Fab>
      <footer></footer>
    </>
  );
}
