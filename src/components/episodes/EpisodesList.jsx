import Episode from "./Episode";

function EpisodesList({data}){
    const episodes = data;
    
    return (
        <section className="card_list">
            {episodes.map( el=>{
                return <Episode key={el.id} data={el}/>
            })}
        </section>
    );
}

export default EpisodesList;