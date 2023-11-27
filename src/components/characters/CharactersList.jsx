import Character from "./Character";

function CharactersList({data}){
    const characters = data;

    return (
        <section className="card_list">
            {characters.map( (el, index)=>{
                return <Character key={index} data={el}/>
            })}

        </section>
    );
}

export default CharactersList;