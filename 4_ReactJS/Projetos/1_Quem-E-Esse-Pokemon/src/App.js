//add node ./src/getPkm.js && to package.json start script

import { useState } from 'react';
import {
  Container, Paper, Grid, Tooltip, Zoom, styled,
  Autocomplete, createFilterOptions, ImageList,
  ImageListItem, ImageListItemBar, IconButton, TextField
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import './App.css';
import pokemonsList from "./pokemons.json";
import filtersList from "./filters.json";
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const filterOptions = createFilterOptions({
  stringify: (option) => option,
});
const secretPokemonIndex = Math.floor((Math.random() * (pokemonsList.length - 1)));
const secretPokemon = Object.entries(pokemonsList[secretPokemonIndex]);
let isOnList = false;
let isOnListHandler = false;

export default function App() {

  const [headerTitlesHeight, setHeaderTitlesHeight] = useState("2.3rem");
  const [headerContentHeight, setHeaderContentHeight] = useState("9.2rem");
  const [headerHeight, setHeaderHeight] = useState(
    "calc(".concat(headerTitlesHeight, " + ", headerContentHeight, ")")
  );
  const [mainHeightCalc, setMainHeightCalc] = useState(
    "calc(100% - ".concat(headerHeight, ")")
  );

  const [pokemons, setPokemons] = useState(pokemonsList);
  const [filters, setFilters] = useState(filtersList);
  const [filtrados, setFiltrados] = useState([]);
  console.log("secretPokemon - ", secretPokemon, secretPokemon[0][1][0])

  /*
  console.log(
    "headerTitlesHeight: ".concat(
      headerTitlesHeight,
      "\nheaderContentHeight: ",
      headerContentHeight,
      "\nheaderHeight: ",
      headerHeight,
      "\nmainHeightCalc: ",
      mainHeightCalc
    )
  );
  */

  if (isOnListHandler) {
    isOnListHandler = false;
  } else {
    isOnList = false;
  }

  return (
    <>
      {/* HEADER */}
      {/* HEADER TITLES */}
      <Container sx={{
        width: "100%",
        height: `${headerTitlesHeight}`,
        p: 0,
        m: 0,
        display: "flex",
        backgroundColor: "#30A7D7",
        borderBottom: "1px solid black",
        fontSize: "1.5rem"
      }}
        maxWidth={false}
        disableGutters={true}
      > {/* below minWidth related to mr of SELECTED Grid */}
        <div style={{
          minWidth: "15rem",
          textAlign: "center",
        }}>
          Selecionadas
        </div>
        <div style={{
          minWidth: "calc(100% - 15rem - 2px)",
          margin: 0,
          borderLeft: "2px solid black",
          textAlign: "center",
        }}>
          Selecionar Características
        </div>
      </Container>
      {/* /HEADER TITLES */}

      {/* HEADER CONTENT */}
      <Container
        maxWidth={false}
        disableGutters={true}
        sx={{
          flexGrow: 1,
          display: "flex",
          position: "fixed",
          backgroundColor: "#30A7D7",
          width: "100%",
          height: `${headerContentHeight}`,
          maxHeight: `${headerContentHeight}`,
          pl: 1,
          pr: 0,
        }}
      >
        {/* SELECTED */}
        <Grid container spacing={1} sx={{
          width: "15rem",
          minWidth: "15rem",
          pr: 1,
          py: 1,
          mr: 0,
          mt: 0,
          overflow: "auto",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
          {filtrados.map((item, _i) => (
            <Grid
              item xs={12} sm={12} md={6} lg={6} xl={6}
              sx={item.isOnList ? {
                backgroundColor: "green"
              }
                : {
                  backgroundColor: "red"
                }}
            >
              <Item>{item.selecionado}</Item>
            </Grid>
          ))}
        </Grid>
        {/* /SELECTED */}

        {/* SELECTABLE */}
        <Grid container spacing={1} sx={{
          flexGrow: 1,
          display: "flex",
          overflow: "auto",
          justifyContent: "space-around",
          m: 0,
          pt: 1,
          pb: 1,
          width: "100%",
          borderLeft: "2px solid black",
          pr: 1,
        }}>
          {filters.map((item, i) => (
            <Grid item xs={3} key={i} id={Object.getOwnPropertyNames(item)[0]}>
              <Autocomplete
                disableCloseOnSelect
                autoComplete={false}
                onInputChange={(event) => {
                  const selecionado = event.target.firstChild.textContent;
                  secretPokemon.forEach((attr) => attr.forEach((value) => {
                    if (typeof value !== "object") {
                      if (value === selecionado) {
                        isOnList = true;
                        isOnListHandler = true;
                        console.log("isOnList Atualizado: ", isOnList);
                        return;
                      }
                    }
                    else {
                      if (value.includes(selecionado)) {
                        isOnList = true;
                        isOnListHandler = true;
                        console.log("isOnList Atualizado: ", isOnList);
                        return;
                      }
                    }
                  }));
                  setFiltrados([
                    {
                      selecionado: selecionado, isOnList: isOnList
                    },
                    ...filtrados
                  ]);
                  setPokemons(() => {
                    const asArray = pokemons.map(pokemon => Object.entries(pokemon));
                    let index = [];
                    asArray.map((p, ind) => p.map((e) => e.map((k) => {
                      if (k !== selecionado) {
                        if (typeof k === "object") {
                          if (k.includes(selecionado)) {
                            index.push(ind);
                          }
                        }
                      }
                      else {
                        index.push(ind);
                      }
                      return undefined;
                    })));
                    return pokemons.filter((_, inde) => {
                      for (const element of index) {
                        if (element === inde) { return isOnList; }
                      }
                      return !isOnList;
                    });
                  });
                  setFilters(
                    filters.map((item2) => {
                      const asArray = Object.entries(item2);
                      return Object.fromEntries([
                        [asArray[0][0],
                        asArray[0][1].filter((e) => e !== selecionado)]
                      ]);
                    })
                  );
                }}
                id="multiple-limit-tags"
                options={item[Object.keys(item)[0]]}
                getOptionLabel={(option) => option}
                filterOptions={filterOptions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputLabelProps={{ shrink: true }}
                    placeholder="Escolha"
                    label={Object.getOwnPropertyNames(item)}
                    sx={{
                      backgroundColor: "#919191",
                      borderRadius: ".25rem"
                    }}
                  />
                )}
                renderOption={(props, option, { inputValue }) => {
                  const matches = match(option, inputValue);
                  const parts = parse(option, matches);

                  return (
                    <li {...props}>
                      <div>
                        {parts.map((part, index) => (
                          <span
                            key={index}
                            style={{
                              fontWeight: part.highlight ? 700 : 400,
                              marginRight: 8
                            }}
                          >
                            {part.text}
                          </span>
                        ))}
                      </div>
                    </li>
                  );
                }}
              />
            </Grid>
          ))}
        </Grid>
        {/* /SELECTABLE */}
      </Container>
      {/* /HEADER CONTENT */}
      {/* /HEADER */}

      {/* MAIN */}
      <ImageList cols={5}
        sx={{
          position: "fixed",
          top: `${headerHeight}`,
          overflow: "auto",
          height: `${mainHeightCalc}`,
          borderTop: "2px solid black",
          width: "100%",
          maxWidth: "100%",
          minWidth: "100%",
          m: 0,
          pt: 1,
          px: 0,
          pb: 0,
          backgroundColor: "#4DAD5B",
        }}
      >
        {pokemons.map((item, i) => (
          <ImageListItem
            key={item.sprite}
            sx={{ height: "100%", width: "100%" }}
          >
            <img
              src={`${item.sprite}`}
              srcSet={`${item.sprite}`}
              alt={item.name}
              loading="lazy"
            />
            {/* alerta de gambiarra bem fedida no title rs */}
            <Tooltip
              TransitionComponent={Zoom}
              TransitionProps={{ timeout: 800 }}
              followCursor={true}
              placement="top-start"
              title={
                i < 898 ?
                  "".concat(i + 1, " - ", item.name)
                  :
                  "".concat(item.name)
              }
            >
              <div>
                <ImageListItemBar
                  title={
                    i < 898 ?
                      "".concat(i + 1, " - ", item.name)
                      :
                      "".concat(item.name)
                  }
                  alt={
                    i < 898 ?
                      "".concat(i + 1, " - ", item.name)
                      :
                      "".concat(item.name)
                  }
                  subtitle={
                    item.generation ?
                      `generation: ${item.generation}`
                      :
                      "temporary transformation"
                  }
                  sx={{ maxWidth: "90%", ml: "5%" }}
                  actionIcon={
                    <IconButton
                      sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                      aria-label={`info about ${item.name}`}
                    >
                      <InfoIcon />
                    </IconButton>
                  }
                />
              </div>
            </Tooltip>
          </ImageListItem>
        ))}
      </ImageList>
      {/* /MAIN */}

      {/* FOOTER */}
      <footer></footer>
      {/* /FOOTER */}
    </>
  );
}
