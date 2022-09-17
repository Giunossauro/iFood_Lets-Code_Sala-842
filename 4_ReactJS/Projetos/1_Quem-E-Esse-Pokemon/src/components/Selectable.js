import { Component } from "react";
import { flushSync } from "react-dom";

import { isMobile } from 'react-device-detect';

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default class Selectable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectState: this.props.filters.map(() => false),
      close: false,
      changing: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {

    return (
      this.state.selectState.some(
        (state, index) => state !== nextState.selectState[index]
      )
      || true
      /* this.props.filters.some((filters, filtersIndex) =>
        Object.entries(filters)[0][1].length
        !==
        Object.entries(nextProps.filters[filtersIndex])[0][1].length
      ) */
    );
  }

  render() {

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
        {this.props.filters.map((filterList, filtersIdx) => (
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
            onClick={() => this.props.toggleClickAudio()}
          >
            <InputLabel
              id={Object.getOwnPropertyNames(filterList)}
              sx={{
                minWidth: "calc(inherit - 14px)",
                maxWidth: "calc(100% - 6px)",
                fontSize: "1.7vmax",
                textAlign: "center",
                fontWeight: "bold",
                top: isMobile ? "4px" : "calc(5% - 1.25rem + 1.5vh)",
                left: isMobile ? "-3px" : "-.25vw",
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
              native={isMobile}
              value={''}
              IconComponent={() => null}
              labelId={`${Object.getOwnPropertyNames(filterList)}`}
              label={Object.getOwnPropertyNames(filterList)}
              sx={{
                pr: 0,
                pl: 0,
                fontSize: ".75em"
              }}

              open={this.state.selectState[filtersIdx] && !this.state.close}

              onClick={() => {
                if (!this.state.close) {
                  flushSync(() => this.setState({
                    selectState: this.props.filters.map((_, idx) => filtersIdx === idx)
                  }));
                } else {
                  flushSync(() => this.setState({
                    selectState: this.props.filters.map(() => false),
                    close: false
                  }));
                }
              }}

              onClose={() => {
                if (!this.state.changing) {
                  flushSync(() => this.setState({
                    selectState: this.props.filters.map(() => false),
                    close: true
                  }));
                } else {
                  flushSync(() => this.setState({
                    changing: false
                  }));
                }
              }}

              onChange={async (e) => {
                this.props.toggleClickAudio();
                if (this.props.selectedFiltersCounter < 12) {

                  flushSync(() => this.setState({
                    changing: true
                  }));

                  await flushSync(() => this.props.propsHandler({
                    selectedFiltersCounter: this.props.selectedFiltersCounter + 1
                  }));

                  await this.props.propsHandler({
                    filters: this.props.handleSelectChange(
                      this.props.filters, e.target.value, true
                    )
                  });

                  this.props.propsHandler({
                    filtrados: [{
                      selecionado: e.target.value,
                      isOnList: this.props.isOnList,
                      filterListName: Object.getOwnPropertyNames(filterList)[0]
                    }],
                  }, true);

                  if (this.props.selectedFiltersCounter === 11) {
                    alert("Você só pode escolher mais 1 filtro!");
                  } else if (this.props.selectedFiltersCounter === 12) {
                    alert("Você não pode escolher mais nenhum filtro.");
                  }
                } else {
                  alert("Você já escolheu todos os 12 filtros...");
                }
              }}
            >
              {Object.entries(filterList)[0][1].map((filterOption, filterOptionIndex) => (
                isMobile ? (
                  <option value={filterOption} key={filterOptionIndex}>
                    {filterOption}
                  </option>
                ) : (
                  <MenuItem value={filterOption} key={filterOptionIndex}>
                    {filterOption}
                  </MenuItem>
                )
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