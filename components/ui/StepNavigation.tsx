'use client';

import React from 'react';
import {Box} from '@mui/material';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';

interface StepNavigationProps {
    onBack?: () => void;
    onNext: () => void;
    nextLabel?: string;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
}

export default function StepNavigation({
    onBack,
    onNext,
    nextLabel = 'Next',
    isLoading = false,
    loadingText = 'Submitting...',
    disabled = false,
}: StepNavigationProps) {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', mt: 4}}>
            {onBack && (
                <SecondaryButton onClick={onBack} disabled={disabled}>
                    Back
                </SecondaryButton>
            )}
            <Box sx={{flex: 1}} />
            <PrimaryButton
                onClick={onNext}
                isLoading={isLoading}
                loadingText={loadingText}
                disabled={disabled}
            >
                {nextLabel}
            </PrimaryButton>
        </Box>
    );
}
