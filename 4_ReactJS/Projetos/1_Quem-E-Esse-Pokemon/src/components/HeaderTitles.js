import { Container } from '@mui/material';

export default function HeaderTitles({ headerTitlesHeight }) {

  return (
    <Container sx={{
      width: "100%",
      height: `${headerTitlesHeight}`,
      p: 0,
      m: 0,
      display: "flex",
      backgroundColor: "#30A7D7",
      borderBottom: "1px solid black",
      fontSize: "2.65vh",
      verticalAlign: "middle",
      color: "rgba(0, 0, 0, .6)",
      fontFamily: "'Roboto','Helvetica','Arial',sans-serif",
    }}
      maxWidth={false}
      disableGutters={true}
    > {/* below minWidth related to mr of SELECTED Grid */}
      <div style={{
        minWidth: "35vw",
        textAlign: "center",
        fontWeight: "bold",
        alignSelf: "center",
      }}>
        Selecionadas
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
        minWidth: "calc(100% - 35vw - 2px)",
        margin: 0,
        textAlign: "center",
        fontWeight: "bold",
        alignSelf: "center",
      }}>
        Selecionar Características
      </div>
    </Container>
  );
}
