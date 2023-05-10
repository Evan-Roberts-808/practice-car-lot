import React from "react";
import Grid from "@mui/material/Grid";
import Car from "./Car";
function Cars({cars, onSell, onEdit}) {

const carList = cars.map((car) => {
  return <Car key={car.id} car={car} onSell={onSell} onEdit={onEdit}/>
})

  return (
    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
      {carList}
    </Grid>
  );
}

export default Cars;
