import { lazy } from 'react'

const Homepage = lazy(()=> import("./containers/Homepage"));
const Login = lazy(()=> import("./containers/Onboarding/Login"));

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
