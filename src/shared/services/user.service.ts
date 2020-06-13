import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLoginDto } from '../generated/graphql';

class UserService {
  private user = 'user';

  setUser(user: UserLoginDto) {
    return of(localStorage.setItem(this.user, JSON.stringify(user)));
  }

  getUser() {
    return of(localStorage.getItem(this.user)).pipe(
      map((res) => {
        if (res) {
          return JSON.parse(res);
        }
      }),
    );
  }

  deleteUser() {
    return of(localStorage.removeItem(this.user));
  }
}

export const userService = new UserService();