import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
}

export interface MaterialData {
   __typename?: 'MaterialData',
  title?: Maybe<Scalars['String']>,
  title_en?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['Int']>,
  tagline?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  poster_url?: Maybe<Scalars['String']>,
  duration?: Maybe<Scalars['String']>,
  countries?: Maybe<Array<Scalars['String']>>,
  genres?: Maybe<Array<Scalars['String']>>,
  kinopoisk_rating?: Maybe<Scalars['String']>,
  kinopoisk_votes?: Maybe<Scalars['String']>,
  imdb_rating?: Maybe<Scalars['String']>,
  imdb_votes?: Maybe<Scalars['String']>,
  premiere_world?: Maybe<Scalars['String']>,
  actors?: Maybe<Array<Scalars['String']>>,
  directors?: Maybe<Array<Scalars['String']>>,
  producers?: Maybe<Array<Scalars['String']>>,
}

export interface Movie {
   __typename?: 'Movie',
  id?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  title_orig?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  translation?: Maybe<Translation>,
  year?: Maybe<Scalars['Int']>,
  kinopoisk_id?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  quality?: Maybe<Scalars['String']>,
  blocked_countries?: Maybe<Array<Scalars['String']>>,
  created_at?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['String']>,
  material_data?: Maybe<MaterialData>,
}

export interface Movies {
   __typename?: 'Movies',
  total: Scalars['Int'],
  prev_page: Scalars['String'],
  next_page: Scalars['String'],
  results: Array<Movie>,
}

export interface Query {
   __typename?: 'Query',
  getMoviesUpdates: Movies,
  getSerialsUpdates: Serials,
  getMovie: Movie,
  searchMovie: Array<Movie>,
}


export interface QueryGetMoviesUpdatesArgs {
  next: Scalars['String']
}


export interface QueryGetSerialsUpdatesArgs {
  next: Scalars['String']
}


export interface QueryGetMovieArgs {
  id: Scalars['String']
}


export interface QuerySearchMovieArgs {
  title: Scalars['String']
}

export interface Serial {
   __typename?: 'Serial',
  id?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  title_orig?: Maybe<Scalars['String']>,
  link?: Maybe<Scalars['String']>,
  translation?: Maybe<Translation>,
  year?: Maybe<Scalars['Int']>,
  kinopoisk_id?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  quality?: Maybe<Scalars['String']>,
  blocked_countries?: Maybe<Array<Scalars['String']>>,
  created_at?: Maybe<Scalars['String']>,
  updated_at?: Maybe<Scalars['String']>,
  material_data?: Maybe<MaterialData>,
  last_season?: Maybe<Scalars['Int']>,
  last_episode?: Maybe<Scalars['Int']>,
  episodes_count?: Maybe<Scalars['Int']>,
}

export interface Serials {
   __typename?: 'Serials',
  total: Scalars['Int'],
  prev_page: Scalars['String'],
  next_page: Scalars['String'],
  results: Array<Serial>,
}

export interface Translation {
   __typename?: 'Translation',
  id?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
}
