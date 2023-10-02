import React, { useEffect, useState } from "react";

interface HostingInsightProps {
  url: string;
  isGreenHost: boolean;
  setIsGreenHost: React.Dispatch<React.SetStateAction<boolean>>;
}

const HostingInsight: React.FC<HostingInsightProps> = ({
  url,
  isGreenHost,
  setIsGreenHost,
}) => {
  useEffect(() => {
    const hostname = new URL(url).hostname;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.thegreenwebfoundation.org/api/v3/greencheck/" + hostname
        );
        const data = await response.json();
        console.log(data, url);
        setIsGreenHost(data.green);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [url, setIsGreenHost]);

  return (
    <div>
      {isGreenHost ? (
        <p>Host is Green</p>
      ) : (
        <p>Host is NOT Green</p>
      )}
    </div>
  );
};

export default HostingInsight;
