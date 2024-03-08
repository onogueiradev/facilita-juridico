import React from 'react';
import { Grid, InputLabel, TextField } from '@mui/material';

type Props = {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  sm?: number;
  type?: string;
}

export function InputComponent({ label, value, onChange, placeholder, sm = 4, type = 'text' }: Props) {
  return (
    <Grid item xs={12} sm={sm}>
      <InputLabel>{label}</InputLabel>
      <TextField
        size='small'
        type={type}
        inputProps={{
          autocomplete: 'new-password',
          form: {
            autocomplete: 'off',
          },
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        placeholder={placeholder}
      />
    </Grid>
  );
};
