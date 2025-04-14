'use client';

import React from 'react';
import {Box, CircularProgress, Typography} from '@mui/material';

interface LoadingStateProps {
    error?: unknown;
    isEmpty?: boolean;
    emptyMessage?: string;
    isLoading: boolean;
    children: React.ReactNode;
}

export default function LoadingState({
    error,
    isEmpty = false,
    emptyMessage = 'No data available',
    isLoading,
    children,
}: LoadingStateProps) {
    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 4,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color='error'>
                Error loading data: {String(error)}
            </Typography>
        );
    }

    if (isEmpty) {
        return (
            <Box sx={{textAlign: 'center', p: 4}}>
                <Typography color='text.secondary'>{emptyMessage}</Typography>
            </Box>
        );
    }

    return <>{children}</>;
}
