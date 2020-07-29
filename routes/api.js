/** Middlewares */
const IsAuthenticated = require('../middlewares/isAuthenticated');

/** Controllers */
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const AdminController = require('../controllers/admin');

module.exports = (router) => {

  router.post('/login', AuthController.login);
  // router.get('/test', [IsAuthenticated], TestController.index);

  //users route
  router.get('/users', UserController.list);
  router.get('/users/:id', UserController.get);
  router.post('/users', UserController.create);
  router.put('/users/:id', UserController.update);
  router.delete('/users/:id', UserController.delete);

  //admin account route
  router.get('/admin', AdminController.list);
  router.get('/admin/:id', AdminController.get);
  router.post('/admin', AdminController.create);
  router.put('/admin/:id', AdminController.update);
  router.delete('/admin/:id', AdminController.delete);

  return router;
}