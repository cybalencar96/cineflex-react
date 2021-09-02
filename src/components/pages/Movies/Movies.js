import "../Movies/Movies.css"
import vars from "../../../vars"
import { Link } from "react-router-dom"
import Movie from "../../Movie"


export default function Movies() {
    const movies = vars.movies;
    return (
        <main class="movies-page">
            <h2>Selecione o filme</h2>
            <section class="movies-container">
                {
                    movies.map(movie => (
                        <Link to={`/${movie.id}`}>
                            <Movie image={movie.posterURL} title={movie.title}/>
                        </Link>
                    ))
                }
            </section>
        </main>
    )
}

