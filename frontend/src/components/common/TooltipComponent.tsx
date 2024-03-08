import React from 'react'
import { Tooltip, Box, Typography } from '@mui/material'

type Props = {
  title: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
  onClick?: () => void;
  children: React.ReactNode;
}

export function TooltipComponent({ title, placement, onClick, children }: Props) {
  return (
    <Tooltip
      title={<Typography style={{ fontSize: '1.2em' }}>{title}</Typography>}
      placement={placement}
      onClick={onClick}
      arrow
      slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, -1],
              },
            },
          ],
        },
      }}>
      <Box>
        {children}
      </Box>
    </Tooltip>
  )
}