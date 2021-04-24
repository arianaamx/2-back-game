import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import * as colors from "./utils/theme";

import StartPage from "./components/start-page";
import Game from "./components/game";

function App() {
  return (
    <AppWrapper>
      <Router>
        <Switch>
          <Route exact path="/">
            <StartPage />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  height: 100%;
  min-height: 90vh;

  button {
    padding: 5px 20px;
    margin: 5px;
    background-color: ${colors.lighterLilac};
    border: 2px solid ${colors.lilac};
    border-radius: 15px;
    font-size: 20px;
  }
`;
