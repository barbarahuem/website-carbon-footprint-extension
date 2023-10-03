import { co2 } from "@tgwf/co2";
import "./styles/Emissions.css"

interface EmissionsProps {
  isGreenHost: boolean;
  carbonFootprint: number;
}

const Emissions: React.FC<EmissionsProps> = ({ isGreenHost, carbonFootprint }) => {
  const co2Emission = new co2();

  const estimatedCO2 = co2Emission.perByte(carbonFootprint, isGreenHost);

  console.log(
    `Sending a gigabyte, had a carbon footprint of ${estimatedCO2.toFixed(
      3
    )} grams of CO2`
  );

  return (
    <div className="emissions-bubble">
      <p className="emissions-bubble-emissions">
        {estimatedCO2.toFixed(3)} 
      </p>
      <p className="emissions-bubble-text">
        grams of CO2 per load
      </p>
    </div>
  );
};

export default Emissions;
