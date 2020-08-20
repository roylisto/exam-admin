/** Middlewares */
const IsAuthenticated = require('../middlewares/isAuthenticated');

/** Controllers */
const AuthController = require('../controllers/auth');
const UserController = require('../controllers/user');
const AdminController = require('../controllers/admin');
const download = require('../controllers/download');
const multer = require('../middlewares/multer.js');
const file = require('../controllers/file');
const user = require('../controllers/user.js');
const peserta = require('../controllers/peserta.js');
const jadwalTest = require('../controllers/jadwalTest.js');
const hasil = require('../controllers/hasil.js');

module.exports = (router) => {

  router.post('/login', AuthController.login);
  // router.get('/test', [IsAuthenticated], TestController.index);

  //users route
  router.get('/users', [IsAuthenticated] , UserController.list);
  router.get('/users/:id', [IsAuthenticated], UserController.get);
  router.post('/users', [IsAuthenticated], UserController.create);
  router.put('/users/:id', [IsAuthenticated], UserController.update);
  router.delete('/users/:id', [IsAuthenticated], UserController.delete);
  router.post('/users/peserta/', [IsAuthenticated], UserController.userPeserta);
  router.post('/users/excel', [IsAuthenticated], multer.single('user'), user.import);
  
  //admin account route
  router.get('/admin', [IsAuthenticated], AdminController.list);
  router.get('/admin/:id', [IsAuthenticated], AdminController.get);
  router.post('/admin', [IsAuthenticated], AdminController.create);
  router.put('/admin/:id', [IsAuthenticated], AdminController.update);
  router.delete('/admin/:id', [IsAuthenticated], AdminController.delete);
  router.post('/admin/reset-password', [IsAuthenticated], AdminController.reset_password);

  //peserta route
  router.get('/peserta', [IsAuthenticated], peserta.list);
  router.get('/peserta/:id', [IsAuthenticated], peserta.get);
  router.put('/peserta/:id', [IsAuthenticated], peserta.update);
  router.get('/peserta/test/:id', [IsAuthenticated], peserta.getList); //list get peserta with params id jadwal test
  router.post('/peserta', [IsAuthenticated], peserta.create);
  router.delete('/peserta/:id', [IsAuthenticated], peserta.delete);

  //route jadwal test
  router.get('/jadwal-test', [IsAuthenticated], jadwalTest.list);
  router.get('/jadwal-test/:id', [IsAuthenticated], jadwalTest.get);
  router.post('/jadwal-test', [IsAuthenticated], jadwalTest.create);
  router.put('/jadwal-test/:id', [IsAuthenticated], jadwalTest.update);
  router.delete('/jadwal-test/:id', [IsAuthenticated], jadwalTest.delete);

  //route hasil
  router.get('/hasil-test/:id', [IsAuthenticated], hasil.list);
  router.get('/jawaban-test/:id', [IsAuthenticated], hasil.list_jawaban);
  router.get('/peserta-test/:id', [IsAuthenticated], hasil.list_peserta);

  //download
  router.get('/download', [IsAuthenticated], download.get);

  //delete files
  router.delete('/files', [IsAuthenticated], file.hasil);
  router.delete('/uploads', [IsAuthenticated], file.uploads);

  router.get('/test', (req, res) => {
    res.send('test ci/cd');
  });

  return router;
}