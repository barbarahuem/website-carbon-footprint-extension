import React, { useEffect, useState } from "react";
import Emissions from "./components/Emissions";
import HostingInsight from "./components/HostingInsights";
import PageSpeedInsights from "./components/PageSpeedInsights";
import EmissionComparison from "./components/EmissionComparison";
import "./App.css"

import { Rings } from "react-loader-spinner";

function App() {
  const [isGreenHost, setIsGreenHost] = useState(true);
  const [bytesSent, setBytesSent] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(0); // [kgCO2e
  const [isFetching, setIsFetching] = useState(true);
  const [url, setUrl] = useState('')

  useEffect(() => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let url = tabs[0].url as string;
      setUrl(url);
    });
    if(bytesSent !== '') {
      setIsFetching(false);
    }
  } ,[bytesSent]);


  return (
    <div className="App">
    {isFetching && 
      <div style={{paddingTop: "50px"}}>
        <Rings color="white"/>
        <p>Loading...</p>
      </div>
       }
      <div className={isFetching ? "carbon-insights-invisible" : "carbon-insights-visible"}>
        <Emissions isGreenHost={isGreenHost} carbonFootprint={carbonFootprint} />
          { url &&
            <>
            <EmissionComparison />
            <HostingInsight url={url} isGreenHost={isGreenHost} setIsGreenHost={setIsGreenHost}/>
            <p>{bytesSent}</p>
            <PageSpeedInsights 
              url={url} 
              setBytesSent={setBytesSent}
              setCarbonFootprint={setCarbonFootprint}
              />
          </>
        }
      </div>
    </div>
  );
}

export default App;
