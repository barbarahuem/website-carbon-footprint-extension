import { co2 } from "@tgwf/co2";


const Emissions = ({isGreenHost, bytesSent}) => {

    const co2Emission = new co2();
 
    const estimatedCO2 = co2Emission.perByte(bytesSent, isGreenHost);

    console.log(
    `Sending a gigabyte, had a carbon footprint of ${estimatedCO2.toFixed(
        3
    )} grams of CO2`
    ); 


    return (
        <div>
            <p>Estimated CO2: {estimatedCO2.toFixed(3)} grams of CO2</p>
        </div>
    );



}

export default Emissions;