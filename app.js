require('dotenv').config();

const path = require('path');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./database/models');
const apiRoutes = require('./routes/api');
const webpack = require('webpack');
const webpackConfig = require('./webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const compiler = webpack(webpackConfig);
const swaggerUi = require('swagger-ui-express');
swaggerDocument = require('./swagger.json');

const app = express();

const env = process.env.NODE_ENV;
const port = process.env.PORT;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api', apiRoutes(express.Router()));

if (env === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      modules: false,
    },
  }));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

if (env === 'production') {
  require('newrelic');
}

app.use((req, res) => {
  return res.status(404).send('not found');
});

app.get('*', (req, res, next) => {
  if (env === 'development') {
    const filename = path.resolve(compiler.outputPath, 'index.html');
    return compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) return next(err);
      return res.set('content-type','text/html').send(result).end();
    });
  }
  return res.sendFile(path.resolve(__dirname, 'dist') + '/index.html');
});

app.set('port', port);
const server = http.createServer(app);

db.sequelize.authenticate()
  .then(() => server.listen(port, () => console.log(`env: ${env}\nport: ${port}`)))
  .catch(() => console.log('sequelize error'));
