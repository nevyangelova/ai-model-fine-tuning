'use client';

import {useRouter} from 'next/navigation';
import {
    Box,
    Paper,
    Typography,
    Stepper,
    Step,
    StepLabel,
    Button,
    Alert,
    Snackbar,
} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {useState} from 'react';
import {FormProvider, useFormContext} from '@/contexts/FormContext';
import SetupStep from '@/components/form/SetupStep';
import ConfigureStep from '@/components/form/ConfigureStep';
import ReviewStep from '@/components/form/ReviewStep';

const steps = ['Set up your run', 'Configure your run', 'Review your job'];

export default function NewJobPage() {
    const router = useRouter();
    const [success, setSuccess] = useState(false);

    return (
        <FormProvider>
            <Box sx={{p: 4, maxWidth: 800, mx: 'auto'}}>
                <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
                    <Button
                        startIcon={<ArrowBack />}
                        onClick={() => router.push('/')}
                        sx={{mr: 2}}
                    >
                        Back to dashboard
                    </Button>
                    <Typography variant='h4' fontWeight={700}>
                        New fine-tuning job
                    </Typography>
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
        <Paper sx={{p: 4, mb: 4}}>
            <FormSteps />
            <FormStepContent onSuccess={onSuccess} onError={(error) => {
                setApiError(typeof error === 'string' ? error : String(error));
            }} />
            
            {apiError && (
                <Alert severity='error' sx={{mt: 3}}>
                    Failed to create job: {apiError}
                </Alert>
            )}
        </Paper>
    );
}

function FormSteps() {
    const {currentStep} = useFormContext();

    return (
        <Box sx={{mb: 4}}>
            <Typography variant='body2' color='text.secondary' gutterBottom>
                Step {currentStep + 1} of {steps.length}
            </Typography>
            <Stepper activeStep={currentStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
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
