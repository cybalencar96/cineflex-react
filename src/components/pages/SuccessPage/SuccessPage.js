import PageTitle from "../../shared/PageTitle"
import { Link } from "react-router-dom" 
import "./SuccessPage.css"

export default function SuccessPage(props) {
    const {
        movieName,
        date,
        time,
        buyers
    } = props.finalInfos

    console.log(buyers)
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
                    {
                        buyers.map(buyer => {
                            return <div>
                                <h3>Comprador {buyer.name}</h3>
                                <p>CPF: {buyer.cpf}</p>
                                <p>Assento: {buyer.seatName}</p>
                            </div>
                        })
                    }
                    
                </section>
            

            <Link to="/">
                <button>Voltar para Home</button>
            </Link>
        </main>
    )
}