import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Cards, ChartComponent, CountryPicker, NavBar, SignUp, LogIn, Profile, Article, Write, SingleArticle } from './components';
import styles from './App.module.css';
import { Grid } from '@material-ui/core';
import { Routes, Route } from 'react-router-dom';
import { fetchData } from './api';
import { getUser } from './api/user';

function App() {
  const [user, setUser] = useState()
  const [data, setData] = useState({});
  const [country, setCountry] = useState('global');
  const [cookies, setCookie, removeCookie] = useCookies(['access-token']);

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

  useEffect(() => {
    (async () => {
      setUser(await (await getUser()).data);
    })();
    console.log(cookies["access-token"]);
  }, [cookies])

  const home = (
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
  );

  return (
    <>
      <NavBar user={user}></NavBar>
      <Routes>
        <Route path="/" element={home} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/article" element={<Article />} />
        <Route path="/article/:id" element={<SingleArticle />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </>
  );
}

export default App;
