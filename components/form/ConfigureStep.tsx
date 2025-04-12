'use client';

import {Box, Typography, TextField, Button, Stack} from '@mui/material';
import {useFormContext} from '@/contexts/FormContext';
import NumericStepper from '@/components/NumericStepper';

export default function ConfigureStep() {
    const {formData, errors, updateField, nextStep, prevStep} =
        useFormContext();

    return (
        <Box>
            <Typography variant='h5' fontWeight={600} gutterBottom>
                Configure your run
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
                Set the parameters for your fine-tuning job.
            </Typography>

            <Stack
                direction={{xs: 'column', md: 'row'}}
                spacing={4}
                sx={{mt: 2}}
            >
                <Box sx={{flex: 1}}>
                    <NumericStepper
                        label='Epochs'
                        value={formData.epochs}
                        onChange={(value) => updateField('epochs', value)}
                        error={errors.epochs}
                        helperText='Total number of training epochs'
                        min={1}
                    />

                    <NumericStepper
                        label='Evaluation Epochs'
                        value={formData.evaluationEpochs}
                        onChange={(value) =>
                            updateField('evaluationEpochs', value)
                        }
                        error={errors.evaluationEpochs}
                        helperText='Number of epochs for evaluation'
                        min={0}
                    />
                </Box>

                <Box sx={{flex: 1}}>
                    <NumericStepper
                        label='Warmup Epochs'
                        value={formData.warmupEpochs}
                        onChange={(value) => updateField('warmupEpochs', value)}
                        error={errors.warmupEpochs}
                        helperText='Number of warmup epochs'
                        min={0}
                    />

                    <Box sx={{mb: 3}}>
                        <Typography variant='body1' gutterBottom>
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
                                errors.learningRate || 'Value between 0 and 1'
                            }
                            inputProps={{
                                min: 0,
                                max: 1,
                                step: 0.0001
                            }}
                        />
                    </Box>
                </Box>
            </Stack>

            <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
                <Button variant='outlined' onClick={prevStep}>
                    Back
                </Button>
                <Button variant='contained' onClick={nextStep}>
                    Next: Review your job
                </Button>
            </Box>
        </Box>
    );
}
