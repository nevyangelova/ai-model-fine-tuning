import React from 'react';
import {Box} from '@mui/material';
import PageHeader from '@/components/ui/PageHeader';
import JobsCard from '@/components/dashboard/JobsCard';
import GetStartedCard from '@/components/dashboard/GetStartedCard';

export default function DashboardPage() {
    return (
        <Box p={4}>
            <PageHeader title='Acme Inc' />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 4,
                    mb: 4,
                }}
            >
                <Box sx={{flex: 1}}>
                    <JobsCard />
                </Box>

                <Box sx={{flex: 1}}>
                    <GetStartedCard />
                </Box>
            </Box>
        </Box>
    );
}
