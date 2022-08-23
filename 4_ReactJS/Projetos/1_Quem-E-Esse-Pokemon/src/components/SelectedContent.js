import { Component } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material';

import CancelIcon from "@mui/icons-material/Cancel";

const Item = styled(Paper)(() => ({
  margin: "0",
  textAlign: 'center',
}));

export default class SelectedContent extends Component {

  shouldComponentUpdate(nextProps, _nextState) {
    return this.props.filtrados.length !== nextProps.filtrados.length/*  || true */;
  }

  render() {
    return (
      <Grid container spacing={1} sx={{
        width: "35vw",
        minWidth: "35vw",
        pr: 1,
        py: 1,
        mt: 0,
        mr: 0,
        overflow: "auto",
        alignItems: "center",
        justifyContent: "space-around",
      }}>
        {this.props.filtrados.map((filtrado, index) => {
          const color = filtrado.isOnList ? "#4DAD5B" : "#D66C60";

          return (
            <Grid
              item xs={12} sm={4} md={3} lg={3} xl={3}
              sx={{
                backgroundColor: color,
                my: "3px",
                ml: "8px",
                padding: "10px",
                borderRadius: "5px",
                minWidth: "fit-content",
              }}
              key={index}
            >
              <Item>
                {filtrado.selecionado}
                <CancelIcon
                  fontSize={"small"}
                  sx={{
                    padding: "0px 1px 0 5px",
                    margin: "0px -4px -5px -6px",
                    cursor: "pointer"
                  }}
                  onClick={async ()=>{
                    this.props.toggleClickAudio();
                    await this.props.propsHandler({
                      filtrados: [filtrado]
                    }, false);

                    this.props.propsHandler({
                      selectedFiltersCounter: this.props.selectedFiltersCounter - 1
                    })

                    const indexOfPutOut = this.props.filters.findIndex((e2) =>
                      Object.getOwnPropertyNames(e2)[0]
                      ===
                      filtrado.filterListName.filterListName
                    );
            
                    let x = this.props.filters.map((filterList, indexOfFilterList) => {
                      if (indexOfPutOut === indexOfFilterList) {
                        return {
                          [filtrado.filterListName]: [
                            ...Object.entries(filterList)[0][1],
                            filtrado.selecionado
                          ]
                        };
                      }
                      return filterList;
                    });

                    this.props.handleSelectChange(
                      x, filtrado.selecionado, false
                    )
                  }}
                />
              </Item>
            </Grid>
          )
        })}
      </Grid>
    );
  }
}
