import "../Movies/Movies.css"
import { Link } from "react-router-dom"
import Movie from "../../shared/Movie"
import {getMovies} from "../../../api"
import { useState, useEffect } from "react"
import LoadingComponent from "../../shared/LoadingComponent"
import PageTitle from "../../shared/PageTitle"
export default function Movies({setFinalInfos}) {
    const [movies, setMovies] = useState("");

    useEffect(() => {
        setFinalInfos({});
        getMovies(setMovies);
    }, []);

    if (!movies) {
         return (
            <LoadingComponent />
        )
    }

    return (
        <main className="main-content">
            <PageTitle>Selecione o filme</PageTitle>
            <section className="movies-container">
                {
                    movies.map(movie => (
                        <Link to={`/sessoes/${movie.id}`}>
                            <Movie image={movie.posterURL} title={movie.title}/>
                        </Link>
                    ))
                }
            </section>
        </main>
    )
}

