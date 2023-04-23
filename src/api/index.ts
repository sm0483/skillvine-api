import App from './app';
import keyConfig from '../config/key.config';
import IndexRoute from './routes/index/index.routes';
import AuthTeacherRoute from './routes/teacher/auth.routes';
import AuthStudentRoute from './routes/student/auth.routes';
import UserStudentRoute from './routes/student/user.routes';
import CategoryRoutes from './routes/index/category.routes';
import UserTeacherRoutes from './routes/teacher/user.routes';
import CertificateRoutes from './routes/student/certificate.routes';
import PdfRoutes from './routes/index/certRetrieval.routes';

const app = new App(
  [
    new IndexRoute(),
    new CategoryRoutes(),
    new AuthTeacherRoute(),
    new AuthStudentRoute(),
    new UserStudentRoute(),
    new UserTeacherRoutes(),
    new CertificateRoutes(),
    new PdfRoutes(),
  ],
  '/api/v1/'
);

if (keyConfig.NODE_ENV !== 'test') app.listen();

export default app.getApp();
