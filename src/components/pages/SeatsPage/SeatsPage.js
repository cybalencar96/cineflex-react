import "./SeatsPage.css"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSessionSeats, postSeats } from "../../../api"
import LoadingComponent from "../../LoadingComponent"
import PageTitle from "../../PageTitle"
import Footer from "../../Footer"

export default function SeatsPage({setFinalInfos}) {
    const params = useParams();
    const [seats, setSeats] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]); 
    const [inputValues, setInputValues] = useState({});
    useEffect(() => {
        getSessionSeats(params.idSession, setSeats);
    },[])
    
    if (!seats) {
        return (
            <LoadingComponent/>
        )
    }
    console.log(seats);

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

    //função que armazenará os valores dos inputs controlados
    function change(event,attribute) {
        //event target pega o elemento input
        inputValues[attribute] = event.target.value
        setInputValues({...inputValues});
    }
    
    async function reserveSeats() {
        const seatsObj = {
            ids: selectedSeats,
            name: inputValues.name,
            cpf: inputValues.cpf
        }
        const isSuccess = await postSeats(seatsObj);
        if (isSuccess) {

            const finalInfos = {
                movieName: seats.movie.title,
                date: seats.day.date,
                time: seats.name,
                seats: seats.seats.filter((seat) => selectedSeats.includes(seat.id)),
                buyerName: inputValues.name,
                buyerCpf: inputValues.cpf
            }

            console.log(finalInfos)
            setFinalInfos(() => finalInfos);
        }   

    }

    return (
        <main className="main-content">
            <PageTitle>Selecione o(s) assento(s)</PageTitle>

            <section className="seats">
                {
                    seats.seats.map(seat => (
                        <Seat toggleSeat={toggleSeat} id={seat.id} name={seat.name} isAvailable={seat.isAvailable}/>
                    ))
                }
            </section>

            <section className="status-types">
                <div>
                    <div className="status-type-ball selected-type"></div>
                    <p>Selecionado</p>
                </div>
                <div>
                    <div className="status-type-ball available-type"></div>
                    <p>Disponível</p>
                </div>
                <div>
                    <div className="status-type-ball unavailable-type"></div>
                    <p>Indisponível</p>
                </div>
            </section>
            
            <section className="seatsPage-input">
                <h3>Nome do comprador:</h3>
                {/* Exemplo de input controlado (pelo react) usando onChange e value
                    Desta forma caso o input seja renderizado ele não perderá o valor
                */}
                <input placeholder="Digite seu nome..." onChange={(e) => change(e,"name")} value={!inputValues.name ? "" : inputValues.name}/>
            </section>
            <section  className="seatsPage-input">
                <h3>CPF do comprador:</h3>
                <input placeholder="Digite seu CPF..." onChange={(e) => change(e,"cpf")} value={!inputValues.cpf ? "" : inputValues.cpf}/>
            </section>

            <Link to="/sucesso">
                <button className="seatsPage-button" onClick={reserveSeats}>Reservar assento(s)</button>
            </Link>
            <Footer posterURL={seats.movie.posterURL} movieTitle={seats.movie.title} weekday={seats.day.weekday} time={seats.name}/>
        </main>
     
    )
}

function Seat({id,isAvailable,name,toggleSeat}) {

    const [seatState, setSeatState] = useState("available-type");
    useEffect(() => {if (!isAvailable) setSeatState("unavailable-type")},[]);
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