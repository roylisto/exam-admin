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
  router.get('/users', [IsAuthenticated] , UserController.list);
  router.get('/users/:id', [IsAuthenticated], UserController.get);
  router.post('/users', [IsAuthenticated], UserController.create);
  router.put('/users/:id', [IsAuthenticated], UserController.update);
  router.delete('/users/:id', [IsAuthenticated], UserController.delete);

  //admin account route
  router.get('/admin', [IsAuthenticated], AdminController.list);
  router.get('/admin/:id', [IsAuthenticated], AdminController.get);
  router.post('/admin', [IsAuthenticated], AdminController.create);
  router.put('/admin/:id', [IsAuthenticated], AdminController.update);
  router.delete('/admin/:id', [IsAuthenticated], AdminController.delete);

  return router;
}