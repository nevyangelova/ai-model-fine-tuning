'use client';

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
            <Typography variant='body1' gutterBottom>
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
                    value={value}
                    onChange={handleInputChange}
                    type='number'
                    variant='outlined'
                    size='small'
                    error={!!error}
                    helperText={error || helperText}
                    sx={{mx: 1, width: 70, textAlign: 'center'}}
                    inputProps={{
                        style: {textAlign: 'center'},
                        min,
                        max,
                        step,
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
        </Box>
    );
}
