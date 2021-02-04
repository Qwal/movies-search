import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button, Grid } from '@material-ui/core';

import { fetchMovies } from '../store/movies/slice';

const StyledForm = styled.form`
  display: flex;
  padding: 20px 16px;
  background-color: #ffffff;
  margin-bottom: 16px;
  border-radius: 4px;
`;

const schema = yup.object().shape({
  Title: yup.string().required().min(3),
  Year: yup
    .number()
    .integer('Year should be in format YYYY')
    .min(1895)
    .max(new Date().getFullYear())
    .nullable()
    .transform((value, originalValue) =>
      String(originalValue).trim() === '' ? null : value
    ),
});

interface FormValues {
  Title: string;
  Year: number;
}

export const Searchbar = () => {
  const dispatch = useDispatch();

  const { handleSubmit, register, errors } = useForm({
    mode: 'onTouched',
    defaultValues: { Title: '', Year: undefined },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback(
    (values: FormValues) =>
      dispatch(
        fetchMovies({
          s: values.Title,
          y: values.Year,
        })
      ),
    [dispatch]
  );

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={7}>
          <TextField
            size="small"
            variant="outlined"
            inputRef={register}
            label="Title"
            name="Title"
            fullWidth
            error={Boolean(errors.Title)}
            helperText={errors.Title?.message}
          />
        </Grid>
        <Grid item xs={3}>
          <TextField
            size="small"
            variant="outlined"
            inputRef={register}
            label="Year (optional)"
            name="Year"
            fullWidth
            error={Boolean(errors.Year)}
            helperText={errors.Year?.message}
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" color="secondary" variant="contained" fullWidth>
            Search
          </Button>
        </Grid>
      </Grid>
    </StyledForm>
  );
};
