import Homepage from './containers/Homepage';
import Login from './containers/Onboarding/Login';

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Homepage,
    exact: true,
  }
];

export default routes;
