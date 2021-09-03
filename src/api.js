import axios from "axios";

const GET_MOVIES_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/movies"
const GET_SESSIONS_URL = `https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/showtimes`
const POST_SEATS_URL = "https://mock-api.bootcamp.respondeai.com.br/api/v3/cineflex/seats/book-many"

function getMovies(setState) {
    axios
    .get(GET_MOVIES_URL)
    .then( res => {
        return setState(res.data);
    })
    .catch( err => {
        console.log(err);
        return setState(null);
    })
}

function getMovieSesions(idMovie,setState) {
    axios
    .get(`${GET_MOVIES_URL}/${idMovie}/showtimes`)
    .then( res => {
        return setState(res.data);
    })
    .catch( err => {
        console.log(err);
        return setState(null);
    })
}

function getSessionSeats(idSession, setState) {
    axios
    .get(`${GET_SESSIONS_URL}/${idSession}/seats`)
    .then( res => {
        console.log(res.data)
        return setState(res.data);
    })
    .catch( err => {
        console.log(err);
        return setState(null);
    })
}

function postSeats(seatsObj) {
    console.log(seatsObj)
    axios
    .post(POST_SEATS_URL, seatsObj)
    .then(() => {
        return true;
    })
    .catch (err => {
        console.log(err);
        return false;
    })
}

export {
    getMovies,
    getMovieSesions,
    getSessionSeats,
    postSeats
}