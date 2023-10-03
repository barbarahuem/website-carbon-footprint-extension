import React, { useEffect, useState } from 'react';
import './styles/PageSpeedInsights.css';

interface LighthouseMetrics {
  [key: string]: {
    goodMax?: number;
    averageMax?: number;
    sec: string;
    score?: string | number;
  };
}

interface LighthousePotentialSavings {
  [key: string]: {
    sec: string;
  };
}

interface PageSpeedInsightsProps {
    url: string;
    setBytesSent: React.Dispatch<React.SetStateAction<string>>;
    setIsFetching: React.Dispatch<React.SetStateAction<boolean>>;
    setCarbonFootprint: React.Dispatch<React.SetStateAction<number>>;
  }

interface Parameters {
    [key: string]: string;
  }

const PageSpeedInsights: React.FC<PageSpeedInsightsProps> = ({
  url,
  setBytesSent,
  setIsFetching,
  setCarbonFootprint,
}) => {
  const [cruxMetrics, setCruxMetrics] = useState<{ [key: string]: string }>({});
  const [lighthouseMetrics, setLighthouseMetrics] = useState<LighthouseMetrics>({});
  const [lighthousePotentialSavings, setLighthousePotentialSavings] =
    useState<LighthousePotentialSavings>({});

  useEffect(() => {
    async function run() {
      const url = setUpQuery();
      const response = await fetch(url);
      const json = await response.json();

      // Update the state to render the content
      if (json.loadingExperience && json.loadingExperience.metrics) {
        const cruxMetrics = {
          "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
          "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
        };
        setCruxMetrics(cruxMetrics);
      }

      console.log(json);

      if (json.lighthouseResult) {
        const lighthouse = json.lighthouseResult;
        if (lighthouse) {
        const lighthouseMetrics: LighthouseMetrics = {
          'First Contentful Paint': {
            goodMax: 1.8,
            averageMax: 3.0,
            sec: lighthouse.audits['first-contentful-paint']?.displayValue || 'N/A',
          },
          'Speed Index': {
            goodMax: 3.4,
            averageMax: 5.8,
            sec: lighthouse.audits['speed-index']?.displayValue || 'N/A',
          },
          'Time To Interactive': {
            goodMax: 3.8,
            averageMax: 7.3,
            sec: lighthouse.audits['interactive']?.displayValue || 'N/A',
          },
          'First Meaningful Paint': {
            goodMax: 2,
            averageMax: 4,
            score: lighthouse.audits['first-meaningful-paint']?.score || 'N/A',
            sec: lighthouse.audits['first-meaningful-paint']?.displayValue || 'N/A',
          },
          'First CPU Idle': {
            goodMax: 4.7,
            averageMax: 6.5,
            score: lighthouse.audits['first-cpu-idle']?.score || 'N/A',
            sec: lighthouse.audits['first-cpu-idle']?.displayValue || 'N/A',
          },
          'Estimated Input Latency': {
            sec: lighthouse.audits['estimated-input-latency']?.displayValue || 'N/A',
          }
        };

        const lighthousePotentialSavings: LighthousePotentialSavings = {
          'Offscreen Images': {
            sec: lighthouse.audits['offscreen-images']?.displayValue || 'N/A',
          },
          'Render Blocking Resources': {
            sec: lighthouse.audits['render-blocking-resources']?.displayValue || 'N/A',
          },
          'Unused CSS': {
            sec: lighthouse.audits['unused-css-rules']?.displayValue || 'N/A',
          },
        };

        setLighthouseMetrics(lighthouseMetrics);
        setLighthousePotentialSavings(lighthousePotentialSavings);
        
        let bytesSentTemp = String(lighthouseMetrics['Total Byte Weight'].sec);
        setBytesSent(bytesSentTemp);
        setCarbonFootprint(Number(bytesSentTemp.replace(/\D/g, '')) * 1024); // Kibibytes to bytes
        setIsFetching(false);
      }
      }
    }

    run();
  }, []);

  const setUpQuery = () => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters: Parameters = {
        url: encodeURIComponent(url),
      };
    let query = `${api}?`;
    for (const key in parameters) {
      query += `${key}=${parameters[key]}`;
    }
    return query;
  };

  return (
    <div className="PageSpeedInsights">
      <h1>Lighthouse Metrics</h1>
      <ul>
        {Object.entries(lighthouseMetrics).map(([metric, value]) => (
          <li key={metric} className='metrics-list'>
            <strong>{metric}: </strong>
            <em
              className={
                  value.goodMax && value.averageMax
                  ? Number(value.sec.slice(0, 2)) <= value.goodMax
                    ? 'good'
                    : Number(value.sec.slice(0, 2)) > value.averageMax
                    ? 'poor'
                    : 'average'
                  : ''
                
              }
            >
              {value.sec}
            </em>
          </li>
        ))}
      </ul>
      <ul>
        {Object.entries(lighthousePotentialSavings).map(([metric, value]) => (
          <li key={metric}>
            <strong>{metric}: </strong>
            <em>{value.sec}</em>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageSpeedInsights;
