import Location from "./Location";

function LocationsList({data}){
    const locations = data;

    return (
        <section className="card_list">
            {locations.map( el=>{
                return <Location key={el.id} data={el}/>
            })}
        </section>
    );
}

export default LocationsList;