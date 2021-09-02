import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Topbar from "./TopBar/Topbar";
import Movies from "./pages/Movies/Movies"
import Sessions from "./pages/Sessions/Sessions"
import SeatsPage from "./pages/SeatsPage/SeatsPage"

export default function App() {
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
                        <SeatsPage />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}