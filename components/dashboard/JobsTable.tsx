'use client';

import React from 'react';
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import StatusChip from '@/components/ui/StatusChip';

interface Job {
    id: string;
    status: string;
    createdAt: string;
}

interface JobsTableProps {
    jobs: Job[];
}

export default function JobsTable({jobs}: JobsTableProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    return (
        <TableContainer component={Paper} elevation={0} variant='outlined'>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{backgroundColor: '#f0f0f0', px: {xs: 1, sm: 2}}}>
                            Job ID
                        </TableCell>
                        <TableCell sx={{backgroundColor: '#f0f0f0', px: {xs: 1, sm: 2}}}>
                            Date
                        </TableCell>
                        <TableCell
                            align='right'
                            sx={{backgroundColor: '#f0f0f0', px: {xs: 1, sm: 2}}}
                        >
                            Status
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {jobs.map((job) => (
                        <TableRow key={job.id} hover>
                            <TableCell sx={{px: {xs: 1, sm: 2}}}>
                                <Box
                                    sx={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                        backgroundColor: '#e0e0e0',
                                        borderRadius: '4px',
                                        px: {xs: 0.5, sm: 1},
                                        py: 0.5,
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(job.id);
                                    }}
                                >
                                    <Typography variant='body2' sx={{fontSize: {xs: '0.7rem', sm: '0.875rem'}}}>
                                        {job.id.length > 12 ? `${job.id.substring(0, 6)}...${job.id.substring(job.id.length - 4)}` : job.id}
                                    </Typography>
                                    <ContentCopyIcon sx={{fontSize: {xs: 14, sm: 16}}} />
                                </Box>
                            </TableCell>
                            <TableCell sx={{px: {xs: 1, sm: 2}}}>
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{fontSize: {xs: '0.7rem', sm: '0.875rem'}}}
                                >
                                    {formatDate(job.createdAt)}
                                </Typography>
                            </TableCell>
                            <TableCell align='right' sx={{px: {xs: 1, sm: 2}}}>
                                <StatusChip status={job.status} size="small" />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
