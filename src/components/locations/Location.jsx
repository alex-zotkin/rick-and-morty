import { Link } from "react-router-dom";
import "../../css/locations/Location.css"

function Location({data}){
    return(
        <Link to={'/location/' + data.id} className="location card">
            <h3>{data.name}</h3>
            <span>{data.type}</span>
        </Link>
    );
}

export default Location;