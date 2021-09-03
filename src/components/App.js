import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
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
            <Topbar/>

            <Router>
                <Switch>
                    <Route path="/" exact>
                        <Movies />
                    </Route>

                    <Route path="/sessoes/:idMovie" exact>
                        <Sessions />
                    </Route>

                    <Route path="/assentos/:idSession" exact>
                        <SeatsPage setFinalInfos={setFinalInfos}/>
                    </Route>

                    <Route path="/sucesso" exact>
                        <SuccessPage finalInfos={finalInfos}/>
                    </Route>
                </Switch>
            </Router>
        </>
    )
}