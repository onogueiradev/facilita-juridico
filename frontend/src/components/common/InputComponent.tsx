import React from 'react';
import { Grid, InputLabel, TextField, Skeleton } from '@mui/material';

import { useStore } from '@/store/store';

type Props = {
  label: string;
  value: string | number | undefined;
  onChange: (value: string) => void;
  placeholder?: string;
  sm?: number;
  type?: string;
}

export function InputComponent({ label, value, onChange, placeholder, sm = 4, type = 'text' }: Props) {
  const { isLoading } = useStore();
  return (
    <Grid item xs={12} sm={sm}>
      {isLoading
        ? <Skeleton variant="text" className='w-full' height={70} /> :
        <>
          <InputLabel>{label}</InputLabel>
          <TextField
            size='small'
            type={type}
            inputProps={{
              autoComplete: 'new-password',
              form: {
                autoComplete: 'off',
              },
            }}
            value={value ?? ''}
            onChange={(e) => onChange(e.target.value)}
            fullWidth
            placeholder={placeholder}
          />
        </>
      }
    </Grid>
  );
};
