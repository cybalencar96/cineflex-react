import "./SeatsPage.css"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSessionSeats, getSesstionSeats } from "../../../api"
import LoadingComponent from "../../LoadingComponent"
import PageTitle from "../../PageTitle"

export default function SeatsPage() {
    const params = useParams();
    const [seats, setSeats] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]); 

    useEffect(() => {
        getSessionSeats(params.idSession, setSeats);
    },[])
    
    if (!seats) {
        return (
            <LoadingComponent/>
        )
    }

    function seatAvailable(seatId) {
        if (selectedSeats.includes(seatId)) {
            return false; //assento já selecionado, precisa deselecionar
        }
        return true; //assento não selecionado, selecionar
    }

    function toggleSeat(seatId) {
        if (seatAvailable(seatId)) { 
            setSelectedSeats([...selectedSeats,seatId]);
            return "selected-type"
        }
        else { 
            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat !== seatId));
            return "available-type"
        }
    }


    return (
        <main className="main-content">
            <PageTitle>Selecione o(s) assento(s)</PageTitle>

            <section className="seats">
                {
                    seats.seats.map(seat => (
                        <Seat toggleSeat={toggleSeat} seatAvailable={seatAvailable} id={seat.id} name={seat.name} isAvailable={seat.isAvailable}/>
                    ))
                }
            </section>

            <section className="status-types">
                <div>
                    <div class="status-type-ball selected-type"></div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div class="status-type-ball available-type"></div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div class="status-type-ball unavailable-type"></div>
                    <p>Indisponível</p>
                </div>
            </section>
            
            
        </main>
     
    )
}

function Seat({id,isAvailable,name,toggleSeat,seatAvailable}) {

    const [seatState, setSeatState] = useState("available-type");
    function reserve() {
        if (!isAvailable) return alert("Assento já reservado");
        setSeatState(toggleSeat(id));
    }

    return (
        <div onClick={reserve} className={"seat " + seatState}>
            <span>{name}</span>
        </div>
    )
}