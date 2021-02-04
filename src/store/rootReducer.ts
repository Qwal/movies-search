import { combineReducers } from 'redux';
import moviesReducer from './movies/slice';

const rootReducer = combineReducers({
  movies: moviesReducer,
});

export default rootReducer;
