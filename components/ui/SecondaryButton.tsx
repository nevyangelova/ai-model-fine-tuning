'use client';

import React from 'react';
import {Button, ButtonProps} from '@mui/material';

type SecondaryButtonProps = Omit<ButtonProps, 'variant'>;

export default function SecondaryButton({
    children,
    sx,
    ...rest
}: SecondaryButtonProps) {
    return (
        <Button
            variant='outlined'
            sx={{
                borderColor: '#000',
                color: '#000',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: '#000',
                    color: '#fff',
                },
                ...sx,
            }}
            {...rest}
        >
            {children}
        </Button>
    );
}
