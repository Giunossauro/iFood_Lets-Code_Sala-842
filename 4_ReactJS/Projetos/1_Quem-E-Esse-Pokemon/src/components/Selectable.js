import { useState } from "react";

import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Selectable({
  filtersList,
  handleSelectChange,
  selectState,
  setSelectState
}) {
  const [filters, setFilters] = useState(filtersList);

  return (
    <Grid container spacing={1} sx={{
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
    }}>
      {filters.map((filterList, filtersIdx) => (
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
            open={selectState[filtersIdx]}
            onClick={() =>
              setSelectState([...filtersList.map(
                (_, idx) => filtersIdx === idx
              )])
            }
            onClose={() =>
              setSelectState([...filtersList.map(
                () => false
              )])
            }
            onChange={(e) => handleSelectChange(filters, setFilters, e)}
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