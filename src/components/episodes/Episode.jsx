import { Link } from "react-router-dom";
import "../../css/episodes/Episode.css"

function Episode({data}){

    return( 
        <Link to={'/episode/' + data.id} className="episode card">
            <h3>{data.name}</h3>
            <span>{data.air_date}</span>
            <span style={{fontWeight: 'bold'}}>{data.episode}</span>
        </Link>
    );
}

export default Episode;