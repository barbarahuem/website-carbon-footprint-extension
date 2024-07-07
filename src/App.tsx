import React, { useEffect, useState } from "react";
import Emissions from "./components/Emissions";
import HostingInsight from "./components/HostingInsights";
import PageSpeedInsights from "./components/PageSpeedInsights";
import EmissionComparison from "./components/EmissionComparison";
import "./App.css"

import { Rings } from "react-loader-spinner";

function App() {
  const [isGreenHost, setIsGreenHost] = useState(false);

  const [kiBSent, setKiBSent] = useState('');
  const [bytesSent, setBytesSent] = useState(0);

  const [isFetching, setIsFetching] = useState(true);
  const [url, setUrl] = useState('');
  const [emissions, setEmissions] = useState(0);
  const [isPropperUrl, setIsPropperUrl] = useState(true);

  useEffect(() => {
    // Get the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      let url = tabs[0].url as string;
      // check if the url is measurable
      if(url === undefined || url === "chrome://newtab/") {
        setIsPropperUrl(false);
        return;
      } else {
        setIsPropperUrl(true);
        setUrl(url);
      }
    });
    if(kiBSent !== '') {
      setIsFetching(false);
    }
    console.log("KiB sent", kiBSent);
    console.log("Bytes Sent", bytesSent);
  } ,[kiBSent]);


  return (
    <div className="App">
      {isPropperUrl ? <>
        {isFetching && 
          <div style={{paddingTop: "50px"}}>
            <Rings color="white" />
            <p>Loading...</p>
          </div>
        }   
        <div className={isFetching ? "carbon-insights-invisible" : "carbon-insights-visible"}>
          <Emissions isGreenHost={isGreenHost} bytesSent={bytesSent} setEmissions={setEmissions} />
            { url &&
              <>
              <HostingInsight url={url} isGreenHost={isGreenHost} setIsGreenHost={setIsGreenHost}/>
              <p>{kiBSent}</p>
              <EmissionComparison emissions={emissions}/>
              <PageSpeedInsights 
                url={url} 
                setKiBSent={setKiBSent}
                setBytesSent={setBytesSent}
                />
            </>
            }
        </div>
      </>
      :
      <p>Open a tap to see insights</p>
      }
    </div>
  );
}

export default App;
