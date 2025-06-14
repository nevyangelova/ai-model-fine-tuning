'use client';

import React from 'react';
import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import {useFormContext} from '@/contexts/FormContext';
import {useModels} from '@/services/api';
import StepNavigation from '@/components/ui/StepNavigation';

export default function SetupStep() {
    const {formData, errors, updateField, nextStep} = useFormContext();
    const {data: models, isLoading, error: apiError} = useModels();

    const isDisabled =
        Object.keys(errors).length > 0 || !formData.name || !formData.baseModel;

    return (
        <Box>
            <Typography variant='h5' fontWeight={600} gutterBottom>
                Set up your run
            </Typography>

            <Box sx={{my: 2}}>
                <TextField
                    fullWidth
                    label='Job name'
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={!!errors.name}
                    helperText={
                        errors.name ||
                        'Can only contain lowercase alphanumeric characters and dashes.'
                    }
                    margin='normal'
                />

                <FormControl
                    fullWidth
                    margin='normal'
                    error={!!errors.baseModel}
                >
                    <InputLabel id='model-select-label'>Base model</InputLabel>
                    <Select
                        labelId='model-select-label'
                        id='model-select'
                        value={formData.baseModel}
                        onChange={(e) =>
                            updateField('baseModel', e.target.value as string)
                        }
                        label='Base model'
                    >
                        {isLoading ? (
                            <MenuItem disabled>Loading models...</MenuItem>
                        ) : apiError ? (
                            <MenuItem disabled>Error loading models</MenuItem>
                        ) : (
                            models?.map((model) => (
                                <MenuItem key={model.id} value={model.id}>
                                    {model.displayName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                    {errors.baseModel ? (
                        <FormHelperText>{errors.baseModel}</FormHelperText>
                    ) : (
                        <FormHelperText>
                            Select a base model to fine-tune
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>

            <StepNavigation
                onNext={nextStep}
                nextLabel='Next: Configure'
                isLoading={isLoading}
                loadingText='Loading models...'
                disabled={isDisabled}
            />
        </Box>
    );
}
