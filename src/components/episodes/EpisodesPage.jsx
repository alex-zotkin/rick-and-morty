import main_img from "../../imgs/rick-and-morty_episodes.svg";
import "../../css/episodes/EpisodesPage.css"

import { useEffect, useState } from "react";
import EpisodesList from "./EpisodesList";
import axios from "axios";


function EpisodesPage(){

    const [episodes, setEpisodes] = useState({data: []});
    const [search, setSeacrh] = useState("");



    useEffect(() => {   
        axios.get('https://rickandmortyapi.com/api/episode')
        .then(function (response) {
            setEpisodes({
                next: response.data.info.next,
                data: response.data.results
            });
        })
          
    }, []);







    function loadMore(){
        axios.get(episodes.next)
        .then( response => {
          setEpisodes({
            next: response.data.info.next,
            data: [...episodes.data, ...response.data.results]
          });
        })
      }
    


    function startSearch(e){
        
        if(e.target.value === ""){
            setSeacrh("")
        } else{
            axios.all([
                axios.get(`https://rickandmortyapi.com/api/episode/?episode=${e.target.value}`).catch(e =>{}),
                axios.get(`https://rickandmortyapi.com/api/episode/?name=${e.target.value}`).catch(e => {}),
            ])
            .then(axios.spread((...response) => {
                let res = []

                response.forEach(el => {
                    if(el != undefined){
                        res.push(...el.data.results)
                    }
                })

                setSeacrh(res)
            }))
        }
    }






    return(
        <>
            <img src={main_img}/>

            <section className="search_section">
                <input onChange={startSearch} type="text" placeholder="Filter by name or episode (ex. S01 or S01E02)" className="episode_search_input"/>
            </section>


            <EpisodesList data={ search == "" ? episodes.data : search}/>
   

            { 
                (episodes.next &&  search === "")
                ?    <button className="loadMore" onClick={loadMore}>Load More</button>
                : <></>
            }
        </>
    );
}

export default EpisodesPage;