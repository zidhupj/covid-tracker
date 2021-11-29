import { useEffect, useState } from 'react';

import { Cards, ChartComponent, CountryPicker, NavBar } from './components';
import styles from './App.module.css';
import { Grid, Item } from '@material-ui/core';

import { fetchData } from './api';

function App() {

  const [data, setData] = useState({});
  const [country, setCountry] = useState('global');

  useEffect(() => {
    (async () => {
      const fetchedData = await fetchData();

      setData(fetchedData);

    })()
  }, [])
  
  useEffect(() => {
    console.log(country);
    (async () => {
      const fetchedData = await fetchData(country);
      setData(fetchedData);
    })()
  }, [country]);

  return (
    <>
      <NavBar></NavBar>
      <div className={styles.container}>
        <CountryPicker setCountry={setCountry}></CountryPicker>
        <Grid container spacing={10}>
          <Grid item lg={4}>
            <Cards data={data}></Cards>
          </Grid>
          <Grid item lg={8}>
            <ChartComponent data={data} country={country}></ChartComponent>
          </Grid>  
        </Grid>
      </div>
    </> 
  );
}

export default App;
