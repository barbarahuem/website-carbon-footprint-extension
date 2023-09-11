import React, { useEffect, useState } from 'react';

const PageSpeedInsights = () => {
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

      if (json.lighthouseResult) {
        const lighthouse = json.lighthouseResult;
        const lighthouseMetrics = {
          'First Contentful Paint': lighthouse.audits['first-contentful-paint']?.displayValue || 'N/A',
          'Speed Index': lighthouse.audits['speed-index']?.displayValue || 'N/A',
          'Time To Interactive': lighthouse.audits['interactive']?.displayValue || 'N/A',
          'First Meaningful Paint': lighthouse.audits['first-meaningful-paint']?.displayValue || 'N/A',
          'First CPU Idle': lighthouse.audits['first-cpu-idle']?.displayValue || 'N/A',
          'Estimated Input Latency': lighthouse.audits['estimated-input-latency']?.displayValue || 'N/A'
        };
        setLighthouseMetrics(lighthouseMetrics);
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
        <li key={metric}>
          <strong>{metric}:</strong> {value}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default PageSpeedInsights;
