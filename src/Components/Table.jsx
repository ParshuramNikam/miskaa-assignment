import React from 'react'
import { useState, useEffect } from 'react'
import Thead from './Thead';

const Table = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState('');

    const setButton = () => {
        setLoading('Loading...');
        setTimeout(() => {
            setLoading('Refresh');
        }, 500);
    }
    const getAllData = () => {
        setData([]);
        fetch('https://restcountries.eu/rest/v2/region/asia')
            .then((res) => res.json())
            .then((countryData) => setData(countryData))
            .catch((err) => console.log(err.message));
        setButton();
    }

    useEffect(() => {
        getAllData();
    }, []);

    return (
        <>
            <div className="center">
                <button onClick={(e) => getAllData()}> {loading} </button>
            </div>
            <div className="info">
                <table className="sticky" cellSpacing="0" cellPadding="10">
                    {data.length ? <Thead /> : ""}
                    <tbody>
                        {
                            data.map((country, index) => {
                                return (
                                    <tr key={country.name}>
                                        <td>{++index}</td>
                                        <td>{country.name}</td>
                                        <td>{country.capital}</td>
                                        <td><img src={country.flag} alt="falg" width="35" /></td>
                                        <td>{country.subregion}</td>
                                        <td>{country.population}</td>
                                        <td>
                                            <ol> { country.borders.map((border) => {
                                                    return ( <li key={border}>{border}</li> )
                                            })} </ol>
                                        </td>
                                        <td>
                                            <ol> { country.languages.map((language) => {
                                                    return ( <li key={language.name}>{language.name} ({language.nativeName})</li> )
                                            }) }</ol>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
