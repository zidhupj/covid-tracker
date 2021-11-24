import { useState, useEffect } from 'react';
import { NativeSelect, FormControl } from '@material-ui/core';
import styles from './CountryPicker.module.css';
import {fetchCountries} from '../../api'

const CountryPicker = ({setCountry}) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() => {
        (async () => {
            setFetchedCountries(await fetchCountries());
        })();
        console.log(fetchedCountries);
    },[setFetchedCountries])

    return (
        <FormControl className={styles.formControl}>
            <NativeSelect defaultValue="global" onChange={(e)=>setCountry(e.target.value)}>
                <option value="global">Global</option>
                {fetchedCountries.map((country, i) => (
                    <option key={i} value={country}>{country}</option>
                ))}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;