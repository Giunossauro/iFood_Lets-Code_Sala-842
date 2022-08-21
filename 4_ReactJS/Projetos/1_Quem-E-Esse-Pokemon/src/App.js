import { Component } from "react";

import Container from "@mui/material/Container";

import "./App.css";

import filtersList from "./filters.json";
import pokemonsList from "./pokemons.json";

import HeaderTitles from "./components/HeaderTitles";
import SelectedContent from "./components/SelectedContent";
import Selectable from "./components/Selectable";
import PokemonsCards from "./components/PokemonsCards";
import Modals from "./components/Modals";
import { flushSync } from "react-dom";

const secretPokemonIndex = Math.floor((Math.random() * (pokemonsList.length - 1)));
const secretPokemon = Object.entries(pokemonsList[secretPokemonIndex]);
const secretPokemonId = pokemonsList[secretPokemonIndex].id;

let isOnList = false;
let isOnListHolder = false;

const headerTitlesHeight = "5vh";
const headerContentHeight = "17.5vh";
const headerHeight = "calc(".concat(headerTitlesHeight, " + ", headerContentHeight, ")");
const mainHeightCalc = "calc(100% - ".concat(headerHeight, ')');

console.log("secretPokemon - ", secretPokemon[1][1], secretPokemon);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pokemons: pokemonsList,
      filtrados: [],
      pokemonEscolhido: pokemonsList.map((p) => p)[0].id,
      modalConfirmState: false,
      endOfGame: false,
      isOnList: false
    };
  }

  shouldComponentUpdate(_nextProps, nextState) {
    /* console.log(
      "--this.state",
      this.state,
      "\n\nnextState",
      nextState
    ) */
    return true;
  }

  /* 
    componentDidMount() {
  
    }

    componentDidUpdate(_, prevState) {
      if (this.state != prevState){
        // do stuff
      }
    }

    componentWillUnmount() {
  
    }
   */
  propsHandler(args) {
    if (args.filtrados) {
      this.setState({
        ...this.state,
        filtrados: [{
          selecionado: args.filtrados[0].selecionado,
          isOnList: args.filtrados[0].isOnList
        }, ...this.state.filtrados]
      });

    } else if (args.pokemonEscolhido || Object.hasOwn(args, "modalConfirmState")) {
      this.setState({
        ...this.state,
        ...args
      });

    } else {
      this.setState({
        ...this.state,
        args
      });
    }
  }

  handleSelectChange(filtersState, selecionado) {
    secretPokemon.forEach((attr) => attr.forEach((value) => {
      if (typeof value !== "object") {
        if (value === selecionado) {
          isOnList = true;
          this.setState({ isOnList: isOnList });
          isOnListHolder = true;
          return;
        }
      } else if (value.includes(selecionado)) {
        isOnList = true;
        this.setState({ isOnList: isOnList });
        isOnListHolder = true;
      }
    }));

    this.setState({ isOnList: isOnList });

    const pokemonsAsArray = this.state.pokemons.map(
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

    this.setState({
      ...this.state,
      pokemons: this.state.pokemons.filter((_, pokemonIndex) => {
        for (const value of filteredPokemonIndex) {
          if (value === pokemonIndex) {
            return isOnList;
          }
        }
        return !isOnList;
      })
    });

    return filtersState.map((actualFilterList) => {
      const filterListAsArray = Object.entries(actualFilterList);

      return Object.fromEntries([[
        filterListAsArray[0][0],
        filterListAsArray[0][1].filter((e) => e !== selecionado)
      ]]);
    })
  }

  render() {
    if (isOnListHolder) {
      isOnListHolder = false;
    } else {
      isOnList = false;
    }

    return (<>
      <HeaderTitles headerTitlesHeight={headerTitlesHeight} />
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
        <SelectedContent filtrados={this.state.filtrados} />
        <Selectable
          filtersList={filtersList}
          propsHandler={this.propsHandler.bind(this)}
          handleSelectChange={this.handleSelectChange.bind(this)}
          /* filtrados={this.state.filtrados} */
          isOnList={isOnList}
        />
      </Container>

      {/* MAIN */}
      <PokemonsCards
        headerHeight={headerHeight}
        mainHeightCalc={mainHeightCalc}
        pokemons={this.state.pokemons}
        propsHandler={this.propsHandler.bind(this)}
        /* isOnList={isOnList} */
      />

      {/* FOOTER */}
      <Modals
        secretPokemonId={secretPokemonId}
        endOfGame={this.state.endOfGame}
        modalConfirmState={this.state.modalConfirmState}
        pokemons={this.state.pokemons}
        pokemonEscolhido={this.state.pokemonEscolhido}
        propsHandler={this.propsHandler.bind(this)}
      />
    </>);
  }
}
