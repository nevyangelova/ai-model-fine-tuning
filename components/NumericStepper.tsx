'use client';

import React from 'react';
import {Box, Typography, TextField, IconButton} from '@mui/material';
import {Add, Remove} from '@mui/icons-material';

interface NumericStepperProps {
    label: string;
    value: number;
    onChange: (value: number) => void;
    error?: string;
    helperText?: string;
    min?: number;
    max?: number;
    step?: number;
}

export default function NumericStepper({
    label,
    value,
    onChange,
    error,
    helperText,
    min = 0,
    max,
    step = 1,
}: NumericStepperProps) {
    const handleIncrement = () => {
        if (max === undefined || value + step <= max) {
            onChange(value + step);
        }
    };

    const handleDecrement = () => {
        if (value - step >= min) {
            onChange(value - step);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseFloat(e.target.value);
        if (!isNaN(newValue)) {
            onChange(newValue);
        }
    };

    return (
        <Box sx={{mb: 3}}>
            <Typography variant='body1' fontWeight={600} gutterBottom>
                {label}
            </Typography>

            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <IconButton
                    onClick={handleDecrement}
                    disabled={value <= min}
                    size='small'
                    sx={{border: '1px solid #e0e0e0', borderRadius: 1}}
                >
                    <Remove fontSize='small' />
                </IconButton>

                <TextField
                    variant='outlined'
                    size='small'
                    value={value}
                    onChange={handleInputChange}
                    error={!!error}
                    sx={{
                        mx: 1,
                        width: 40,
                        textAlign: 'center',
                    }}
                />

                <IconButton
                    onClick={handleIncrement}
                    disabled={max !== undefined && value >= max}
                    size='small'
                    sx={{border: '1px solid #e0e0e0', borderRadius: 1}}
                >
                    <Add fontSize='small' />
                </IconButton>
            </Box>

            {(error || helperText) && (
                <Typography
                    variant='caption'
                    sx={{color: error ? 'error.main' : 'text.secondary'}}
                >
                    {error || helperText}
                </Typography>
            )}
        </Box>
    );
}
