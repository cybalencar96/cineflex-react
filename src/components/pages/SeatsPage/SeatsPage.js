import "./SeatsPage.css"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSessionSeats, getSesstionSeats } from "../../../api"
import LoadingComponent from "../../LoadingComponent"
import PageTitle from "../../PageTitle"

export default function SeatsPage() {
    const params = useParams();
    const [seats, setSeats] = useState("");

    useEffect(() => {
        getSessionSeats(params.idSession, setSeats);
    },[])
    
    if (!seats) {
        return (
            <LoadingComponent/>
        )
    }
    return (
        <main className="main-content">
            <PageTitle>Selecione o(s) assento(s)</PageTitle>

            <section className="seats">
                {
                    seats.seats.map(seat => (
                        <Seat id={seat.id} name={seat.name} isAvailable={seat.idAvailable}/>
                    ))
                }
            </section>
            
        </main>
     
    )
}

function Seat({id,name,isAvailable}) {
    function checkAvailability() {

    }
    return (
        <div className="seat">
            <p>{name}</p>
        </div>
    )
}