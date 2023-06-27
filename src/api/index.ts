import 'module-alias/register';
import App from '@/api/app';
import keyConfig from '../config/key.config';
import IndexRoute from '@/api/routes/index/index.routes';
import AuthTeacherRoute from '@/api/routes/teacher/auth.routes';
import AuthStudentRoute from '@/api/routes/student/auth.routes';
import UserStudentRoute from '@/api/routes/student/user.routes';
import CategoryRoutes from '@/api/routes/index/category.routes';
import UserTeacherRoutes from '@/api/routes/teacher/user.routes';
import CertificateRoutes from '@/api/routes/student/certificate.routes';
import PdfRoutes from '@/api/routes/index/certRetrieval.routes';
import ScoreRoute from '@/api/routes/student/score.routes';
import BatchRoute from '@/api/routes/teacher/batch.routes';
import TeacherCertificateRoute from '@/api/routes/teacher/certificate.routes';
import NotificationRoute from '@/api/routes/student/notification.routes';
import ReportRoute from '@/api/routes/teacher/report.routes';
import StudentRoute from '@/api/routes/teacher/student.route';

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
    new ScoreRoute(),
    new BatchRoute(),
    new TeacherCertificateRoute(),
    new NotificationRoute(),
    new ReportRoute(),
    new StudentRoute(),
  ],
  '/api/v1/'
);

if (keyConfig.NODE_ENV !== 'test') app.listen();

export default app.getApp();
