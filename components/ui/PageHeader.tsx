'use client';

import React from 'react';
import {Box, Typography, Button} from '@mui/material';
import {ArrowBack} from '@mui/icons-material';
import {useRouter} from 'next/navigation';

interface PageHeaderProps {
    title: string;
    backUrl?: string;
    showBackButton?: boolean;
}

export default function PageHeader({
    title,
    backUrl = '/',
    showBackButton = false,
}: PageHeaderProps) {
    const router = useRouter();

    return (
        <Box sx={{display: 'flex', alignItems: 'center', mb: 4}}>
            {showBackButton && (
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => router.push(backUrl)}
                    sx={{mr: 2}}
                />
            )}
            <Typography variant='h4' fontWeight={700} gutterBottom>
                {title}
            </Typography>
        </Box>
    );
}
