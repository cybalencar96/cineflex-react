import {BrowserRouter as Router, Route, Switch} from "react-router-dom"
import Topbar from "./TopBar/Topbar";
import Movies from "./pages/Movies/Movies"
import Sessions from "./pages/Sessions/Sessions"

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
                </Switch>
            </Router>
        </>
    )
}