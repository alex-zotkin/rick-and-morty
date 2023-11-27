import { useEffect, useState } from "react";
import "../../css/locations/LocationAbout.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import CharactersList from "../characters/CharactersList";

function LocationAbout(){
    const params = useParams();
    const [location, setLocation] = useState({});
    const [characters, setCharacters] = useState([]);

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/location/${params.id}`)
        .then(response => {
            setLocation(response.data)

            axios.all(response.data.residents.map((resident) => {
                return axios.get(resident)
            }))
            .then(axios.spread((...data) => {
                let residents = []
                data.forEach(el=>{
                    residents.push(el.data)
                })

                setCharacters(residents);
            }))

        })
    }, [setLocation, setCharacters])


    return(
        <>
            <h2 className="location_name">{location.name}</h2>

            <ul className="location_info center">
                <li>
                    <h4>
                        Type
                    </h4>
                    <span>
                        {location.type}
                    </span>
                </li>

                <li>
                    <h4>
                        Dimension
                    </h4>
                    <span>
                        {location.dimension}
                    </span>
                </li>
            </ul>

            <CharactersList data={characters}/>
        </>
    )
}

export default LocationAbout;