import React, { useState, useEffect } from 'react';
import Datatable from "../Datatable/Datatable";
import SelectSearch from 'react-select-search';
require("es6-promise").polyfill();
require("isomorphic-fetch");

const Home = () => {
    const [data, setData] = useState([])
    const [option, setOption] = useState([])
    const [q, setQ] = useState("")

    useEffect(() => {
        fetch("http://localhost:5000/stock")
            .then((response) => { console.log(response); return response.json(); })
            .then((data) => {
                setData(data);
                console.log(data);
                setOption(data.map(({ name, symbol }) => ({ name: name, value: symbol })));
            });
    }, [])

    function search(rows) {
        return rows.filter(
            (row) =>
                row.symbol.toLowerCase().indexOf(q.toLowerCase()) > -1 ||
                row.name.toLowerCase().indexOf(q.toLowerCase()) > -1
        );
    }

    return (
        <div>
            <div>
                <input placeholder="Search for... " type="text" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <div>
                <Datatable data={search(data)} />
                {//<SelectSearch options={option} value="sv" name="language" placeholder="Add stock to Dashboard" />
                }

            </div>
        </div>
    );
};

export default Home;
