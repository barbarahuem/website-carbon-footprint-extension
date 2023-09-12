import React, { useRef, useEffect, useState } from 'react';
import PageSpeedInsights from './PageSpeedInsights';

const App = () => {

    useEffect(() => {
    //fetch data from "https://api.thegreenwebfoundation.org/api/v3/greencheck/climateaction.tech"

    }, []);  

    const [url, setUrl] = useState("https://api.thegreenwebfoundation.org");

    const checkUrl = (url) => {

        const hostname = new URL(url).hostname;
        const fetchData = async () => {
            const response = await fetch("https://api.thegreenwebfoundation.org/api/v3/greencheck/" + hostname);
            const data = await response.json();
            console.log(data, url);
            showInsights(url, data.green);
        }
        fetchData();
        
    }

    const showInsights = (url, isGreenHost) => {
        return (
            <div>
                
                <PageSpeedInsights url={url}/> 
                {isGreenHost ?
                    <p>Host is Green</p> 
                    :
                    <p>Host is NOT Green</p>
                }
            </div>
        )
        
    }


    return (<>
        <div>
            <h1>App</h1>
            <label htmlFor="bar">Insert Url</label><br/>
            <input type="text" onChange={(e) => setUrl(e.target.value)}/>
            <button onClick={checkUrl(url)}>Check</button>
        </div>
        {showInsights()}
        </>
    );
}

export default App;