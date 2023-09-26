import React, { useEffect, useState } from 'react';
import './PageSpeedInsights.css';

const PageSpeedInsights = ({hostname}) => {
  const [cruxMetrics, setCruxMetrics] = useState({});
  const [lighthouseMetrics, setLighthouseMetrics] = useState({});

  useEffect(() => {
    async function run() {
      const url = setUpQuery();
      const response = await fetch(url);
      const json = await response.json();

      // Update the state to render the content
      if (json.loadingExperience && json.loadingExperience.metrics) {
        const cruxMetrics = {
          "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
          "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category
        };
        setCruxMetrics(cruxMetrics);
      }

      console.log(json);

      if (json.lighthouseResult) {
        const lighthouse = json.lighthouseResult;
        const lighthouseMetrics = {
          'First Contentful Paint': {
            goodMax: 1.8,
            averageMax: 3.0,
            sec: lighthouse.audits['first-contentful-paint']?.displayValue || 'N/A'
          },
          'Speed Index': {
            goodMax: 3.4,
            averageMax: 5.8,
            sec: lighthouse.audits['speed-index']?.displayValue || 'N/A'
          },
          'Time To Interactive': {
            goodMax: 3.8,
            averageMax: 7.3,
            sec: lighthouse.audits['interactive']?.displayValue || 'N/A'
        },
          'First Meaningful Paint': {
            goodMax: 2,
            averageMax: 4,
            score: lighthouse.audits['first-meaningful-paint']?.score || 'N/A',
            sec: Number(lighthouse.audits['first-meaningful-paint']?.displayValue) || 'N/A'
          },
          'First CPU Idle': {
            goodMax: 4.7,
            averageMax: 6.5,
            score: lighthouse.audits['first-cpu-idle']?.score || 'N/A',
            sec: lighthouse.audits['first-cpu-idle']?.displayValue || 'N/A'
        },
          'Estimated Input Latency': {
            sec: lighthouse.audits['estimated-input-latency']?.displayValue || 'N/A'
        }
        }
        setLighthouseMetrics(lighthouseMetrics);
        console.log(lighthouseMetrics);
      }
    }

    run();
  }, []);

  const setUpQuery = () => {
    const api = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const parameters = {
      url: encodeURIComponent('https://developers.google.com')
    };
    let query = `${api}?`;
    for (const key in parameters) {
      query += `${key}=${parameters[key]}`;
    }
    return query;
  };

  // Implement your rendering logic here using React components
  // You can access cruxMetrics and lighthouseMetrics state variables to render the data

  return (
    <div className="PageSpeedInsights">
    <h1>Lighthouse Metrics</h1>
    <ul>
      {Object.entries(lighthouseMetrics).map(([metric, value]) => (
        <li 
          key={metric}
          
          >
          <strong>{metric}:</strong> 
          <em 
            className={ 
              value.sec != 'N/A' ? 
              Number(value.sec.slice(0, 2)) <= value.goodMax ? 'good' : 
              Number(value.sec.slice(0, 2)) > value.averageMax ? 'poor' : 
              'average' :
              ''
              }
              >
                {value.sec}
          </em>
        </li>
      ))}
    </ul>
  </div>
  );
}

export default PageSpeedInsights;
