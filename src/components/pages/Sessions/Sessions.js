import "./Sessions.css"
import PageTitle from "../../shared/PageTitle"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getMovieSesions } from "../../../api"
import LoadingComponent from "../../shared/LoadingComponent"
import Footer from "../../shared/Footer"

export default function Sessions() {
    const [movie, setMovie] = useState("");
    const {idMovie} = useParams();

    useEffect(() => {
        getMovieSesions(idMovie,setMovie);
    }, [])

    if (!movie) {
        return (
            <LoadingComponent />
        )
    }

    return (
        <main className="main-content">
            <PageTitle>Selecione o horário</PageTitle>
            {

                movie.days.map(day => {
                    return <DaySessions 
                        id={day.id} 
                        weekday={day.weekday} 
                        date={day.date} 
                        showtimes={day.showtimes}
                    />
                })
            }
            <Footer posterURL={movie.posterURL} movieTitle={movie.title}/>
        </main>
    )
}

function DaySessions(props) {
    const { 
        weekday,
        date,
        showtimes
    } = props

    return(
        <section className="day-session-container">
            <h3>{`${weekday} - ${date}`}</h3>
            <div className="times">
                {
                    showtimes.map(showtime => (
                        <Link to={`/assentos/${showtime.id}`}>
                            <div className="time">{showtime.name}</div>
                        </Link>
                    ))
                }
            </div>
            
        </section>

    )
}
