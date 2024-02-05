import { co2 } from "@tgwf/co2";
import "./styles/Emissions.css"

interface EmissionsProps {
  isGreenHost: boolean;
  bytesSent: number;
  setEmissions: (emissions: number) => void;
}

const Emissions: React.FC<EmissionsProps> = ({ isGreenHost, bytesSent, setEmissions }) => {
  const co2Emission = new co2(); // modell can be defined here

  const estimatedCO2 = co2Emission.perByte(bytesSent, isGreenHost);
  setEmissions(estimatedCO2);

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
