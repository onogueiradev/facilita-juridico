import React from 'react';
import Button from '@mui/material/Button';
import { Skeleton } from '@mui/material';

import { useStore } from '@/store/store';

type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function ButtonComponent({ onClick, children, className = 'text-gray-600 hover:bg-indigo-500 hover:text-white' }: Props) {
  const { isLoading } = useStore();
  return (
    isLoading
      ? <Skeleton variant="text" className='w-28' height={70} />
      : <Button
        variant="contained"
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
  );
}
