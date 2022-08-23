import { PureComponent } from "react";

import Container from "@mui/material/Container";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Zoom from "@mui/material/Zoom";

import RestartAlt from "@mui/icons-material/RestartAlt";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';

export default class HeaderTitles extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { modalRestartState: false };
    this.fontSize = window.innerWidth > 600 && window.innerHeight > 600 ? "large" : "medium";
  }

  render() {
    return (
      <Container sx={{
        width: "100%",
        height: `calc(${this.props.headerTitlesHeight} + 4px)`,
        p: 0,
        m: 0,
        display: "flex",
        backgroundColor: "#30A7D7",
        borderBottom: "1px solid black",
        fontSize: "2.65vmax",
        verticalAlign: "middle",
        color: "rgba(0, 0, 0, .6)",
        fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
      }}
        maxWidth={false}
        disableGutters={true}
      >
        <div style={{
          minWidth: "35vw",
          textAlign: "center",
          fontWeight: "bold",
          alignSelf: "center",
        }}>
          Selecionados
        </div>
        <div style={{
          width: 0,
          minWidth: 0,
          maxWidth: 0,
          margin: 0,
          padding: 0,
          borderRigth: "2px solid black",
          borderLeft: "2px solid black",
        }} />
        <div style={{
          minWidth: "calc(100% - 50vw - 2px)",
          margin: 0,
          textAlign: "center",
          fontWeight: "bold",
          alignSelf: "center",
        }}>
          Selecione Filtros
        </div>
        <div style={{
          width: 0,
          minWidth: 0,
          maxWidth: 0,
          margin: 0,
          padding: 0,
          borderRigth: "1px solid black",
          borderLeft: "1px solid black",
        }} />
        <div
          style={{
            minWidth: "calc(100% - 92.5vw - 2px)",
            margin: 0,
            textAlign: "center",
            fontWeight: "bold",
            alignSelf: "center",
            borderRigth: "2px solid black",
            display: "flex",
            justifyContent: "center",
            paddingBottom: ".2vh",
            cursor: "pointer"
          }}
          onClick={() => {
            this.props.toggleClickAudio();
            this.props.toggleBackgroundAudio();
          }}
        >
          {this.props.isBackgroundAudioPlaying ?
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 800 }}
              followCursor={true}
              placement="bottom-start"
              title={"Stop"}
            ><StopIcon
              fontSize={this.fontSize}
            /></Tooltip> : <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 800 }}
              followCursor={true}
              placement="bottom-start"
              title={"Let's play Pokemon!"}
            ><PlayArrowIcon
              fontSize={this.fontSize}
            /></Tooltip>
          }
        </div>
        <div style={{
          width: 0,
          minWidth: 0,
          maxWidth: 0,
          margin: 0,
          padding: 0,
          borderRigth: "1px solid black",
          borderLeft: "1px solid black",
        }} />
        <div
          style={{
            minWidth: "calc(100% - 92.5vw - 2px)",
            margin: 0,
            textAlign: "center",
            fontWeight: "bold",
            alignSelf: "center",
            borderRigth: "2px solid black",
            display: "flex",
            justifyContent: "center",
            paddingBottom: ".2vh",
            cursor: "pointer"
          }}
          onClick={() => {
            this.props.toggleClickAudio();
            this.setState({ modalRestartState: true });
          }}
        >
        <Tooltip
          TransitionComponent={Zoom}
          TransitionProps={{ timeout: 800 }}
          followCursor={true}
          placement="top-start"
          title={"Restart"}
        ><RestartAlt
            fontSize={this.fontSize}
          /></Tooltip>
        </div>
        <Modal
          keepMounted
          id="modal-restart"
          hideBackdrop={false}
          open={this.state.modalRestartState}
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
          aria-labelledby="modal-restart-title"
          aria-describedby={"modal-restart-description"}
          onClose={() => this.setState({ modalRestartState: false })}
        >
          <Fade in={this.state.modalRestartState}>
            <Box sx={{
              transform: "translate(-50%, -50%)",
              color: "rgb(255, 255, 255)",
              bgcolor: "rgb(18, 18, 18)",
              border: "2px solid #000",
              position: "absolute",
              width: "60vmin",
              boxShadow: 24,
              top: "50%",
              left: "50%",
              p: 4
            }}>
              <Typography
                id="modal-restart-title"
                variant="h6"
                component="h2"
                sx={{ textAlign: "center" }}
              >
                Tem Certeza?
              </Typography>
              <Typography
                sx={{ mt: 2, textAlign: "center" }}
                id="modal-restart-description"
              >
                Deseja reiniciar o jogo?
              </Typography>
              <Button
                sx={{ mt: 2, width: "100%", border: "1px solid gray" }}
                onClick={() => {
                  this.props.toggleClickAudio();
                  window.location.reload(false);
                  this.setState({ modalRestartState: false });
                }}
              >
                Sim, reiniciar.
              </Button>
              <Button
                sx={{ mt: 2, width: "100%", border: "1px solid gray" }}
                onClick={() => {
                  this.props.toggleClickAudio();
                  this.setState({ modalRestartState: false });
                }}
              >
                Não, quero voltar.
              </Button>
            </Box>
          </Fade>
        </Modal>
      </Container>
    );
  }
}
