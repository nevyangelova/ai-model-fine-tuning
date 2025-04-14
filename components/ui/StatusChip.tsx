'use client';

import React from 'react';
import {Chip, ChipProps} from '@mui/material';

interface StatusChipProps extends Omit<ChipProps, 'color'> {
    status: string;
}

export default function StatusChip({
    status,
    size = 'small',
    variant = 'outlined',
    ...rest
}: StatusChipProps) {
    const getStatusColor = (
        status: string
    ): 'success' | 'primary' | 'error' | 'default' => {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'Running':
                return 'primary';
            case 'Failed':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Chip
            label={status}
            color={getStatusColor(status)}
            size={size}
            variant={variant}
            {...rest}
        />
    );
}
