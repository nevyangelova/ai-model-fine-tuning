'use client';

import React from 'react';
import {Box, Card, CardContent, Typography} from '@mui/material';
import LoadingState from '@/components/ui/LoadingState';
import UsageChart from '@/components/dashboard/UsageChart';
import JobsTable from '@/components/dashboard/JobsTable';
import {useJobs} from '@/services/api';

export default function JobsCard() {
    const {data, isLoading, error} = useJobs();
    const jobs = data?.jobs;
    const summary = data?.summary;
    const hasJobs =
        summary && summary.running + summary.completed + summary.failed > 0;

    return (
        <Card>
            <CardContent sx={{p: {xs: 1, sm: 2, md: 3}}}>
                <Typography variant='h6' gutterBottom sx={{ml: {xs: 1, sm: 2}}}>
                    Fine-tuning usage
                </Typography>

                <LoadingState
                    isLoading={isLoading}
                    error={error}
                    isEmpty={!hasJobs}
                    emptyMessage='No jobs found.'
                >
                    {summary && (
                        <>
                            <Card
                                sx={{
                                    m: {xs: 1, sm: 2},
                                }}
                            >
                                <UsageChart summary={summary} />
                            </Card>
                            <Box sx={{mt: 3, px: {xs: 0, sm: 1}}}>
                                <JobsTable jobs={jobs || []} />
                            </Box>
                        </>
                    )}
                </LoadingState>
            </CardContent>
        </Card>
    );
}
