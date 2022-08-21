import { Component , createRef } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import NavigationIcon from "@mui/icons-material/Navigation";

import Draggable from "react-draggable";

const filter = `blur(calc(10px + ${
  window.screen.width / document.getElementById("dpi").offsetWidth
}px)) grayscale(100%)`;

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

export default class Modals extends Component{
  constructor(props){
    super(props);
    this.state = {
      modalWelcomeState: true,
      modalSombraState: false,
      modalResultState: false
    }
    this.sombraRef = createRef();
    this.confirmRef = createRef();
    this.resultRef = createRef();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      (this.state.modalWelcomeState !== nextState.modalWelcomeState)
      ||
      (this.state.modalSombraState !== nextState.modalSombraState)
      ||
      (this.state.modalResultState !== nextState.modalResultState)
      ||
      (this.props.modalConfirmState !== nextProps.modalConfirmState)
    );
  }
  
  render() {
    return (<>
      <Draggable
        handle="#modal-confirm"
        open={this.props.modalConfirmState}
        onClose={() => this.props.propsHandler({ modalConfirmState: false })}
        nodeRef={this.confirmRef}
      >
        <Modal
          keepMounted
          ref={this.confirmRef}
          id="modal-confirm"
          hideBackdrop={false}
          open={this.props.modalConfirmState}
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
          onClose={() => this.props.propsHandler({ modalConfirmState: false })}
        >
          <Fade in={this.props.modalConfirmState}>
            <Box sx={modalStyle}>
              <Typography
                id="modal-confirm-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Tem certeza que {
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.pokemonEscolhido
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.pokemonEscolhido
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
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
                    ).sprite
                    :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                srcSet={
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
                    ).sprite
                    :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                alt={
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
                    ).Nome
                    :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                style={{
                  borderRadius: "0.5vmin",
                  filter: this.props.endOfGame ? '' : filter
                }}
              ></img></span>
              <Button
                sx={modalButtonStyle}
                onClick={() => {
                  this.setState({ ...this.state, modalResultState: true });
                  this.props.propsHandler({ endOfGame: true });
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
                open={this.state.modalResultState}
                onClose={() => 
                  this.setState({ ...this.state, modalResultState: false })
                }
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
                      this.props.secretPokemonId === this.props.pokemonEscolhido
                        ?
                        "Parabéns!!!"
                        :
                        "Ahhh... Você errou."
                    }</Typography>

                  <Typography
                    sx={{ mt: 2, textAlign: "center" }}
                    id="modal-result-description"
                  >{
                      this.props.secretPokemonId === this.props.pokemonEscolhido
                        ?
                        `O ${this.props.pokemons.find(
                          (pokemon) => pokemon.id === this.props.pokemonEscolhido
                        ).Nome.toUpperCase()
                        } é o pokemon escolhido!`
                        :
                        `O ${this.props.pokemons.find(
                          (pokemon) => pokemon.id === this.props.secretPokemonId
                        ).Nome.toUpperCase()
                        } era o pokemon secreto.`
                    }</Typography>
                  <Button
                    sx={modalButtonStyle}
                    onClick={() => this.setState({
                      ...this.state, modalResultState: false
                    })}
                  >
                    {this.props.secretPokemonId === this.props.pokemonEscolhido ?
                    "Beleza!!" : "Ok..."}
                  </Button>
                </Box>
              </Modal>
            </Box>
          </Fade>
        </Modal>
      </Draggable>
      <Modal
        keepMounted
        id="modal-welcome"
        hideBackdrop={false}
        open={this.state.modalWelcomeState}
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
        onClose={() => this.setState({ ...this.state, modalWelcomeState: false })}
      >
        <Fade in={this.state.modalWelcomeState}>
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
              Qual é o pokemon?
            </Typography>
            <span style={{ mt: 2, display: "flex", justifyContent: "center" }}><img
              width={"50%"}
              src={
                this.props.pokemons.some(
                  (pokemon) => pokemon.id === this.props.secretPokemonId
                )
                  ?
                  this.props.pokemons.find((pokemon) =>
                    pokemon.id === this.props.secretPokemonId
                  ).sprite
                  :
                  "ERRO AO BUSCAR O NOME DO POKEMON"
              }
              srcSet={
                this.props.pokemons.some(
                  (pokemon) => pokemon.id === this.props.secretPokemonId
                )
                  ?
                  this.props.pokemons.find((pokemon) =>
                    pokemon.id === this.props.secretPokemonId
                  ).sprite
                  :
                  "ERRO AO BUSCAR O NOME DO POKEMON".sprite
              }
              alt={
                this.props.pokemons.some(
                  (pokemon) => pokemon.id === this.props.secretPokemonId
                )
                  ?
                  this.props.pokemons.find((pokemon) =>
                    pokemon.id === this.props.secretPokemonId
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
              component={"div"}
            >
              <Typography component='p' sx={{ pb: 2 }}>Escolha até _ filtros:
                se for do pokemon secreto, todos que tiverem ficam,
                senão somem.</Typography>

              <Typography component='p' sx={{ pb: 2 }}>
                A pontuação será por menos tempo e filtros
                aplicados.</Typography>
            </Typography>
            <Button
              sx={modalButtonStyle}
              onClick={() => this.setState({ ...this.state, modalWelcomeState: false })}
            >
              Boa sorte!!!
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Draggable
        handle="#modal-sombra"
        open={this.state.modalSombraState}
        onClose={() => this.setState({ ...this.state, modalSombraState: false })}
        nodeRef={this.sombraRef}
      >
        <Modal
          keepMounted
          id="modal-sombra"
          ref={this.sombraRef}
          hideBackdrop={false}
          closeAfterTransition
          open={this.state.modalSombraState}
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
          onClose={() => this.setState({ ...this.state, modalSombraState: false })}
        >
          <Fade in={this.state.modalSombraState}>
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
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
                    ).sprite
                    :
                    "ERRO AO BUSCAR O NOME DO POKEMON"
                }
                srcSet={
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
                    ).sprite
                    :
                    "ERRO AO BUSCAR O NOME DO POKEMON".sprite
                }
                alt={
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.secretPokemonId
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.secretPokemonId
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
                onClick={() => this.setState({ ...this.state, modalSombraState: false })}
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
        onClick={() => this.setState({ ...this.state, modalSombraState: true })}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        VER SOMBRA
      </Fab>
    </>);
  }
}
