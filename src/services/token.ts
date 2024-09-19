import {verify, sign, JwtPayload, Secret} from 'jsonwebtoken';
import type {TokenPayload} from '@/types/token.types.ts';

export class Token {
  private secret: Secret = '';
  public async verifyToken(token: string) {
    return new Promise((resolve, reject) => {
      verify(token, this.secret, {}, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded as JwtPayload);
      });
    });
  }
  public generateToken(payload: TokenPayload) {
    const {expires, id, fullName, email} = payload;
    return new Promise((resolve, reject) => {
      sign({}, this.secret, {expiresIn: expires}, (error, encoded) => {
        if (error) reject(error);
        resolve(encoded as string);
      });
    });
  }
}
