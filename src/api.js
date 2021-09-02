import axios from "axios";

const GET_MOVIES_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies"
const GET_SESSIONS_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes`

function getMovies(setState) {
    axios
    .get(GET_MOVIES_URL)
    .then( res => {
        console.log(res.data)
        return setState(res.data);
    })
    .catch( err => {
        console.log(err);
        return setState(null);
    })
}

function getMovieSesions(idMovie) {
    axios
    .get(`${GET_MOVIES_URL}/${idMovie}/showtimes`)
    .then( res => {
        console.log(res.data)
        return res.data;
    })
    .catch( err => {
        console.log(err);
        return null;
    })
}

function getSessionSeats(idSession) {
    axios
    .get(`${GET_SESSIONS_URL}/${idSession}/seats`)
    .then( res => {
        console.log(res.data)
        return res.data;
    })
    .catch( err => {
        console.log(err);
        return null;
    })
}

export {
    getMovies,
    getMovieSesions,
    getSessionSeats
}