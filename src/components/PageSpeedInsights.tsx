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
    text: string;
  };
}

interface PageSpeedInsightsProps {
    url: string;
    setKbSent: React.Dispatch<React.SetStateAction<string>>;
    setBytesSent: React.Dispatch<React.SetStateAction<number>>;
  }

interface Parameters {
    [key: string]: string;
  }

const PageSpeedInsights: React.FC<PageSpeedInsightsProps> = ({
  url,
  setKbSent,
  setBytesSent
}) => {
  const [cruxMetrics, setCruxMetrics] = useState<{ [key: string]: string }>({}); 
  const [lighthouseMetrics, setLighthouseMetrics] = useState<LighthouseMetrics>({});
  const [lighthousePotentialSavings, setLighthousePotentialSavings] =
    useState<LighthousePotentialSavings>({});

  const [lighthousePerformance, setLighthousePerformance] = useState<string>('');

  useEffect(() => {
    async function run() {
      const url = setUpQuery();
      const response = await fetch(url);
      const json = await response.json();
      if (json.error) {
        return;
      }

      // Update the state to render the content
      if (json.loadingExperience && json.loadingExperience.metrics) {
        const cruxMetrics = {
          "First Contentful Paint": json.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category,
          "First Input Delay": json.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category,
        };
        setCruxMetrics(cruxMetrics);
      }

      // setting values for lighthouse metrics
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
            goodMax: 50,
            averageMax: 100,
            sec: lighthouse.audits['estimated-input-latency']?.displayValue || 'N/A',
          },
        };

        const lightHousePerformance = lighthouse.categories.performance.score * 100;

        const lighthousePotentialSavings: LighthousePotentialSavings = {
          'Reduce Unused CSS': {
            text: lighthouse.audits['unused-css-rules']?.displayValue || 'N/A',
          },
          'Reduce Unused JavaScript': {
            text: lighthouse.audits['unused-javascript']?.displayValue || 'N/A',
          },
          'Reduce JavaScript Execution Time': {
            text: lighthouse.audits['bootup-time']?.displayValue || 'N/A',
          },
          'Reduce Third Party Usage': {
            text: lighthouse.audits['third-party-summary']?.displayValue || 'N/A',
          },
          'Avoid an Excessive DOM Size': {
            text: lighthouse.audits['dom-size']?.displayValue || 'N/A',
          },
          'Eliminate Render-Blocking Resources': {
            text: lighthouse.audits['render-blocking-resources']?.displayValue || 'N/A',
          },
          'Properly Size Images': {
            text: lighthouse.audits['uses-responsive-images']?.displayValue || 'N/A',
          },
          'Use Video Formats for Animated Content': {
            text: lighthouse.audits['efficient-animated-content']?.displayValue || 'N/A',
          },
          'Enable Text Compression': {
            text: lighthouse.audits['uses-text-compression']?.displayValue || 'N/A',
          },
        };

        setLighthouseMetrics(lighthouseMetrics);
        setLighthousePotentialSavings(lighthousePotentialSavings);
        setLighthousePerformance(lightHousePerformance.toString());
        
        const totalByteWeight = lighthouse.audits['total-byte-weight']?.displayValue || 'N/A';
        setKbSent(totalByteWeight);
        setBytesSent(Number(totalByteWeight.replace(/\D/g, '')) * 1024); // Kibibytes to bytes
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
      <h2>Performance: {lighthousePerformance}</h2>
      <div className='metrics-list'>
        {Object.entries(lighthouseMetrics).map(([metric, value]) => (
          <div key={metric} className="metrics-list-item">
            <p className="metrics-list-metric">{metric}</p>
            <div key={metric} className={
                  value.goodMax && value.averageMax
                  ? Number(value.sec.slice(0, 2)) <= value.goodMax
                    ? 'good'
                    : Number(value.sec.slice(0, 2)) > value.averageMax
                    ? 'poor'
                    : 'average'
                  : ''} >
              <p className='metrics-score'>
                  {value.sec}
              </p>
            </div>
          </div>
        ))}
      </div>
      <h1>Potential Savings</h1>
      <ul className='metrics-savings'>
        {Object.entries(lighthousePotentialSavings).map(([metric, value]) => (
          <div className="potential-savings-box" key={metric}>
            <li>
              <p className="potential-savings-box-text">
                <strong>{metric}: </strong><br/>
                {value.text}
              </p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default PageSpeedInsights;
