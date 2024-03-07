import React from 'react';
import { Grid, InputLabel, MenuItem, Select } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  options: number[];
}

export function CoordinateSelect({ label, value, onChange, options }: Props) {
  return (
    <Grid item xs={12} sm={6}>
      <InputLabel id="coordinate-label">{label}</InputLabel>
      <Select
        labelId="coordinate-label"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        fullWidth
        placeholder='Selecione'
        defaultValue='Selecione'
      >
        {options.map((option) => (
          <MenuItem key={option} value={option}>{option}</MenuItem>
        ))}
      </Select>
    </Grid>
  );
};
