import "./styles/EmissionsComparison.css"

const EmissionComparison = () => {
    return(
        <div className="emissions-comparison">
            <div className="emissions-comparison-content">
                <img src="./assets./car.png" alt="car" className="emissions-comparison__content__img" />
                <p>CO2 emissions from your website</p>
            </div>
            <div className="emissions-comparison-content">
                <img src="plane.png" alt="plane" className="emissions-comparison__content__img"/>
                <p>CO2 emissions from a tree</p>
            </div>
        </div>
    )
}

export default EmissionComparison;