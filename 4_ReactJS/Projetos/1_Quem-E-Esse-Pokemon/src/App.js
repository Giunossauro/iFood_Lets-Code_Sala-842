import { Component, lazy, Suspense } from "react";
import { flushSync } from "react-dom";

import Container from "@mui/material/Container";

import "./App.css";

import pokemonsList from "./pokemons.json";
import filtersList from "./filters.json";

import HeaderTitles from "./components/HeaderTitles";
import SelectedContent from "./components/SelectedContent";
import Selectable from "./components/Selectable";
import Modals from "./components/Modals";

const PokemonsCards = lazy(() => import("./components/PokemonsCards"));

const secretPokemonIndex = Math.floor((Math.random() * (pokemonsList.length - 1)));
const secretPokemon = Object.entries(pokemonsList[secretPokemonIndex]);
const secretPokemonId = pokemonsList[secretPokemonIndex].id;

const headerTitlesHeight = "5vh";
const headerContentHeight = "17.5vh";
const headerHeight = "calc(".concat(headerTitlesHeight, " + ", headerContentHeight, ")");
const mainHeightCalc = "calc(100% - ".concat(headerHeight, ')');

console.log("secretPokemon - ", secretPokemon[1][1], secretPokemon);

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      renderedPokemons: pokemonsList,
      removedPokemons: [],
      filtrados: [],
      filters: filtersList,
      pokemonEscolhido: pokemonsList.map((p) => p)[0].id,
      modalConfirmState: false,
      endOfGame: false,
      isOnList: false,
      selectedFiltersCounter: 0,
      selectedFiltersPointsModifier: 1,
      startTime: 0,
      isBackgroundAudioPlaying: false
    };

    this.backgroundAudio = new Audio("./audio/OST.mp3");
    this.clickAudio = new Audio("./audio/click.mp3");
  }

  componentDidMount() {
    this.backgroundAudio.addEventListener(
      "ended", () => this.setState({ isBackgroundAudioPlaying: false })
    );
  }

  componentWillUnmount() {
    this.backgroundAudio.removeEventListener(
      "ended", () => this.setState({ isBackgroundAudioPlaying: false })
    );
  }

  toggleBackgroundAudio = () => {
    flushSync(() => this.setState(
      { isBackgroundAudioPlaying: !this.state.isBackgroundAudioPlaying },
      () => {
        this.state.isBackgroundAudioPlaying ?
          this.backgroundAudio.play()
        : this.backgroundAudio.pause();
      }
    ));
  }

  toggleClickAudio = () => {
    this.clickAudio.play();
  }

  sorter(onePokemon, anotherPokemon) {
    if (onePokemon.id > anotherPokemon.id) {
      return 1;
    }
    if (onePokemon.id < anotherPokemon.id) {
      return -1;
    }
    return 0;
  }

  propsHandler(args, putIn) {
    if (args.filtrados) {
      if (putIn) {
        this.setState({
          ...this.state,
          filtrados: [{
            selecionado: args.filtrados[0].selecionado,
            isOnList: args.filtrados[0].isOnList,
            filterListName: args.filtrados[0].filterListName
          }, ...this.state.filtrados]
        });

      } else {
        flushSync(() => this.setState({
          ...this.state,
          filtrados: this.state.filtrados.filter(
            (filter) => filter.selecionado !== args.filtrados[0].selecionado
          )
        }));

        const indexOfPutOut = this.state.filters.findIndex((e2) => {
          return Object.getOwnPropertyNames(e2)[0] === args.filtrados[0].filterListName
        });

        this.setState({
          ...this.state,
          filters: this.state.filters.map((filterList, indexOfFilterList) => {
            if (indexOfPutOut === indexOfFilterList) {
              return {
                [Object.getOwnPropertyNames(filterList)[0]]: [
                  ...Object.entries(filterList)[0][1],
                  args.filtrados[0].selecionado
                ]
              };
            }
            return filterList;
          })
        });
      }

    } else {
      this.setState({
        ...this.state,
        ...args
      });
    }
  }

  handleSelectChange(filtersState, selecionado, isRemovingSelectedFilter) {
    secretPokemon.forEach((attr) => attr.forEach((value) => {
      if (typeof value !== "object") {
        if (value === selecionado) {
          flushSync(() => this.setState({ isOnList: true }));
          return;
        }
      } else if (value.includes(selecionado)) {
        flushSync(() => this.setState({ isOnList: true }));
      } else {
        flushSync(() => this.setState({ isOnList: false }));
      }
    }));

    const renderedPokemonsAsArray = this.state.renderedPokemons.map(
      pokemon => Object.entries(pokemon)
    );

    const removedPokemonsAsArray = this.state.removedPokemons.map(
      pokemon => Object.entries(pokemon)
    );

    let filteredPokemonIndex = [];
    if (isRemovingSelectedFilter) {
      renderedPokemonsAsArray.forEach((pokemon, pokemonIdx) => pokemon.forEach(
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
    } else {
      removedPokemonsAsArray.forEach((pokemon, pokemonIdx) => pokemon.forEach(
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
    }

    if (isRemovingSelectedFilter) {
      flushSync(() => this.setState({
        ...this.state,
        renderedPokemons: this.state.renderedPokemons.filter((_, pokemonIndex) => {
          for (const value of filteredPokemonIndex) {
            if (value === pokemonIndex) {
              return this.state.isOnList;
            }
          }
          return !this.state.isOnList;
        }).sort(this.sorter),
        removedPokemons: [...this.state.renderedPokemons.filter((_, pokemonIndex) => {
          for (const value of filteredPokemonIndex) {
            if (value === pokemonIndex) {
              return !this.state.isOnList;
            }
          }
          return this.state.isOnList;
        }), ...this.state.removedPokemons].sort(this.sorter),
        selectedFiltersPointsModifier: this.state.selectedFiltersPointsModifier + 0.1
      }));
    } else {
      flushSync(() => this.setState({
        ...this.state,
        renderedPokemons: [...this.state.removedPokemons.filter((_, pokemonIndex) => {
          for (const value of filteredPokemonIndex) {
            if (value === pokemonIndex) {
              return !this.state.isOnList;
            }
          }
          return this.state.isOnList;
        }), ...this.state.renderedPokemons].sort(this.sorter),
        removedPokemons: this.state.removedPokemons.filter((_, pokemonIndex) => {
          for (const value of filteredPokemonIndex) {
            if (value === pokemonIndex) {
              return this.state.isOnList;
            }
          }
          return !this.state.isOnList;
        }).sort(this.sorter)
      }));
    }
    console.log(this.state);

    return filtersState.map((actualFilterList) => {
      const filterListAsArray = Object.entries(actualFilterList);

      return Object.fromEntries([[
        filterListAsArray[0][0],
        filterListAsArray[0][1].filter((e) => e !== selecionado)
      ]]);
    })
  }

  render() {

    return (
      <Suspense fallback={<>
        <div id="loadingAnimation"></div>
        <div id="loadingBackground"></div>
      </>}>
        <HeaderTitles
          headerTitlesHeight={headerTitlesHeight}
          toggleBackgroundAudio={this.toggleBackgroundAudio}
          isBackgroundAudioPlaying={this.state.isBackgroundAudioPlaying}
        />
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
          <SelectedContent
            filters={this.state.filters}
            filtrados={this.state.filtrados}
            toggleClickAudio={this.toggleClickAudio}
            propsHandler={this.propsHandler.bind(this)}
            handleSelectChange={this.handleSelectChange.bind(this)}
            selectedFiltersCounter={this.state.selectedFiltersCounter}
          />
          <Selectable
            toggleClickAudio={this.toggleClickAudio}
            propsHandler={this.propsHandler.bind(this)}
            handleSelectChange={this.handleSelectChange.bind(this)}
            isOnList={this.state.isOnList}
            filters={this.state.filters}
            selectedFiltersCounter={this.state.selectedFiltersCounter}
          />
        </Container>

        {/* MAIN */}
        <PokemonsCards
          headerHeight={headerHeight}
          mainHeightCalc={mainHeightCalc}
          pokemons={this.state.renderedPokemons}
          toggleClickAudio={this.toggleClickAudio}
          propsHandler={this.propsHandler.bind(this)}
        />

        {/* FOOTER */}
        <Modals
          secretPokemonId={secretPokemonId}
          endOfGame={this.state.endOfGame}
          modalConfirmState={this.state.modalConfirmState}
          pokemons={this.state.renderedPokemons}
          pokemonEscolhido={this.state.pokemonEscolhido}
          toggleClickAudio={this.toggleClickAudio}
          propsHandler={this.propsHandler.bind(this)}
          selectedFiltersPointsModifier={this.state.selectedFiltersPointsModifier}
          startTime={this.state.startTime}
        />
      </Suspense>
    );
  }
}
