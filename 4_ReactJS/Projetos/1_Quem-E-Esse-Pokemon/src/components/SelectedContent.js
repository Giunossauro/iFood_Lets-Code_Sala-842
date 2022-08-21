import { Grid, Paper, styled } from '@mui/material';
import { Component } from 'react';

const Item = styled(Paper)(() => ({
  margin: "0",
  textAlign: 'center',
}));

export default class SelectedContent extends Component {

  shouldComponentUpdate(nextProps, _nextState) {
    return this.props.filtrados.length !== nextProps.filtrados.length;
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
          const color = filtrado.isOnList ? "#4DAD5B" : "#D62F50";

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
              <Item>{filtrado.selecionado}</Item>
            </Grid>
          )
        })}
      </Grid>
    );
  }
}
