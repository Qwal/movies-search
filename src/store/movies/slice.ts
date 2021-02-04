import {
  createSlice,
  createAsyncThunk,
  SerializedError,
} from '@reduxjs/toolkit';
import {
  GetMoviesParams,
  MovieData,
  MoviesService,
} from '../../services/MoviesService';

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (params: GetMoviesParams, { rejectWithValue }) => {
    try {
      const response = await MoviesService.getMovies(params);

      // Handling API responses without data. This should be fixed on API side to return correct status codes in such cases ex. 400 bad request
      if (response.data.Response === 'False') {
        return rejectWithValue(response.data);
      }

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export enum Loading {
  Idle = 'idle',
  Pending = 'pending',
}

export interface MoviesState {
  loading: Loading;
  data: MovieData[];
  total: number;
  error: SerializedError | null;
}

const initialState: MoviesState = {
  loading: Loading.Idle,
  data: [],
  total: 0,
  error: null,
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = Loading.Pending;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = Loading.Idle;
      state.data = action.payload.Search || [];
      state.error = null;
      state.total = parseInt(action.payload.totalResults, 10);
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.loading = Loading.Idle;
      state.data = [];
      state.error = action.error;
    });
  },
});

export default moviesSlice.reducer;
