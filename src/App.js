import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './routes';
import Loading from './components/Loading';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";

const AppLayout = styled.div`  
  height: inherit;
`;

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Router>
          <Switch>
            <Suspense fallback={<Loading />}>
              {routes.map((val, key) => (
                <Route
                  key={key}
                  path={val.path}
                  component={val.component}
                  exact={val.exact || false}
                />
              ))}
            </Suspense>
          </Switch>
        </Router>
      </AppLayout>
    )
  }
}

export default App;
