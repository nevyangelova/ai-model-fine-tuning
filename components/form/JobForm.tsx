'use client';

import {useRouter} from 'next/navigation';
import {Box, Typography, Button, Alert, Snackbar} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {useState} from 'react';
import {FormProvider, useFormContext} from '@/contexts/FormContext';
import SetupStep from '@/components/form/SetupStep';
import ConfigureStep from '@/components/form/ConfigureStep';
import ReviewStep from '@/components/form/ReviewStep';

const steps = ['Set up your run', 'Configure your run', 'Review your job'];

export default function JobForm() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    return (
        <FormProvider>
            <Box>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push('/')}
                        sx={{mr: 2}}
                    ></Button>
                </Box>

                <FormContent
                    onSuccess={() => {
                        setSuccess(true);
                        setTimeout(() => {
                            router.push('/');
                        }, 2000);
                    }}
                />

                <Snackbar
                    open={success}
                    autoHideDuration={2000}
                    onClose={() => setSuccess(false)}
                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                >
                    <Alert severity='success'>
                        Job created successfully! Redirecting to dashboard...
                    </Alert>
                </Snackbar>
            </Box>
        </FormProvider>
    );
}

function FormContent({onSuccess}: {onSuccess: () => void}) {
    const [apiError, setApiError] = useState<string | null>(null);

    return (
        <>
            <FormSteps />
            <FormStepContent
                onSuccess={onSuccess}
                onError={(error) => {
                    setApiError(
                        typeof error === 'string' ? error : String(error)
                    );
                }}
            />

            {apiError && (
                <Alert severity='error' sx={{mt: 3}}>
                    Failed to create job: {apiError}
                </Alert>
            )}
        </>
    );
}

function FormSteps() {
    const {currentStep} = useFormContext();

    return (
        <Box
            sx={{
                position: 'absolute',
                right: '2rem',
                top: '2rem',
            }}
        >
            <Typography variant='body2' color='text.secondary' gutterBottom>
                {currentStep + 1} of {steps.length}
            </Typography>
        </Box>
    );
}

function FormStepContent({
    onSuccess,
    onError,
}: {
    onSuccess: () => void;
    onError: (error: unknown) => void;
}) {
    const {currentStep} = useFormContext();

    switch (currentStep) {
        case 0:
            return <SetupStep />;
        case 1:
            return <ConfigureStep />;
        case 2:
            return <ReviewStep onSuccess={onSuccess} onError={onError} />;
        default:
            return null;
    }
}
