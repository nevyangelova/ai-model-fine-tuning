'use client';

import React from 'react';
import {Box, Typography, TextField, Stack} from '@mui/material';
import {useFormContext} from '@/contexts/FormContext';
import NumericStepper from '@/components/NumericStepper';
import StepNavigation from '@/components/ui/StepNavigation';

export default function ConfigureStep() {
    const {formData, errors, updateField, nextStep, prevStep} =
        useFormContext();

    return (
        <Box>
            <Typography variant='h5' fontWeight={600} gutterBottom>
                Configure your run
            </Typography>
            <Typography variant='body2' color='text.secondary' paragraph>
                Adjust these parameters to control how your model learns,
                balances performance, and prevents overfitting during
                fine-tuning. See the docs for guidance on setting these
                parameters for optimal fine-tuning.
            </Typography>

            <Stack
                direction={{xs: 'column', md: 'row'}}
                spacing={4}
                sx={{mt: 4}}
            >
                <Box sx={{flex: 1}}>
                    <NumericStepper
                        label='Epochs'
                        value={formData.epochs}
                        onChange={(value) => updateField('epochs', value)}
                        error={errors.epochs}
                        helperText='Number of times the model sees the full dataset during training'
                        min={1}
                    />

                    <NumericStepper
                        label='Evaluation Epochs'
                        value={formData.evaluationEpochs}
                        onChange={(value) =>
                            updateField('evaluationEpochs', value)
                        }
                        error={errors.evaluationEpochs}
                        helperText='How often the model is evaluated during training'
                        min={0}
                    />
                </Box>

                <Box sx={{flex: 1}}>
                    <NumericStepper
                        label='Warmup Epochs'
                        value={formData.warmupEpochs}
                        onChange={(value) => updateField('warmupEpochs', value)}
                        error={errors.warmupEpochs}
                        helperText='Gradually increases the learning rate at the start of training'
                        min={0}
                    />

                    <Box sx={{mb: 3}}>
                        <Typography
                            variant='body1'
                            fontWeight={600}
                            gutterBottom
                        >
                            Learning Rate
                        </Typography>
                        <TextField
                            fullWidth
                            type='number'
                            value={formData.learningRate}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    updateField('learningRate', value);
                                }
                            }}
                            error={!!errors.learningRate}
                            helperText={
                                errors.learningRate ||
                                'Controls how much the model updates during training'
                            }
                            inputProps={{
                                min: 0,
                                max: 1,
                                step: 0.0001,
                            }}
                        />
                    </Box>
                </Box>
            </Stack>

            <StepNavigation
                onBack={prevStep}
                onNext={nextStep}
                nextLabel='Next: Review'
            />
        </Box>
    );
}
