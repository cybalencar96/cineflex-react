import Movie from "./Movie"

export default function Footer({posterURL,movieTitle,weekday,time}) {
    return (
        <footer className="footer">
            <Movie local="footer" image={posterURL}/>
            <div className="footer-movie-infos">
                <h3>{movieTitle}</h3>
                {!!weekday ? <h3>{weekday} - {time}</h3> : ""}
            </div>
        </footer>
    )
}