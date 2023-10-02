import React, { useState } from "react";
import Emissions from "./components/Emissions";
import HostingInsight from "./components/HostingInsights";
import PageSpeedInsights from "./components/PageSpeedInsights";
import "./App.css"


function App() {

  const [isGreenHost, setIsGreenHost] = useState(false);
  const [bytesSent, setBytesSent] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const url = "https://www.netflix.com";

  return (
    <div className="App">
        <PageSpeedInsights url={url} setBytesSent={setBytesSent} setIsFetching={setIsFetching}/>
        <HostingInsight url={url} isGreenHost={isGreenHost} setIsGreenHost={setIsGreenHost}/>
        <Emissions isGreenHost={isGreenHost} bytesSent={bytesSent} />
      
    </div>
  );
}

export default App;
