'use client';

import React, {useEffect, useState} from 'react';
import {Box, Typography, Stack, Paper} from '@mui/material';
import {
    ScienceOutlined,
    SettingsOutlined,
    BuildOutlined,
} from '@mui/icons-material';
import {useFormContext} from '@/contexts/FormContext';
import {useModels, useCreateJob} from '@/services/api';
import StepNavigation from '@/components/ui/StepNavigation';

interface ReviewStepProps {
    onSuccess: () => void;
    onError: (error: unknown) => void;
}

export default function ReviewStep({onSuccess, onError}: ReviewStepProps) {
    const {formData, prevStep, validateForm} = useFormContext();
    const {data: models} = useModels();
    const [selectedModelName, setSelectedModelName] = useState('');

    const {mutate: createJob, isPending, error, isSuccess} = useCreateJob();

    useEffect(() => {
        if (models) {
            const selectedModel = models.find(
                (model) => model.id === formData.baseModel
            );
            if (selectedModel) {
                setSelectedModelName(selectedModel.displayName);
            }
        }
    }, [models, formData.baseModel]);

    useEffect(() => {
        if (isSuccess) {
            onSuccess();
        }
    }, [isSuccess, onSuccess]);

    useEffect(() => {
        if (error) {
            onError(error);
        }
    }, [error, onError]);

    const handleSubmit = () => {
        if (validateForm()) {
            createJob(formData);
        }
    };

    return (
        <Box>
            <Typography variant='h5' fontWeight={600} gutterBottom>
                Review your job
            </Typography>

            <Stack spacing={3} sx={{mt: 2}}>
                <Paper sx={{p: 3, display: 'flex', alignItems: 'center'}}>
                    <BuildOutlined sx={{color: 'secondary', mr: 2, mt: 0.5}} />
                    <Box>
                        <Typography variant='h6' fontWeight={600}>
                            Job Name
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {formData.name}
                        </Typography>
                    </Box>
                </Paper>

                <Paper sx={{p: 3, display: 'flex', alignItems: 'center'}}>
                    <ScienceOutlined
                        sx={{color: 'secondary', mr: 2, mt: 0.5}}
                    />
                    <Box>
                        <Typography variant='h6' fontWeight={600}>
                            Model
                        </Typography>
                        <Typography variant='body1' color='text.secondary'>
                            {selectedModelName || formData.baseModel}
                        </Typography>
                    </Box>
                </Paper>

                <Paper sx={{p: 3, display: 'flex', alignItems: 'center'}}>
                    <SettingsOutlined
                        sx={{color: 'secondary', mr: 2, mt: 0.5}}
                    />
                    <Box>
                        <Typography variant='h6' fontWeight={600}>
                            Configuration
                        </Typography>
                        <Typography
                            variant='body2'
                            color='text.secondary'
                            sx={{mt: 1}}
                        >
                            Epochs: {formData.epochs} • Eval epochs:{' '}
                            {formData.evaluationEpochs} • Warmup epochs:{' '}
                            {formData.warmupEpochs} • Learning rate:{' '}
                            {formData.learningRate}
                        </Typography>
                    </Box>
                </Paper>
            </Stack>

            <StepNavigation
                onBack={prevStep}
                onNext={handleSubmit}
                nextLabel='Start Fine-tuning'
                isLoading={isPending}
                loadingText='Submitting...'
            />
        </Box>
    );
}
