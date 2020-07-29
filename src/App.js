import React, { Component } from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './routes';

const AppLayout = styled.div`  
  height: inherit;
`;

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Router>
          <Switch>
            {routes.map((val, key) => (
              <Route
                key={key}
                path={val.path}
                component={val.component}
                exact={val.exact || false}
              />
            ))}
          </Switch>
        </Router>
      </AppLayout>
    )
  }
}

export default App;
