import { lazy } from 'react'

const Dashboard = lazy(()=> import("./containers/Dashboard"));
const Login = lazy(()=> import("./containers/Onboarding/Login"));

const routes = [
  {
    path: '/',
    component: Login,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    requiredAuth: true
  }
];

export default routes;
