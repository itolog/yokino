import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
};

export type CommentsDto = {
   __typename?: 'CommentsDto',
  id: Scalars['String'],
  created: Scalars['DateTime'],
  text: Scalars['String'],
  movieId: Scalars['String'],
  authorId: Scalars['String'],
};

export type CommentsInput = {
  text: Scalars['String'],
  movieId: Scalars['String'],
  authorId: Scalars['String'],
};

export type CommonType = {
   __typename?: 'CommonType',
  result?: Maybe<Scalars['Boolean']>,
  current_page: Scalars['Int'],
  first_page_url: Scalars['String'],
  from: Scalars['Int'],
  last_page: Scalars['Int'],
  last_page_url?: Maybe<Scalars['String']>,
  next_page_url?: Maybe<Scalars['String']>,
  path: Scalars['String'],
  per_page: Scalars['Int'],
  prev_page_url?: Maybe<Scalars['String']>,
  to: Scalars['Int'],
  total: Scalars['Int'],
  total_count: Scalars['Int'],
};


export type Genres = {
   __typename?: 'Genres',
  id?: Maybe<Scalars['Int']>,
  name?: Maybe<Scalars['String']>,
};

export type GetMovie = {
   __typename?: 'GetMovie',
  id: Scalars['Float'],
  title?: Maybe<Scalars['String']>,
  kp_id?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  add?: Maybe<Scalars['String']>,
  orig_title?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['String']>,
  seasons_count?: Maybe<Scalars['Int']>,
  episodes_count?: Maybe<Scalars['Int']>,
  episodes?: Maybe<Scalars['Int']>,
  update?: Maybe<Scalars['String']>,
  iframe_src?: Maybe<Scalars['String']>,
  media_info?: Maybe<MediaInfo>,
};

export type IdAuthor = {
   __typename?: 'IdAuthor',
  id: Scalars['String'],
};

export type IdComments = {
   __typename?: 'IdComments',
  id: Scalars['String'],
};

export type IdMovie = {
   __typename?: 'IdMovie',
  id: Scalars['String'],
};

export type IdUser = {
   __typename?: 'IdUser',
  id: Scalars['String'],
};

export type ListShort = {
   __typename?: 'ListShort',
  data?: Maybe<Array<Short>>,
};

export type Media = {
   __typename?: 'Media',
  source_quality?: Maybe<Scalars['String']>,
  max_quality?: Maybe<Scalars['Int']>,
  duration?: Maybe<Scalars['Int']>,
  created?: Maybe<Scalars['String']>,
  accepted?: Maybe<Scalars['String']>,
};

export type MediaInfo = {
   __typename?: 'MediaInfo',
  id?: Maybe<Scalars['Int']>,
  title?: Maybe<Scalars['String']>,
  title_en?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['Int']>,
  description?: Maybe<Scalars['String']>,
  poster_url?: Maybe<Scalars['String']>,
  backdrop_path?: Maybe<Scalars['String']>,
  countries?: Maybe<Array<Scalars['String']>>,
  genres?: Maybe<Array<Genres>>,
  rating?: Maybe<Scalars['Float']>,
};

export type Movie = {
   __typename?: 'Movie',
  id?: Maybe<Scalars['Float']>,
  ru_title?: Maybe<Scalars['String']>,
  orig_title?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  kinopoisk_id?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['String']>,
  released?: Maybe<Scalars['String']>,
  updated?: Maybe<Scalars['String']>,
  blocked?: Maybe<Scalars['Float']>,
  preview_iframe_src?: Maybe<Scalars['String']>,
  iframe_src?: Maybe<Scalars['String']>,
  iframe?: Maybe<Scalars['String']>,
  year?: Maybe<Scalars['String']>,
  poster?: Maybe<Scalars['String']>,
  media?: Maybe<Array<Media>>,
};

export type Movies = {
   __typename?: 'Movies',
  result?: Maybe<Scalars['Boolean']>,
  current_page: Scalars['Int'],
  first_page_url: Scalars['String'],
  from: Scalars['Int'],
  last_page: Scalars['Int'],
  last_page_url?: Maybe<Scalars['String']>,
  next_page_url?: Maybe<Scalars['String']>,
  path: Scalars['String'],
  per_page: Scalars['Int'],
  prev_page_url?: Maybe<Scalars['String']>,
  to: Scalars['Int'],
  total: Scalars['Int'],
  total_count: Scalars['Int'],
  data?: Maybe<Array<Movie>>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createComments: CommentsDto,
  deleteComment: IdComments,
  deleteMovieComments: IdMovie,
  deleteAuthorComments: IdAuthor,
  createUser: UsersDto,
  deleteUser: IdUser,
};


