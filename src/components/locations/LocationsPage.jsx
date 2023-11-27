import { useEffect, useState } from "react";
import main_img from "../../imgs/rick-and-morty_loactions.svg";
import LocationsList from "./LocationsList";
import axios from "axios";
import useMatchMedia from "use-match-media-hook";
import close from "../../imgs/close_burger.svg"
import "../../css/locations/LocationsPage.css"

const queries = [
    '(max-width: 950px)',
  ]
  

function LocationsPage(){
    const [mobile] = useMatchMedia(queries)

    const [locations, setLocations] = useState({data: []});
    const [search, setSeacrh] = useState("");

    const [openFilters, setOpenFilters] = useState(false);
    const [type, setType] = useState("");
    const [dimension, setDimension] = useState("");

    useEffect(() => {   
        axios.get('https://rickandmortyapi.com/api/location')
        .then(function (response) {
            setLocations({
                next: response.data.info.next,
                data: [...response.data.results]
            });
        })
          
    }, []);
    


    function loadMore(){
        axios.get(locations.next)
        .then( response => {
        setLocations({
            next: response.data.info.next,
            data: [...locations.data, ...response.data.results]
        });
        })
    }






    
    function startSearch(){
        let input = document.querySelector("input[name='search']").value

        let link = `https://rickandmortyapi.com/api/location/?name=${input}`

        if(type != ""){
            link += `&type=${type}`
        }
        if(dimension != ""){
            link += `&dimension=${dimension}`
        }

        if(input == ""){
            setSeacrh("")
        } else{
            axios.get(link)
            .then( response => {
                let res = []

                let pages = response.data.info.pages
                let links_get = [];

                for(let i = 1; i <= pages; i++){
                    links_get.push(link + `&page=${i}`)
                }


                axios.all(links_get.map(l => {return axios.get(l)}))
                .then(axios.spread((...data) => {
                    data.forEach(el => {
                        res.push(...el.data.results)
                    })

                    setSeacrh(res)
                }))
            }).catch(()=>{
                setSeacrh([])
            })
        }
    }



    useEffect(()=>{
        startSearch()

    }, [type, dimension])


    
  function changeOpenFilters(){
    setOpenFilters(!openFilters)
  }




    return(
        <>
            <img src={main_img}/>

            <section className="search_section">
                <input name="search" onChange={startSearch} type="text" placeholder="Filter by name..." className="location_search_input"/>

                { mobile
                    ? <></>
                    
                    : <>
                    <select name="type" onChange={(e) => {setType( e.target.value)}} value={type}>
                        <option selected value="">Type</option>
                        <option>Planet</option>
                        <option>Cluster</option>
                        <option>TV</option>
                        <option>Microverse</option>
                        <option>Space station</option>
                        <option>Fantasy town</option>
                        <option>Dream</option>
                        <option>Resort</option>
                    </select>

                    <select name="dimension" onChange={(e) => {setDimension( e.target.value)}} value={dimension}>
                        <option selected value="">Dimension</option>
                        <option>Dimension C-137</option>
                        <option>unknown</option>
                        <option>Post-Apocalyptic Dimension</option>
                        <option>Replacement Dimension</option>
                        <option>Cronenberg Dimension</option>
                    </select>
                    </>
                }
            </section>
            






             {
            mobile
            ? <>
              <button className="advanced_filters_button" onClick={changeOpenFilters}>ADVANCED FILTERS</button>

              {openFilters
              ? <section className="filter_containter">
                <div className="filter_box">
                  <div className="filter_box_header">
                    <h3>Filters</h3>
                    <img src={close} onClick={changeOpenFilters}/>
                  </div>

                  <select name="type" onChange={(e) => {setType( e.target.value)}} value={type}>
                    <option selected value="">Type</option>
                    <option>Planet</option>
                    <option>Cluster</option>
                    <option>TV</option>
                    <option>Microverse</option>
                    <option>Space station</option>
                    <option>Fantasy town</option>
                    <option>Dream</option>
                    <option>Resort</option>
                </select>

                <select name="dimension" onChange={(e) => {setDimension( e.target.value)}} value={dimension}>
                    <option selected value="">Dimension</option>
                    <option>Dimension C-137</option>
                    <option>unknown</option>
                    <option>Post-Apocalyptic Dimension</option>
                    <option>Replacement Dimension</option>
                    <option>Cronenberg Dimension</option>
                </select>


                  <button className="advanced_filters_button" onClick={() => {startSearch(); changeOpenFilters()}}>APPLY</button>
                </div>
              </section>
              : <></>
            }
            </>
          : <></>
        }




            <LocationsList data={ search === "" ? locations.data : search}/>

            { 
                (locations.next &&  search == "")
                ?    <button className="loadMore" onClick={loadMore}>Load More</button>
                : <></>
            }
            
        </>
    );
}

export default LocationsPage;