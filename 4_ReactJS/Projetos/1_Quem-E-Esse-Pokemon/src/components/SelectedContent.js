import { Grid } from '@mui/material';
import Item from "./Item";

export default function SelectedContent({ filtrados }) {
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
      {filtrados.map((item, index) => {
        const color = item.isOnList ? "#4DAD5B" : "#D62F50";
        
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
            <Item>{item.selecionado}</Item>
          </Grid>
        )
      })}
    </Grid>
  );
}
