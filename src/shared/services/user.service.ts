import { of } from 'rxjs';

class UserService {
   static user = 'user';
  static setUser(user: ) {
    return of(localStorage.setItem(this.user, user))
  }
}

export default UserService;