export type MutationCreateCommentsArgs = {
  data: CommentsInput
};


export type MutationDeleteCommentArgs = {
  id: Scalars['String']
};


export type MutationDeleteMovieCommentsArgs = {
  id: Scalars['String']
};


export type MutationDeleteAuthorCommentsArgs = {
  id: Scalars['String']
};


export type MutationCreateUserArgs = {
  data: UserInput
};


export type MutationDeleteUserArgs = {
  id: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  login: UserLoginDto,
  getMovieComments: Array<CommentsDto>,
  getMoviesUpdates: Movies,
  getSerialsUpdates: Serials,
  getTvShowsUpdates: Serials,
  searchMedia: Search,
  getMovie: GetMovie,
  listForCarousel: ListShort,
  getAllUsers: Array<UsersDto>,
  finfUser: UsersDto,
};


export type QueryLoginArgs = {
  pass: Scalars['String'],
  username: Scalars['String']
};


export type QueryGetMovieCommentsArgs = {
  movieId: Scalars['String']
};


export type QueryGetMoviesUpdatesArgs = {
  year: Scalars['String'],
  page: Scalars['String']
};


export type QueryGetSerialsUpdatesArgs = {
  year: Scalars['String'],
  page: Scalars['String']
};


export type QueryGetTvShowsUpdatesArgs = {
  year: Scalars['String'],
  page: Scalars['String']
};


export type QuerySearchMediaArgs = {
  title: Scalars['String']
};


export type QueryGetMovieArgs = {
  id: Scalars['String']
};


export type QueryListForCarouselArgs = {
  year: Scalars['String'],
  page: Scalars['String']
};


export type QueryFinfUserArgs = {
  name: Scalars['String']
};

export type Search = {
   __typename?: 'Search',
  movies?: Maybe<Array<Movie>>,
  serials?: Maybe<Array<Serial>>,
};

export type Serial = {
   __typename?: 'Serial',
  id: Scalars['Float'],
  ru_title?: Maybe<Scalars['String']>,
  orig_title?: Maybe<Scalars['String']>,
  imdb_id?: Maybe<Scalars['String']>,
  kinopoisk_id?: Maybe<Scalars['String']>,
  season_count?: Maybe<Scalars['Int']>,
  episode_count?: Maybe<Scalars['Int']>,
  last_episode_id?: Maybe<Scalars['Int']>,
  start_date?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['String']>,
  updated?: Maybe<Scalars['String']>,
  blocked?: Maybe<Scalars['Float']>,
  preview_iframe_src: Scalars['String'],
  iframe_src: Scalars['String'],
  iframe: Scalars['String'],
  poster?: Maybe<Scalars['String']>,
};

export type Serials = {
   __typename?: 'Serials',
  result?: Maybe<Scalars['Boolean']>,
  current_page: Scalars['Int'],
  first_page_url: Scalars['String'],
  from: Scalars['Int'],
  last_page: Scalars['Int'],
  last_page_url?: Maybe<Scalars['String']>,
  next_page_url?: Maybe<Scalars['String']>,
  path: Scalars['String'],
  per_page: Scalars['Int'],
  prev_page_url?: Maybe<Scalars['String']>,
  to: Scalars['Int'],
  total: Scalars['Int'],
  total_count: Scalars['Int'],
  data?: Maybe<Array<Serial>>,
};

export type Short = {
   __typename?: 'Short',
  id?: Maybe<Scalars['Float']>,
  title?: Maybe<Scalars['String']>,
  kp_id?: Maybe<Scalars['String']>,
  poster?: Maybe<Scalars['String']>,
};

export type UserInput = {
  name: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  role?: Maybe<Scalars['String']>,
};

export type UserLoginDto = {
   __typename?: 'UserLoginDto',
  id: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
  banned?: Maybe<Scalars['Boolean']>,
  access_token: Scalars['String'],
};

export type UsersDto = {
   __typename?: 'UsersDto',
  id: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  role?: Maybe<Scalars['String']>,
  banned?: Maybe<Scalars['Boolean']>,
};


