import "../Movies/Movies.css"
import { Link } from "react-router-dom"
import Movie from "../../Movie"
import {getMovies} from "../../../api"
import { useState, useEffect } from "react"
import LoadingComponent from "../../LoadingComponent"

export default function Movies() {

    const [movies, setMovies] = useState("");

    useEffect(() => {
        getMovies(setMovies)
        console.log(movies)
    }, []);

    if (!movies) {
         return (
            <LoadingComponent />
        )
    }

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

