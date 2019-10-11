import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserLoginDto } from '../generated/graphql';

class UserService {
  static user = 'user';

  static setUser(user: UserLoginDto) {
    return of(localStorage.setItem(this.user, JSON.stringify(user)));
  }

  static getUser() {
    return of(localStorage.getItem(this.user)).pipe(
      map((res) => {
        if (res) {
          return JSON.parse(res);
        }
      }),
    );
  }

  static deleteUser() {
    return of(localStorage.removeItem(this.user));
  }
}

export default UserService;