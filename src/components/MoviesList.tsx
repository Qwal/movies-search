import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { RootState } from '../store';
import { MovieData } from '../services/MoviesService';
import { Loading } from '../store/movies/slice';

const GridContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  overflow: hidden;
  background-color: #2b2b2b;

  > ul {
    width: 100%;
  }
`;

const NoResults = styled.div`
  padding: 40px;
  color: #ffffff;
`;

export const MoviesList = () => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.movies
  );

  return (
    <>
      {loading === Loading.Pending && <LinearProgress />}
      <GridContainer>
        {error?.message && <NoResults>No movies found</NoResults>}
        <GridList cellHeight={180} cols={4}>
          {data.map((movie: MovieData) => (
            <GridListTile key={`${movie.Title}_${movie.Year}`} cols={1}>
              <img src={movie.Poster} alt={movie.Title} />
              <GridListTileBar
                title={movie.Title}
                subtitle={<span>{movie.Year}</span>}
              />
            </GridListTile>
          ))}
        </GridList>
      </GridContainer>
    </>
  );
};
