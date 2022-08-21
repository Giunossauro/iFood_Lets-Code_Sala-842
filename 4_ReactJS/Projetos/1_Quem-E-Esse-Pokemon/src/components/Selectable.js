import { Component } from "react";
import { flushSync } from "react-dom";

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import filtersList from "../filters.json";

let activeElement = true;

export default class Selectable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: filtersList,
      selectState: filtersList.map(() => false),
      close: false,
      changing: false
    };
  }

  shouldComponentUpdate(_nextProps, nextState) {

    /* const a = this.state.selectState.some(
      (state, index) => state !== nextState.selectState[index]
    );

    const b = this.state.filters.some((filters, filtersIndex) =>
      Object.entries(filters)[0][1].length
      !==
      Object.entries(nextState.filters[filtersIndex])[0][1].length
    ); */

    return (
      this.state.selectState.some(
        (state, index) => state !== nextState.selectState[index]
      )
      ||
      this.state.filters.some((filters, filtersIndex) =>
        Object.entries(filters)[0][1].length
        !==
        Object.entries(nextState.filters[filtersIndex])[0][1].length
      )
    );
  }

  render() {
    if (document.activeElement.classList[0] === "MuiPaper-root") {
      activeElement = !activeElement;
    } else {
      activeElement = true;
    }

    return (
      <Grid container spacing={1}
        sx={{
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
        }}
      >
        {this.state.filters.map((filterList, filtersIdx) => (
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
                minWidth: "calc(inherit - 14px)",
                maxWidth: "calc(100% - 6px)",
                fontSize: "1.7vmax",
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

              open={
                this.state.selectState[filtersIdx] && !this.state.close/* activeElement */
              }

              onClick={() => {
                if (!this.state.close) {
                  flushSync(()=> this.setState({
                    selectState: filtersList.map((_, idx) => filtersIdx === idx)
                  }));
                } else {
                  flushSync(()=> this.setState({
                    selectState: filtersList.map(() => false),
                    close: false
                  }));
                }
              }}

              onClose={() => {
                if (!this.state.changing) {
                  flushSync(()=> this.setState({
                    selectState: filtersList.map(() => false),
                    close: true
                  }));
                } else {
                  flushSync(()=> this.setState({
                    changing: false
                  }));
                }
              }}

              onChange={async (e) => {
                await flushSync(()=> this.setState(() => ({
                  filters: this.props.handleSelectChange(
                    this.state.filters, e.target.value
                  ),
                  changing: true
                })));

                this.props.propsHandler({
                  filtrados: [{
                    selecionado: e.target.value,
                    isOnList: this.props.isOnList
                  }/* , ...this.props.filtrados */]
                });
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
    )
  }
}