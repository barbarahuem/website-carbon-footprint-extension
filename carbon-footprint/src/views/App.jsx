import { useEffect, useRef } from 'react';
import './App.css';

const App = () => {

    useEffect(() => {
    //fetch data from "https://api.thegreenwebfoundation.org/api/v3/greencheck/climateaction.tech"
    const fetchData = async () => {
        const response = await fetch("https://api.thegreenwebfoundation.org/api/v3/greencheck/www.netflix.com");
        const data = await response.json();
        console.log(data);

    }
    fetchData();
    }, []);  

    const inputRef = useRef();
    const url = "https://www.freecodecamp.org";
    // get the hostname from the url
    const hostname = new URL(url).hostname;
    console.log(hostname);
    return (
        <div>
            <h1>App </h1>
            <label htmlFor="bar">Insert Url</label><br/>
            <input type="text" ref={inputRef} onChange={console.log("onChange")} id="bar" placeholder="Enter Url" />
        </div>
    );
}

export default App;