import { OAuth2Client } from 'google-auth-library';
import Auth from '../../config/key.config';

class Auth2Client {
  public studentOauth2Client = new OAuth2Client(
    Auth.GOOGLE_CLIENT_ID,
    Auth.GOOGLE_CLIENT_SECRET,
    Auth.GOOGLE_REDIRECT_URI_STUDENT
  );
  public teacherOauth2Client = new OAuth2Client(
    Auth.GOOGLE_CLIENT_ID,
    Auth.GOOGLE_CLIENT_SECRET,
    Auth.GOOGLE_REDIRECT_URI_TEACHER
  );
}

export default Auth2Client;
