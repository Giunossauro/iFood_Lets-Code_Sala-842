import { Component, createRef } from "react";

import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

import NavigationIcon from "@mui/icons-material/Navigation";
import CloseIcon from '@mui/icons-material/Close';

import Draggable from "react-draggable";
import { flushSync } from "react-dom";

const imgErrorMsg = "ERRO AO BUSCAR O NOME DO POKEMON - Avise o Giuliano, por favor."
const filter = `blur(calc(10px + ${window.screen.width / document.getElementById("dpi").offsetWidth
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
  p: 2,
};

const modalButtonStyle = { mt: 2, width: "100%", border: "1px solid gray" };

export default class Modals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalWelcomeState: true,
      modalSombraState: false,
      modalResultState: false,
      resultado: 0
    }
    this.sombraRef = createRef();
    this.confirmRef = createRef();
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

  oPokemonSecretoEstaNaLista() {
    return this.props.pokemons.some(
      (pokemon) => pokemon.id === this.props.secretPokemonId
    );
  }

  spriteDoPokemonSecreto() {
    return this.props.pokemons.find((pokemon) =>
      pokemon.id === this.props.secretPokemonId
    ).sprite;
  }

  nomeDoPokemonSecreto() {
    return this.props.pokemons.find((pokemon) =>
      pokemon.id === this.props.secretPokemonId
    ).Nome;
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
            <Box sx={{ ...modalStyle, cursor: "grab" }}>
              <Typography
                id="modal-confirm-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                <CloseIcon
                  sx={{
                    ml: "95%",
                    cursor: "pointer",

                  }}
                  onClick={() => {
                    this.props.propsHandler({ modalConfirmState: false });
                    this.props.toggleClickAudio();
                  }}
                />
                {
                  this.props.pokemons.some(
                    (pokemon) => pokemon.id === this.props.pokemonEscolhido
                  )
                    ?
                    this.props.pokemons.find((pokemon) =>
                      pokemon.id === this.props.pokemonEscolhido
                    ).Nome.toUpperCase()
                    :
                    imgErrorMsg
                } é o pokemon?
              </Typography>
              <Typography
                sx={{ mt: 2, textAlign: "center" }}
                id="modal-confirm-description"
              >
                Compare o pokemon com o imagem desfocada:
              </Typography>
              <span style={{
                display: "flex",
                minWidth: "100%",
                justifyContent: "center"
              }}><img
                width={"100%"}
                src={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.spriteDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                srcSet={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.spriteDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                alt={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.nomeDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                style={{
                  borderRadius: "0.5vmin",
                  filter: this.props.endOfGame ? '' : filter,
                  zIndex: "-500"
                }}
              ></img></span>
              <Button
                sx={modalButtonStyle}
                onClick={() => {
                  if (!this.props.endOfGame) {
                    flushSync(() => this.setState({
                      resultado: Math.abs(
                        Math.round(1_000_000 - (
                          (new Date()).getTime() - this.props.startTime
                        ) * 2 * (this.props.selectedFiltersPointsModifier))
                      )
                    }));
                  }
                  this.props.toggleClickAudio();
                  this.setState({ modalResultState: true });
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
                  this.setState({ modalResultState: false })
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
                  >
                    <CloseIcon
                      sx={{
                        ml: "95%",
                        cursor: "pointer",

                      }}
                      onClick={() => {
                        this.props.toggleClickAudio();
                        this.setState({ modalResultState: false });
                      }}
                    />{
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
                        } é o pokemon escolhido! Você conseguiu ${this.state.resultado
                        } pontos.`
                        :
                        `O ${String(this.nomeDoPokemonSecreto()).toUpperCase()
                        } era o pokemon secreto. Você conseguiu 0 pontos.`
                    }</Typography>
                  <Button
                    sx={modalButtonStyle}
                    onClick={() => {
                      this.props.toggleClickAudio();
                      this.setState({ modalResultState: false });
                    }}
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
        onClose={() => this.setState({ modalWelcomeState: false })}
      >
        <Fade in={this.state.modalWelcomeState}>
          <Box sx={{
            ...modalStyle,
            overflow: "hidden"
          }}>
            <CloseIcon
              sx={{
                ml: "95%",
                cursor: "pointer",

              }}
              onClick={() => {
                this.setState({ modalWelcomeState: false });
                this.props.toggleClickAudio();
              }}
            />
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
                this.oPokemonSecretoEstaNaLista()
                  ?
                  this.spriteDoPokemonSecreto()
                  :
                  imgErrorMsg
              }
              srcSet={
                this.oPokemonSecretoEstaNaLista()
                  ?
                  this.spriteDoPokemonSecreto()
                  :
                  imgErrorMsg
              }
              alt={
                this.oPokemonSecretoEstaNaLista()
                  ?
                  this.nomeDoPokemonSecreto()
                  :
                  imgErrorMsg
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
              <Typography component='p' sx={{ pb: 2 }}>Escolha até 12 filtros:
                se for do pokemon secreto, todos que tiverem ficam,
                senão somem.</Typography>

              <Typography component='p' sx={{ pb: 2 }}>
                A pontuação será por menos tempo e filtros
                aplicados.</Typography>
            </Typography>
            <Button
              sx={modalButtonStyle}
              onClick={() => {
                this.props.toggleClickAudio();
                this.setState({ modalWelcomeState: false });
              }}
            >
              Boa sorte!!!
            </Button>
          </Box>
        </Fade>
      </Modal>
      <Draggable
        handle="#modal-sombra"
        open={this.state.modalSombraState}
        onClose={() => this.setState({ modalSombraState: false })}
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
          onClose={() => this.setState({ modalSombraState: false })}
        >
          <Fade in={this.state.modalSombraState}>
            <Box sx={{
              ...modalStyle,
              overflow: "hidden",
              cursor: "grab"
            }}>
              <CloseIcon
                sx={{
                  ml: "95%",
                  cursor: "pointer"
                }}
                onClick={() => {
                  this.props.toggleClickAudio();
                  this.setState({ modalSombraState: false });
                }}
              />
              <Typography
                id="modal-sombra-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Quem é esse pokemon?
              </Typography>
              <span style={{ display: "flex", justifyContent: "center" }}><img
                width={"100%"}
                src={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.spriteDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                srcSet={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.spriteDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                alt={
                  this.oPokemonSecretoEstaNaLista()
                    ?
                    this.nomeDoPokemonSecreto()
                    :
                    imgErrorMsg
                }
                style={{
                  borderRadius: "0.5vmin",
                  filter: filter,
                  zIndex: "-500"
                }}
              ></img></span>
              <Button
                sx={modalButtonStyle}
                onClick={() => {
                  this.props.toggleClickAudio();
                  this.setState({ modalSombraState: false });
                }}
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
        onClick={() => {
          this.props.toggleClickAudio();
          this.setState({ modalSombraState: true });
        }}
      >
        <NavigationIcon sx={{ mr: 1 }} />
        VER SOMBRA
      </Fab>
    </>);
  }
}
