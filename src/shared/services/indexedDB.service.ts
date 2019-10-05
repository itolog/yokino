import Dexie from 'dexie';
import { FavoriteMovies } from '../interface/favorite-movies';

class MyAppDatabase extends Dexie {
  public movies: Dexie.Table<FavoriteMovies, number>;

  constructor() {
    super('FavoritesMovies');

    this.version(1).stores({
      movies: '++id, title, poster, kinopoisk_id',
    });

    this.movies = this.table('movies');
  }

  save(payload: FavoriteMovies) {
    return this.movies.add(payload);
  }

  remove(id: string) {
    return this.movies
      .where('kinopoisk_id')
      .equals(id)
      .delete();
  }
}

export default new MyAppDatabase();
