import { Alert } from '@mui/material'
import React from 'react'

type Props = {
  severity: 'success' | 'error' | 'info' | 'warning';
  message: string;
  onClose: () => void;
}

export function AlertComponent({ severity, message, onClose }: Props) {
  return (
    <Alert severity={severity} onClose={onClose} className='text-base'>
      {message}
    </Alert>
  )
}