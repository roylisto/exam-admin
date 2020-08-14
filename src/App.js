import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './routes';
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import { connect } from 'react-redux';
import store from "./store";
// COMPONENTS
import Loading from './components/Loading';
import ProtectedRoute from './js/ProtectedRoute'

const AppLayout = styled.div`  
  height: inherit;
`;

store.dispatch.admin.updatetoken({token : localStorage.getItem('token')});

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Router>
          <Switch>
            <Suspense fallback={<Loading />}>
              {
                routes.map((val, key) => (
                  (val.requiredAuth) ? 
                  <ProtectedRoute 
                    key={key}
                    path={val.path}
                    component={val.component}
                    exact={val.exact || false} 
                    token={this.props.token}
                  /> : 
                  <Route
                    key={key}
                    path={val.path}
                    component={val.component}
                    exact={val.exact || false}
                  />
                ))
              }
            </Suspense>
          </Switch>
        </Router>
      </AppLayout>
    )
  }
}

const mapState = state => ({
	token: state.admin.token,
})

export default connect(mapState)(App)
