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
      <div className="emissions-bubble-content">
        <p className="emissions-bubble-emissions">
          {estimatedCO2.toFixed(3)} <em className="emissions-bubble-g">g</em>
        </p>
      </div>
    </div>
  );
};

export default Emissions;
