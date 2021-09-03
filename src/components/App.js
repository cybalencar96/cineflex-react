import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom"
import Topbar from "./TopBar/Topbar";
import Movies from "./pages/Movies/Movies"
import Sessions from "./pages/Sessions/Sessions"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { useState } from "react";
export default function App() {

    const [finalInfos,setFinalInfos] = useState({});
    return (
        <>
            <Router>
                <Topbar/>

                <Switch>
                    <Route path="/" exact>
                        <Movies setFinalInfos={setFinalInfos}/>
                    </Route>

                    <Route path="/sessoes/:idMovie" exact>
                        <Sessions />
                    </Route>

                    <Route path="/assentos/:idSession" exact>
                        <SeatsPage setFinalInfos={setFinalInfos}/>
                    </Route>

                    <Route path="/sucesso" exact>
                        {finalInfos.movieName ? <SuccessPage finalInfos={finalInfos}/> : <Redirect to="/"/>}
                    </Route>
                </Switch>
            </Router>
        </>
    )
}