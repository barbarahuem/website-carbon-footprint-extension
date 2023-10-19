import React, { useState } from "react";
import Emissions from "./components/Emissions";
import HostingInsight from "./components/HostingInsights";
import PageSpeedInsights from "./components/PageSpeedInsights";
import "./App.css"


function App() {
  const [isGreenHost, setIsGreenHost] = useState(true);
  const [bytesSent, setBytesSent] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(0); // [kgCO2e
  const [isFetching, setIsFetching] = useState(true);

  const url = "https://www.netflix.com";

  return (
    <div className="App">
      <Emissions isGreenHost={isGreenHost} carbonFootprint={carbonFootprint} />
      <HostingInsight url={url} isGreenHost={isGreenHost} setIsGreenHost={setIsGreenHost}/>
      <p>{bytesSent}</p>
      <PageSpeedInsights 
        url={url} 
        setBytesSent={setBytesSent} 
        setIsFetching={setIsFetching} 
        setCarbonFootprint={setCarbonFootprint}
        />
    </div>
  );
}

export default App;
