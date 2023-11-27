import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../../css/characters/CharacterAbout.css"
import next_button from "../../imgs/next_button.svg"

function CharacterAbout(){
    const params = useParams()
    const [character, setCharacter] = useState({
        origin: {},
        location: {},
        episodes: []
    })

    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/character/${params.id}`)
        .then(response => {

            axios.get(response.data.location.url)
            .then( loc => {

                axios.all(response.data.episode.map(ep => {
                    return axios.get(ep)
                }))
                .then(axios.spread((...data) => {
                    let episodes = []
                    data.forEach(ep => {
                        episodes.push(ep.data)
                    })
    
                    setCharacter({
                        ...response.data,
                        location: {
                            id: loc.data.id,
                            name: response.data.location.name
                        },
                        episodes: episodes
                    })

                }))                
            })
        })

    }, [setCharacter]);




    return(
        <>
            <img src={character.image} className="character_about_img"/>
            <h2 className="character_about_name">{character.name}</h2>

            <section className="character_about_info center">
                <ul className="character_about_info_list">
                    <h3 className="character_about_info_list_header">Informations</h3>

                    <li>
                        <h4>Gender</h4>
                        <span>{character.gender}</span>
                    </li>

                    <li>
                        <h4>Status</h4>
                        <span>{character.status}</span>
                    </li>

                    <li>
                        <h4>Specie</h4>
                        <span>{character.species}</span>
                    </li>

                    <li>
                        <h4>Origin</h4>
                        <span>{character.origin.name}</span>
                    </li>

                    <li>
                        <h4>Type</h4>
                        <span>{character.type == '' ? "Unknown" : character.type }</span>
                    </li>

                    <li>
                        <h4>Location</h4>
                        <span>{character.location.name}</span>
                        <Link to={"/location/" + character.location.id} className="character_info_link_button">
                            <img src={next_button}/>
                        </Link>
                    </li>
                </ul>

                <ul className="character_about_info_list">
                    <h3 className="character_about_info_list_header">Episodes</h3>

                    {
                        character.episodes.map((ep, index) => {
                            return(
                                <li key={index}>
                                    <h4>{ep.episode}</h4>
                                    <span>{ep.name}</span>
                                    <span>{ep.air_date}</span>

                                    <Link to={"/episode/" + ep.id} className="character_info_link_button">
                                        <img src={next_button}/>
                                    </Link>
                                </li>
                            )
                        })
                    }

                </ul>
            </section>
        </>
    );
}

export default CharacterAbout;