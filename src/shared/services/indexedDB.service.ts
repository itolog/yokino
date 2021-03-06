import Dexie from 'dexie';
import { FavoriteMovies } from '../interface/favorite-movies';

class MyAppDatabase extends Dexie {
  public movies: Dexie.Table<FavoriteMovies, number>;

  constructor() {
    super('FavoritesMovies');

    this.version(1).stores({
      movies: '++id, title, poster, id',
    });

    this.movies = this.table('movies');
  }

  save(payload: FavoriteMovies) {
    return this.movies.add(payload);
  }

  remove(id: number) {
    return this.movies
      .where('id')
      .equals(id)
      .delete();
  }

  async getAll() {
    return await this.movies.toArray();
  }
}

export default new MyAppDatabase();
