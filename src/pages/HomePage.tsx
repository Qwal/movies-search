import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { MoviesList } from '../components/MoviesList';
import { Searchbar } from '../components/Searchbar';
import { colors } from '../themeConfig';

const PageTitle = styled.h1`
  color: ${colors.secondary};
`;

export const HomePage = () => (
  <Container maxWidth="md">
    <PageTitle>Search Movies</PageTitle>
    <Searchbar />
    <MoviesList />
  </Container>
);
