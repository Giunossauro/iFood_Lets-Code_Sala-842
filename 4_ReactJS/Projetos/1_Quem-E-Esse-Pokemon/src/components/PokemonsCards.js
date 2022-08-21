import { Component } from "react";
import { flushSync } from "react-dom";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

export default class PokemonsCards extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endOfGame: false
    }
  }

  shouldComponentUpdate(nextProps, _nextState) {
    return this.props.pokemons.length !== nextProps.pokemons.length;
  }

  render() {
    return (
      <ImageList
        cols={
          window.innerWidth < 640 ? 3 : 5
        }
        sx={{
          maxWidth: "100%", minWidth: "100%", width: "100%",
          gridTemplateRows: "repeat(5, 1fr)",
          borderTop: "2px solid black",
          height: `${this.props.mainHeightCalc} `,
          top: `${this.props.headerHeight} `,
          m: 0, pt: 1, px: 0, pb: 0,
          backgroundColor: "#4DAD5B",
          position: "fixed",
          overflow: "auto",
        }}
      >
        {this.props.pokemons.map((pokemon, pokemonIndex) => (
          <ImageListItem
            key={pokemonIndex}
            sx={{
              width: "100%",
              height: "100%",
              cursor: "pointer"
            }}
            aria-label={`info about ${pokemon.Nome} `}
            onClick={() => {
              this.props.propsHandler({
                pokemonEscolhido: pokemon.id,
                modalConfirmState: true
              });
            }}
          >
            <img
              src={`${pokemon.sprite} `}
              srcSet={`${pokemon.sprite} `}
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
                  subtitle={`Id: ${pokemon.id} `}
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
    );
  }
}