import React, {useEffect, useState} from "react";
import Search from "./Search";
import Cars from "./Cars";
import NewCarForm from "./NewCarForm";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
function CarLot() {
  const [cars, setCars] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filter, setFilter] = useState("")

  let visibleCars = cars.filter((car) => {
    if (!searchTerm && !filter){
      return true
    } else if (filter && searchTerm && car.car_make === filter && car.car_model.toLowerCase().includes(searchTerm.toLowerCase())) {
      return true
    } else if (filter && !searchTerm && car.car_make === filter) {
      return true
    } else if (searchTerm && !filter && car.car_model.toLowerCase().includes(searchTerm.toLowerCase())){
      return true
    } else {
      return false
    }
  })

  useEffect(() => {
    fetch('http://localhost:3001/cars')
    .then((response) => response.json())
    .then((cars) => {
      setCars(cars)
    })
  }, [])

  function handleNewCar(newCar) {
    setCars([...cars, newCar])
  }

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value)
  }
  function handleFilterTerm(e){
    setFilter(e.target.value)
  }

  function sellCar(soldCar){
    const updatedCarList = cars.filter((car) => car.id !== soldCar)
    setCars(updatedCarList)
  }

  function editCar(editedCar){
    const updatedCars = cars.map((car) => car.id === editedCar.id ? editedCar : car)
    setCars(updatedCars)
  }

  return (
    <Container>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Search onSearch={handleSearchTerm} onFilter={handleFilterTerm} searchTerm={searchTerm} filter={filter} /> {/**You can edit this line */}
        </Grid>
        <Grid item xs={6}>
          <NewCarForm onNewCar={handleNewCar}/> {/**You can edit this line */}
        </Grid>
        <Grid item xs={12}>
          {/** enter your code below */}
          <Cars cars={visibleCars} onSell={sellCar} onEdit={editCar}/>
          {/** enter your code above */}
        </Grid>
      </Grid>
    </Container>
  );
}

export default CarLot;
