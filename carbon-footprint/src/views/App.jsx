import React, { useRef, useEffect, useState } from 'react';
import PageSpeedInsights from './PageSpeedInsights';

const App = () => {

    useEffect(() => {
    //fetch data from "https://api.thegreenwebfoundation.org/api/v3/greencheck/climateaction.tech"
    const hostname = new URL("https://developers.google.com").hostname;
    const fetchData = async () => {
        const response = await fetch("https://api.thegreenwebfoundation.org/api/v3/greencheck/" + hostname);
        const data = await response.json();
        console.log(data);

    }
    fetchData();
    }, []);  

    const inputRef = useRef();
    const [hostname, setHostname] = useState("");

    const checkUrl = (currentUrl) => {
        return;
        /*
        if (currentUrl === "") {
            return;
        }
        const hostname = new URL(currentUrl).hostname;
        setHostname(hostname);
        */
    }


    return (<>
        <div>
            <h1>App</h1>
            <label htmlFor="bar">Insert Url</label><br/>
            <input type="text" ref={inputRef}/>
            <button onClick={checkUrl(inputRef.current)}>Check</button>
            <p>{hostname}</p>
        </div>
        <PageSpeedInsights />
        </>
    );
}

export default App;