import React, { useRef, useEffect, useState } from 'react';
import PageSpeedInsights from './views/PageSpeedInsights';
import HostingInsight from './views/HostingInsight';

const App = () => {

    const url = "https://api.thegreenwebfoundation.org";

    return (<>
        <div>
            <h1>App</h1>
            <label htmlFor="bar">Insert Url</label><br/>
            {/* <input type="text" onChange={(e) => setUrl(e.target.value)}/>*/}
            <button >Check</button>
        </div>
        <PageSpeedInsights url={url}/>
        <HostingInsight url={url}/>
        </>
    );
}

export default App;