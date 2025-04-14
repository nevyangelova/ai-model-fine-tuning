'use client';

import React from 'react';
import {Button, ButtonProps, CircularProgress} from '@mui/material';

interface SecondaryButtonProps extends Omit<ButtonProps, 'variant'> {
    isLoading?: boolean;
    loadingText?: string;
}

export default function SecondaryButton({
    children,
    isLoading = false,
    loadingText,
    disabled,
    sx,
    ...rest
}: SecondaryButtonProps) {
    return (
        <Button
            variant='outlined'
            disabled={disabled || isLoading}
            sx={{
                borderColor: '#000',
                color: '#000',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: '#000',
                    color: '#fff',
                },
                '&.Mui-disabled': {
                    borderColor: 'rgba(0, 0, 0, 0.26)',
                    color: 'rgba(0, 0, 0, 0.26)',
                },
                ...sx,
            }}
            {...rest}
        >
            {isLoading ? (
                <>
                    <CircularProgress size={20} color='inherit' sx={{mr: 1}} />
                    {loadingText || 'Loading...'}
                </>
            ) : (
                children
            )}
        </Button>
    );
}
