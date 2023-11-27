import CharactersList from "./CharactersList";
import main_img from "../../imgs/rickandmorty_letters.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import useMatchMedia from "use-match-media-hook";
import close from "../../imgs/close_burger.svg"


const queries = [
  '(max-width: 950px)',
]

function CharactersPage(){
  const [mobile] = useMatchMedia(queries)

  const [characters, setCharacters] = useState({data: []});
  const [search, setSeacrh] = useState("");

  const [openFilters, setOpenFilters] = useState(false);
  const [species, setSpecies] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");




  useEffect(() => {
    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        setCharacters({
          next: response.data.info.next,
          data: [...response.data.results]
        });
      })
      
  }, [])




  function loadMore(){
    axios.get(characters.next)
    .then( response => {
      setCharacters({
        next: response.data.info.next,
        data: [...characters.data, ...response.data.results]
      });
    })
  }



  function startSearch(){
    let input = document.querySelector("input[name='search']").value
    let link = `https://rickandmortyapi.com/api/character/?name=${input}`

    if(species != ""){
        link += `&species=${species}`
    }
    if(gender != ""){
        link += `&gender=${gender}`
    }
    if(status != ""){
      link += `&status=${status}`
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
            
        }).catch((e)=>{
            setSeacrh([])
        })
    }
  }



  useEffect(()=>{
    startSearch()

  }, [species, gender, status])






  function changeOpenFilters(){
    setOpenFilters(!openFilters)
  }







    

    return(
      <>
        <img src={main_img} className="character_page_img"/>

        <section className="search_section">
            <input name="search" onChange={startSearch} type="text" placeholder="Filter by name..." className="location_search_input"/>
            
            { mobile
              ? <></>
              
              : <>
                <select name="species" onChange={(e) => {setSpecies( e.target.value)}} value={species}>
                  <option selected value="">Species</option>
                  <option>Human</option>
                  <option>Alien</option>
                  <option>Humanoid</option>
                  <option>unknown</option>
                  <option>Poopybutthole</option>
                  <option>Animal</option>
                  <option>Robot</option>
                  <option>Mythological Creature</option>
                </select>

                <select name="gender" onChange={(e) => {setGender(e.target.value)}} value={gender}>
                    <option selected value="">Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                </select>

                <select name="status" onChange={(e) => {setStatus(e.target.value)}} value={status}>
                    <option selected value="">Status</option>
                    <option>Alive</option>
                    <option>Dead</option>
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

                  <select name="species" onChange={(e)=> {setSpecies(e.target.value)}} value={species}>
                    <option selected value="">Species</option>
                    <option>Human</option>
                    <option>Alien</option>
                    <option>Humanoid</option>
                    <option>unknown</option>
                    <option>Poopybutthole</option>
                    <option>Animal</option>
                    <option>Robot</option>
                    <option>Mythological Creature</option>
                  </select>

                  <select name="gender" onChange={(e)=> {setGender(e.target.value)}} value={gender}>
                      <option selected value="">Gender</option>
                      <option>Male</option>
                      <option>Female</option>
                  </select>

                  <select name="status" onChange={(e)=> {setStatus(e.target.value)}} value={status}>
                      <option selected value="">Status</option>
                      <option>Alive</option>
                      <option>Dead</option>
                  </select>


                  <button className="advanced_filters_button" onClick={() => {startSearch(); changeOpenFilters()}}>APPLY</button>
                </div>
              </section>
              : <></>
            }
            </>
          : <></>
        }




        <CharactersList data={ search === "" ? characters.data : search}/>

        { 
            (characters.next &&  search == "")
            ?    <button className="loadMore" onClick={loadMore}>Load More</button>
            : <></>
        }
      </>
    );
}

export default CharactersPage;