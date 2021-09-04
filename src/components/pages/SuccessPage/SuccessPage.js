import PageTitle from "../../shared/PageTitle"
import { Link } from "react-router-dom" 
import "./SuccessPage.css"

export default function SuccessPage(props) {
    const {
        movieName,
        date,
        time,
        seats,
        buyerName,
        buyerCpf
    } = props.finalInfos

    console.log(props.finalInfos)
    return (
        <main className="main-content main-success-page">
            <PageTitle>
                <span class="success-title">Pedido feito com sucesso!</span>
            </PageTitle>

            
                <section class="final-infos">
                    <h3>Filme e sessão</h3>
                    <p>{movieName}</p>
                    <p>{date} - {time}</p>
                </section>
                <section class="final-infos">
                    <h3>Ingressos</h3>
                    { seats.map(seat => <p>Assento {seat.name}</p>) }
                </section>
                <section class="final-infos">
                    <h3>Comprador</h3>
                    <p>Nome: {buyerName}</p>
                    <p>CPF: {buyerCpf}</p>
                </section>
            

            <Link to="/">
                <button>Voltar para Home</button>
            </Link>
        </main>
    )
}