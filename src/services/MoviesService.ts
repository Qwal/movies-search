import axios, { AxiosResponse } from 'axios';

const MOVIES_API_URL = process.env.REACT_APP_OMDB_API_URL || '';

export interface GetMoviesParams {
  s: string; // Movie title to search for
  y?: number; // Year of release
  p?: number; // Page number to return
}

export interface MovieData {
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
  imdbID: string;
}

interface MoviesResponse {
  Response: 'True' | 'False';
  Search?: MovieData[];
  totalResults: string;
}

export const MoviesService = {
  getMovies: function (
    params: GetMoviesParams
  ): Promise<AxiosResponse<MoviesResponse>> {
    return axios.get(MOVIES_API_URL, {
      params: {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        type: 'movie', // we want movies only as this was business requirement
        ...params,
      },
    });
  },
};
