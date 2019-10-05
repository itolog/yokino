import { FavoriteMovies } from '../../shared/interface/favorite-movies';

export interface FavoriteState {
  movies: FavoriteMovies[] | [];
  error: any;
  ids: string[] | [];
}
