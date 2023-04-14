import App from './app';
import keyConfig from '../config/key.config';
import IndexRoute from './routes/index/index.routes';
import AuthTeacherRoute from './routes/teacher/auth.routes';

const app = new App([new IndexRoute(), new AuthTeacherRoute()], '/api/v1/');

if (keyConfig.NODE_ENV !== 'test') app.listen();

export default app.getApp();
