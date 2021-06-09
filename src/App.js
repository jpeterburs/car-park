import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import Home from "./screens/Home";
import Einfahrt from "./screens/Einfahrt";
import Ausfahrt from "./screens/Ausfahrt";

export default function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Einfahrt">Einfahrt</Link>
            </li>
            <li>
              <Link to="/Ausfahrt">Ausfahrt</Link>
            </li>
          </ul>
        </nav> */}

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/Einfahrt">
            <Einfahrt />
          </Route>
          <Route path="/Ausfahrt">
            <Ausfahrt />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

