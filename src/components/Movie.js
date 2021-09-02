export default function Movie({image, local}) {

    return (
        <article className={"movie-container " + (local === "footer" ? "movie-footer" : "" )}>
            <img src={image} alt=""/>
        </article>
    )
}