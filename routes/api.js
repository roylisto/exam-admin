/** Middlewares */
const IsAuthenticated = require('../middlewares/isAuthenticated');

/** Controllers */
const TestController = require('../controllers/test');
const AuthController = require('../controllers/auth');
const user = require('../controllers/user');

module.exports = (router) => {

  router.post('/login', AuthController.login);
  router.get('/test', [IsAuthenticated], TestController.index);

  //users route
  router.get('/users', user.list);
  router.get('/users/:id', user.get);
  router.post('/users', user.create);
  router.put('/users/:id', user.update);
  router.delete('/users/:id', user.delete);

  return router;
}