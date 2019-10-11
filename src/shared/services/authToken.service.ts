import { of } from 'rxjs';

class AuthTokenService {
  static token = 'auth-token';

  static getAuthToken() {
    return of(localStorage.getItem(this.token));
  }

  static setAuthToken(token: string) {
    return of(localStorage.setItem(this.token, token));
  }

  static removeAuthToken() {
    return of(localStorage.removeItem(this.token));
  }
}

export default AuthTokenService;