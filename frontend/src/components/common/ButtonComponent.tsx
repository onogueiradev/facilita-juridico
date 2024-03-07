import React from 'react';
import Button from '@mui/material/Button';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ButtonComponent({ onClick, children, className = 'text-gray-600 hover:bg-indigo-500 hover:text-white' }: Props) {
  return (
    <Button
      variant="contained"
      className={className}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
