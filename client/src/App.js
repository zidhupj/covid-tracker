import { useEffect, useState } from 'react';

import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';

import {fetchData} from './api'

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
    if (country !== "global") {
      (async () => {
        const fetchedData = await fetchData(country);
        // console.log(fetchedData);
        setData(fetchedData);
      })()
    }
  }, [country]);

  return (
    <div className={styles.container}>
      <Cards data={data}></Cards>
      <CountryPicker setCountry={setCountry}></CountryPicker>
      <Chart data={data} country={country}></Chart>
    </div>
  );
}

export default App;
