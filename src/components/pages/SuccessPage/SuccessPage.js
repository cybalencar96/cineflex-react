import PageTitle from "../../PageTitle"
import { Link } from "react-router-dom" 

export default function SuccessPage({finalInfos}) {
    console.log(finalInfos)
    return (
        <main className="main-content">
            <PageTitle>
                <span class="success-title">Pedido feito com sucesso!</span>
            </PageTitle>

            <article>
                <section>
                    <h3>Filme e sessão</h3>
                    <p>Nome do filme</p>
                    <p>Data e hora</p>
                </section>
                <section>
                    <h3>Ingressos</h3>
                    <p>Assento 1</p>
                    <p>Assento 2</p>
                </section>
                <section>
                    <h3>Comprador</h3>
                    <p>Nome: Nome do comprador</p>
                    <p>CPF: 123.123.123-12</p>
                </section>
            </article>

            <Link to="/">
                <button>Voltar para Home</button>
            </Link>
        </main>
    )
}