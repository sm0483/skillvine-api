import App from './app';
import keyConfig from '../config/key.config';
import IndexRoute from './routes/index.routes';

const app = new App(
  [
    new IndexRoute(),
  ],
  '/api/v1/'
);

if (keyConfig.NODE_ENV !== 'test') app.listen();

export default app.getApp();
