'use client';

import React from 'react';
import {Button, ButtonProps, CircularProgress} from '@mui/material';

interface PrimaryButtonProps extends Omit<ButtonProps, 'variant'> {
    isLoading?: boolean;
    loadingText?: string;
}

export default function PrimaryButton({
    children,
    isLoading = false,
    loadingText,
    disabled,
    sx,
    ...rest
}: PrimaryButtonProps) {
    return (
        <Button
            variant='contained'
            disabled={disabled || isLoading}
            sx={{
                backgroundColor: '#000',
                borderRadius: '4px',
                '&:hover': {
                    backgroundColor: '#333',
                },
                '&.Mui-disabled': {
                    backgroundColor: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                    boxShadow: 'none',
                    pointerEvents: 'none',
                    opacity: 0.7,
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
