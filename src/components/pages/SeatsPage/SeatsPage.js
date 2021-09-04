import "./SeatsPage.css"
import { useParams, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSessionSeats, postSeats } from "../../../api"
import LoadingComponent from "../../LoadingComponent"
import PageTitle from "../../PageTitle"
import Footer from "../../Footer"
import styled from "styled-components"

export default function SeatsPage({setFinalInfos}) {
    const params = useParams();
    const [seats, setSeats] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]); 
    const [inputValues, setInputValues] = useState({});
    const regexCPF = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    const regexNOME = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    const history = useHistory();

    useEffect(() => {
        getSessionSeats(params.idSession, setSeats);
    },[])
    
    if (!seats) { return <LoadingComponent/> }

    function seatAvailable(seatId) {
        if (selectedSeats.includes(seatId)) return false; //assento já selecionado, precisa deselecionar
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
        try {
            await postSeats(seatsObj);
            const finalInfos = {
                movieName: seats.movie.title,
                date: seats.day.date,
                time: seats.name,
                seats: seats.seats.filter((seat) => selectedSeats.includes(seat.id)),
                buyerName: inputValues.name,
                buyerCpf: inputValues.cpf
            }
            setFinalInfos(() => finalInfos);
            history.push("/sucesso");
        }
        catch (err) {
            console.log(err)
        }
    }

    function isValid(str,type) {
        if (type === "cpf") return regexCPF.test(str);
        if (type === "name") return regexNOME.test(str);
    }

    function activateButton() {
        return (selectedSeats.length && isValid(inputValues.name,"name") && isValid(inputValues.cpf,"cpf"))
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
                <Input isValid={isValid(inputValues.name,"name")} placeholder="Digite seu nome..." onChange={(e) => change(e,"name")} value={!inputValues.name ? "" : inputValues.name}/>
                <p>{isValid(inputValues.name,"name") ? "" : "nome invalido"}</p>
            </section>
            <section  className="seatsPage-input">
                <h3>CPF do comprador:</h3>
                <Input isValid={isValid(inputValues.cpf,"cpf")} placeholder="Digite seu CPF..." onChange={(e) => change(e,"cpf")} value={!inputValues.cpf ? "" : inputValues.cpf}/>
                <p>{isValid(inputValues.cpf,"cpf") ? "" : "cpf invalido"}</p>
            </section>

            {/* styled component */}
            <Button enabled={activateButton()} onClick={activateButton()  ? reserveSeats : ()=>{}}>Reservar assento(s)</Button>

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

const Button = styled.button`
    background-color: #E8833A;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 3px;
    cursor: pointer;
    margin: 30px auto ;
    font-size: 18px;
    width: 225px;
    height: 42px;
    border: none;
    opacity: ${({enabled}) => enabled ? 1 : 0.6};
`

const Input = styled.input`
    width: 100%;
    height: 51px;
    border-radius: 3px;
    border: 1px solid ${({isValid}) => isValid ? '#D5D5D5' : 'red'};
    padding-left: 20px;
    font-size: 18px;
    
    &:focus {
        outline: none;
    }
`