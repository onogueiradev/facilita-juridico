import React from 'react';
import { Grid, InputLabel, TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export function InputComponent({ label, value, onChange }: Props) {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel>{label}</InputLabel>
      <TextField
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
      />
    </Grid>
  );
};
