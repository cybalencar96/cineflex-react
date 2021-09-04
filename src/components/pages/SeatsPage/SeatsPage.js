import "./SeatsPage.css"
import { useParams, useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { getSessionSeats, postSeats } from "../../../api"
import LoadingComponent from "../../shared/LoadingComponent"
import PageTitle from "../../shared/PageTitle"
import Footer from "../../shared/Footer"
import Seat from "./Seat"
import { Button, Input } from "./SeatsPageStyle"

export default function SeatsPage({setFinalInfos}) {
    const params = useParams();
    const [seats, setSeats] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]); 
    const [inputValues, setInputValues] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
        getSessionSeats(params.idSession, setSeats);
    },[])
    
    if (!seats) { return <LoadingComponent/> }

    function seatAvailable(seatId) {
        const selectedSeatsIds = selectedSeats.map(selectedSeat => selectedSeat.id)
        if (selectedSeatsIds.includes(seatId)) return false; //assento já selecionado, precisa deselecionar
        return true; //assento não selecionado, selecionar
    }

    function toggleSeat(seat) {
        if (seatAvailable(seat.id)) { 
            setSelectedSeats([...selectedSeats,{...seat}]);
            setInputValues([...inputValues,{seatId: seat.id, seatName: seat.name, name: "", cpf: ""}])
            return "selected-type"
        }
        else { 
            setSelectedSeats(selectedSeats.filter(selectedSeat => selectedSeat.id !== seat.id));
            const inputAffected = inputValues.filter(inputValue => inputValue.seatId === seat.id)
            if (inputAffected[0].name === "" && inputAffected[0].cpf === "") {
                setInputValues(inputValues.filter(inputValue => inputValue.seatId !== seat.id))
            } else {
                const res = window.confirm("Deseja realmente desmarcar este assento? \nTodos os campos preenchidos serão apagados.")
                if (res) {
                    setInputValues(inputValues.filter(inputValue => inputValue.seatId !== seat.id))
                }
            }
            return "available-type"
        }
    }

    async function reserveSeats() {
        const buyers = inputValues.map(inputValue => {
            return {
                idAssento: inputValue.id,
                nome: inputValue.name,
                cpf: inputValue.cpf
            }
        })
        const seatsObj = {
            ids: selectedSeats.map(selectedSeat => selectedSeat.id),
            compradores: buyers
        }
        try {
            await postSeats(seatsObj);
            const finalInfos = {
                movieName: seats.movie.title,
                date: seats.day.date,
                time: seats.name,
                seats: seats.seats.filter((seat) => selectedSeats.map(selSeats => selSeats.id).includes(seat.id)),
                buyers: inputValues
            }
            console.log(seatsObj)
            setFinalInfos(() => finalInfos);
            history.push("/sucesso");
        }
        catch (err) {
            console.log(err)
        }
    }

    function activateButton() {
        //retorna true ou false, dependendo se todos os names/cpfs passaram na validação do regex isValid
        const namesAreValid = !inputValues.map(inputValue => isValid(inputValue.name,"name")).includes(false);
        const cpfsAreValid = !inputValues.map(inputValue => isValid(inputValue.cpf,"cpf")).includes(false);
        
        return (!!selectedSeats.length && namesAreValid && cpfsAreValid)
    }

    return (
        <main className="main-content">
            <PageTitle>Selecione o(s) assento(s)</PageTitle>

            <section className="seats">
                {
                    seats.seats.map(seat => (
                        <Seat toggleSeat={toggleSeat} seat={seat}/>
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
            
            {
                inputValues.map((inputValue) => {
                    return <InputBuyerInfo myInputValue={inputValue} inputValues={inputValues} setInputValues={setInputValues}/>
                })
            }

            {/* styled component */}
            <Button enabled={activateButton()} onClick={activateButton()  ? reserveSeats : ()=>{}}>Reservar assento(s)</Button>

            <Footer posterURL={seats.movie.posterURL} movieTitle={seats.movie.title} weekday={seats.day.weekday} time={seats.name}/>
        </main>
     
    )
}

function InputBuyerInfo({myInputValue, inputValues, setInputValues}) {
    const {
        seatId,
        seatName,
        name,
        cpf
    } = myInputValue
    //função que armazenará os valores dos inputs controlados
    function change(event,attribute) {
        //event target pega o elemento input
            inputValues.forEach((inputValue,idx) => {
                if (inputValue.seatId === seatId) {
                    myInputValue[attribute] = event.target.value;
                    inputValues[idx][attribute] = event.target.value;
                    setInputValues([...inputValues]);
                }
            })
    }

    return (
        <>
            <section className="seatsPage-input">
                <h3>Nome do comprador (assento {seatName}):</h3>
                {/* Exemplo de input controlado (pelo react) usando onChange e value
                    Desta forma caso o input seja renderizado ele não perderá o valor */}
                <Input isValid={isValid(name,"name")} placeholder="Digite seu nome..." onChange={(e) => change(e,"name")} value={!name ? "" : name}/>
                <p>{isValid(name,"name") ? "" : "nome invalido"}</p>
            </section>
            <section  className="seatsPage-input">
                <h3>CPF do comprador (assento {seatName}):</h3>
                {/* styled component */}
                <Input isValid={isValid(cpf,"cpf")} placeholder="Digite seu CPF..." onChange={(e) => change(e,"cpf")} value={!cpf ? "" : cpf}/>
                <p>{isValid(cpf,"cpf") ? "" : "cpf invalido"}</p>
            </section>
        </>
    )
}

function isValid(str,type) {
    const regexCPF = /^([0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2})/
    const regexNOME = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;

    if (type === "cpf") return regexCPF.test(str);
    if (type === "name") return regexNOME.test(str);
}