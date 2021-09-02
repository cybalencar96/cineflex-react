import "./Sessions.css"
import PageTitle from "../../PageTitle"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieSesions } from "../../../api"
import LoadingComponent from "../../LoadingComponent"

export default function Sessions() {
    const [sessions, setSessions] = useState("");
    const {idMovie} = useParams();

    useEffect(() => {
        getMovieSesions(idMovie,setSessions);
    }, [])

    if (!sessions) {
        return (
            <LoadingComponent />
        )
    }

    return (
        <main className="main-content">
            <PageTitle>Selecione o horário</PageTitle>
            {console.log(sessions)}
            {

                sessions.days.map(day => {
                    return <DaySessions 
                        id={day.id} 
                        weekday={day.weekday} 
                        date={day.date} 
                        showtimes={day.showtimes}
                    />
                })
            }
        </main>
    )
}

function DaySessions(props) {
    const { 
        id,
        weekday,
        date,
        showtimes
    } = props

    return(
        <section className="day-session-container">
            <h3>{`${weekday} - ${date}`}</h3>
            {
                showtimes.map(showtime => (
                    <Link to={`/assentos/${id+showtime.id}`}>
                        <div>{showtime.name}</div>
                    </Link>
                ))
            }
        </section>

    )
}