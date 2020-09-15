import React, { Component, Suspense } from 'react';
import styled from 'styled-components';
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import routes from './routes';
import { connect } from 'react-redux';
import { dispatch } from "./store";
// ASSETS 
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import 'react-notifications/lib/notifications.css';
// COMPONENTS
import Loading from './components/Loading';
import ProtectedRoute from './modules/ProtectedRoute'

const AppLayout = styled.div`  
  height: inherit;
`;

dispatch.admin.updatetoken(localStorage.getItem('token'));
dispatch.admin.updateRole(localStorage.getItem('role'));
dispatch.admin.updateUsername(localStorage.getItem('username'));

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
