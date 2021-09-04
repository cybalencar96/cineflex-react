import "./Topbar.css"
import { Link, useHistory } from "react-router-dom"
import styled from "styled-components"



export default function Topbar() {
    const history = useHistory();

    return (
        <header class="topbar">
                <IconContainer onClick={history.goBack}>
                    <ion-icon name="arrow-back-circle-outline"></ion-icon>
                </IconContainer>

            
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