import React, { useRef, useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner';
import PageSpeedInsights from './views/PageSpeedInsights';
import HostingInsight from './views/HostingInsight';
import Emissions from './views/Emissions';

const App = () => {

    const [isGreenHost, setIsGreenHost] = useState(false);
    const [bytesSent, setBytesSent] = useState(0);
    const url = "https://www.netflix.com";

    return (<>
        <div>
            <h1>App</h1>
            <label htmlFor="bar">Insert Url</label><br/>
            {/* <input type="text" onChange={(e) => setUrl(e.target.value)}/>*/}
            <button >Check</button>
        </div>
        <Rings
            height="80"
            width="80"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="rings-loading"
            />
        <PageSpeedInsights url={url} setBytesSent={setBytesSent}/>
        <HostingInsight url={url} isGreenHost={isGreenHost} setIsGreenHost={setIsGreenHost}/>
        <Emissions url={url} isGreenHost={isGreenHost} bytesSent={bytesSent} />
        </>
    );
}

export default App;