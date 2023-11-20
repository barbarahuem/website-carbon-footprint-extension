import React from "react";
import "./styles/EmissionsComparison.css"

interface EmissionsComparisonProps {
    emissions: number;
}

const EmissionComparison: React.FC<EmissionsComparisonProps> = ({emissions}) => {

    const emissionsPerThousands = emissions * 1000;
    // REF: https://www.bmk.gv.at/themen/mobilitaet/co2_monitoring/pkw.html 
    const emissionsPerKm = 116.2; // emissions per km for a car 2023
    // REF: https://www.plant-for-the-planet.org/wp-content/uploads/2020/12/faktenblatt_baeume_co2.pdf
    const emissionsPerTree = 30.13; // g compenstation per tree per day
    
    const comparisonTree = Math.round(emissionsPerThousands / emissionsPerTree);
    const comparisonCar = Math.round(emissionsPerThousands / emissionsPerKm);

    
    return(
        <div className="emissions-comparison">
            <p className="emissions-comparison-headText">Per 1000 Visits:</p>
            <div className="emissions-comparison-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#051112" className="bi bi-car-front-fill" viewBox="0 0 16 16">
                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679c.033.161.049.325.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.807.807 0 0 0 .381-.404l.792-1.848ZM3 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm10 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2H6ZM2.906 5.189a.51.51 0 0 0 .497.731c.91-.073 3.35-.17 4.597-.17 1.247 0 3.688.097 4.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 11.691 3H4.309a.5.5 0 0 0-.447.276L2.906 5.19Z"/>
                </svg>
                <p>You can drive <em className="emissions-comparison-em">{comparisonCar}</em> km per car.</p>
            </div>
            <div className="emissions-comparison-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#051112" className="bi bi-airplane" viewBox="0 0 16 16">
                <path d="M8.416.223a.5.5 0 0 0-.832 0l-3 4.5A.5.5 0 0 0 5 5.5h.098L3.076 8.735A.5.5 0 0 0 3.5 9.5h.191l-1.638 3.276a.5.5 0 0 0 .447.724H7V16h2v-2.5h4.5a.5.5 0 0 0 .447-.724L12.31 9.5h.191a.5.5 0 0 0 .424-.765L10.902 5.5H11a.5.5 0 0 0 .416-.777l-3-4.5z"/>
                </svg>
                <p>A tree needs <em className="emissions-comparison-em">{comparisonTree}</em> days to compensate the CO2.</p>
            </div>
        </div>
    )
}

export default EmissionComparison;