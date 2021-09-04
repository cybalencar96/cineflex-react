import "./Topbar.css"
import { Link, useHistory, useLocation } from "react-router-dom"
import styled from "styled-components"



export default function Topbar() {
    const history = useHistory();
    const location = useLocation();

    return (
        <header class="topbar">
            {
                //hook para retornar a rota atual
                location.pathname === "/" ?
                "" :
                //hook goBack para retornar a ultima rota
                <IconContainer onClick={history.goBack}>
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </IconContainer>
            }
            <Link to="/">
                <h1>CINEFLEX</h1>
            </Link>
        </header>
    )
}

const IconContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width:67px;
    height: 67px;

    font-size: 34px;
    color: #E8833A;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
`