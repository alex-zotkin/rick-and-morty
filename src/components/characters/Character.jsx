import { Link } from "react-router-dom";
import "../../css/characters/Character.css"

function Character({data}){
    return(
        <Link to={'/character/' + data.id} className="character card">
            <img src={data.image}/>
            <div className="character_info">
                <h3>{data.name}</h3>
                <span>{data.species}</span>
            </div>
        </Link>
    );
}

export default Character;