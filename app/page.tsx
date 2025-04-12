'use client';

import React, {Fragment} from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Typography,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import Link from 'next/link';
import {useJobs, useModels} from '@/services/api';

export default function DashboardPage() {
    const {data, isLoading, error} = useJobs();
    const {
        data: models,
        isLoading: modelsLoading,
        error: modelsError,
    } = useModels();

    const getStatusColor = (
        status: string
    ): 'success' | 'info' | 'error' | 'default' => {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'Running':
                return 'info';
            case 'Failed':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Box p={4}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={8}>
                    <Typography variant='h4' fontWeight={700} gutterBottom>
                        Fine-tuning usage
                    </Typography>

                    <Card sx={{mb: 4}}>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Typography variant='body1'>
                                        <strong>Completed:</strong>{' '}
                                        {data?.summary?.completed || 0} jobs
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1'>
                                        <strong>Running:</strong>{' '}
                                        {data?.summary?.running || 0} jobs
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant='body1'>
                                        <strong>Failed:</strong>{' '}
                                        {data?.summary?.failed || 0} jobs
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant='h6' mb={2}>
                                Jobs
                            </Typography>

                            {isLoading ? (
                                <CircularProgress />
                            ) : error ? (
                                <Typography color='error'>
                                    Error loading jobs: {String(error)}
                                </Typography>
                            ) : data?.jobs.length === 0 ? (
                                <Typography color='text.secondary'>
                                    No jobs found. Create a new fine-tuning job
                                    to get started.
                                </Typography>
                            ) : (
                                <Grid container direction='column' spacing={2}>
                                    {data?.jobs.map((job) => (
                                        <Grid item key={job.id}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent:
                                                        'space-between',
                                                    alignItems: 'center',
                                                    p: 2,
                                                    border: '1px solid #eee',
                                                    borderRadius: '12px',
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        variant='body2'
                                                        color='text.secondary'
                                                    >
                                                        {job.id}
                                                    </Typography>
                                                    <Typography variant='caption'>
                                                        {new Date(
                                                            job.createdAt
                                                        ).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                                <Chip
                                                    label={job.status}
                                                    color={getStatusColor(
                                                        job.status
                                                    )}
                                                />
                                            </Box>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{mb: 4}}>
                        <CardContent>
                            <Typography variant='h6'>Get Started</Typography>
                            <Typography variant='body2' sx={{mt: 1, mb: 2}}>
                                Simple, ready-to-use inference endpoints that
                                are paid per request. No commitments, only pay
                                for what you use with Nscale Serverless.
                            </Typography>
                            <Button
                                variant='contained'
                                fullWidth
                                component={Link}
                                href='/new'
                            >
                                New Fine-tuning Job
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Available Models
                            </Typography>

                            {modelsLoading ? (
                                <CircularProgress size={24} />
                            ) : modelsError ? (
                                <Typography color='error'>
                                    Error loading models
                                </Typography>
                            ) : (
                                <List>
                                    {models?.map((model, index) => (
                                        <Fragment key={model.id}>
                                            {index > 0 && <Divider />}
                                            <ListItem>
                                                <ListItemText
                                                    primary={model.displayName}
                                                    secondary={model.id}
                                                />
                                            </ListItem>
                                        </Fragment>
                                    ))}
                                </List>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
