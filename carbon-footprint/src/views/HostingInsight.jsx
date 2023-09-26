import React, { useEffect, useState } from "react";

const HostingInsight = ({url}) => {

  const [isGreenHost, setIsGreenHost] = useState(false);

  useEffect(() => {
      const hostname = new URL(url).hostname;
      const fetchData = async () => {
          const response = await fetch("https://api.thegreenwebfoundation.org/api/v3/greencheck/" + hostname);
          const data = await response.json();
          console.log(data, url);
          setIsGreenHost(data.green);
      }
      fetchData();
  }, []);  

  return (
    <div>
      {isGreenHost ?
        <p>Host is Green</p> 
        :
        <p>Host is NOT Green</p>}
    </div>
  );
}

export default HostingInsight;