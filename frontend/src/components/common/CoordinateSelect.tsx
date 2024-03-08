import React from 'react';
import { Grid, InputLabel, MenuItem, Select, Skeleton } from '@mui/material';

import { useStore } from '@/store/store';

type Props = {
  label: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  options: number[];
}

export function CoordinateSelect({ label, value, onChange, options }: Props) {
  const { isLoading } = useStore();
  return (
    <Grid item xs={12} sm={6}>
      {isLoading ? <Skeleton variant="text" className='w-full' height={70} /> :
        <>
          <InputLabel id="coordinate-label">{label}</InputLabel>
          <Select
            labelId="coordinate-label"
            size='small'
            value={value}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
          >
            {options.map((option) => (
              <MenuItem key={option} value={option}>{option}</MenuItem>
            ))}
          </Select>
        </>
      }
    </Grid>
  );
};
