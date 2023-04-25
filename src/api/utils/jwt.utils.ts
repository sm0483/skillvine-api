import jwt from 'jsonwebtoken';
import ITokenResponse from '@/api/interfaces/ITokenResponse.interfaces';

class JwtOperation {
  public createJwt(payload: object, expiresIn: string, key: string): string {
    const token = jwt.sign({ payload }, key, {
      expiresIn: expiresIn,
    });
    return token;
  }

  public isTokenValid(token: string, key: string): boolean | ITokenResponse {
    try {
      const response = jwt.verify(token, key);
      return response;
    } catch (err) {
      return false;
    }
  }
}

export default JwtOperation;
