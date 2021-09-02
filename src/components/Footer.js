import Movie from "./Movie"

export default function Footer({posterURL,movieTitle,session}) {
    return (
        <footer className="footer">
            <Movie local="footer" image={posterURL}/>
            <div className="footer-movie-infos">
                <h3>{movieTitle}</h3>
                {!!session ? <h3>{session}</h3> : ""}
            </div>
        </footer>
    )
}