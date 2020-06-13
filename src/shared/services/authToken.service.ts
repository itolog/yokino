import { of } from 'rxjs';

class AuthTokenService {
  private token = 'auth-token';

  getAuthToken() {
    return of(localStorage.getItem(this.token));
  }

  setAuthToken(token: string) {
    return of(localStorage.setItem(this.token, token));
  }

  removeAuthToken() {
    return of(localStorage.removeItem(this.token));
  }
}

export const authTokenService = new AuthTokenService();