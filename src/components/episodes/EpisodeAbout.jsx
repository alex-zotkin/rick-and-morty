import { useEffect, useState } from "react";
import "../../css/episodes/EpisodeAbout.css"
import { useParams } from "react-router-dom";
import axios from "axios";
import CharactersList from "../characters/CharactersList";

function EpisodeAbout(){
    const params = useParams();
    const [episode, setEpisode] = useState({});
    const [characters, setCharacters] = useState([]);

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/episode/${params.id}`)
        .then(response => {
            setEpisode(response.data)

            axios.all(response.data.characters.map((c) => {
                return axios.get(c)
            }))
            .then(axios.spread((...data) => {
                let characters_get = []
                data.forEach(el=>{
                    characters_get.push(el.data)
                })

                setCharacters(characters_get);
            }))

        })
    }, [setEpisode, setCharacters])

    return(
        <>
        {console.log(characters)}
            <h2 className="episode_name">{episode.name}</h2>

            <ul className="episode_info center">
                <li>
                    <h4>
                        Episode
                    </h4>
                    <span>
                        {episode.episode}
                    </span>
                </li>

                <li>
                    <h4>
                        Date
                    </h4>
                    <span>
                        {episode.air_date}
                    </span>
                </li>
            </ul>

            <CharactersList data={characters}/>
        </>
    )
}

export default EpisodeAbout;