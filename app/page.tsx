'use client';

import React from 'react';
import {
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Typography,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import Link from 'next/link';
import {useJobs} from '@/services/api';

export default function DashboardPage() {
    const {data, isLoading, error} = useJobs();

    const getStatusColor = (
        status: string
    ): 'success' | 'primary' | 'error' | 'default' => {
        switch (status) {
            case 'Completed':
                return 'success';
            case 'Running':
                return 'primary';
            case 'Failed':
                return 'error';
            default:
                return 'default';
        }
    };

    // Format date to a more human-readable format
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    // Prepare data for the pie chart
    const chartData = data?.summary
        ? [
              {
                  id: 'running',
                  value: data.summary.running,
                  color: 'rgba(29, 78, 216, 1)',
              },
              {
                  id: 'completed',
                  value: data.summary.completed,
                  color: 'rgba(21, 128, 61, 1)',
              },
              {
                  id: 'failed',
                  value: data.summary.failed,
                  color: 'rgba(185, 28, 28, 1)',
              },
          ]
        : [];

    // Check if there are any jobs to display in chart
    const hasJobs =
        data?.summary &&
        data.summary.running + data.summary.completed + data.summary.failed > 0;

    return (
        <Box p={4}>
            <Typography variant='h4' fontWeight={700} gutterBottom>
                Acme Inc
            </Typography>

            {/* Top section with chart and stats */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 4,
                    mb: 4,
                }}
            >
                {/* Left side - Chart */}
                <Box sx={{flex: 1}}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' gutterBottom>
                                Fine-tuning usage
                            </Typography>

                            {isLoading ? (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        p: 4,
                                    }}
                                >
                                    <CircularProgress />
                                </Box>
                            ) : error ? (
                                <Typography color='error'>
                                    Error loading data: {String(error)}
                                </Typography>
                            ) : !hasJobs ? (
                                <Box sx={{textAlign: 'center', p: 4}}>
                                    <Typography color='text.secondary'>
                                        No jobs found.
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <Box
                                        sx={{
                                            height: 300,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <PieChart
                                            series={[
                                                {
                                                    data: chartData,
                                                    innerRadius: 100,
                                                    outerRadius: 80,
                                                    paddingAngle: 2,
                                                    cornerRadius: 4,
                                                    startAngle: 0,
                                                    endAngle: 360,
                                                },
                                            ]}
                                            height={200}
                                            slotProps={{
                                                legend: {
                                                    direction: 'row',
                                                    position: {
                                                        vertical: 'bottom',
                                                        horizontal: 'middle',
                                                    },
                                                },
                                            }}
                                        />
                                        <List disablePadding>
                                            <ListItem>
                                                <Box
                                                    component='span'
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        bgcolor:
                                                            'rgba(21, 128, 61, 1)',
                                                        display: 'inline-block',
                                                        mr: 2,
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={`${
                                                        data?.summary
                                                            ?.completed || 0
                                                    } Completed Jobs`}
                                                />
                                            </ListItem>
                                            <Divider component='li' />
                                            <ListItem>
                                                <Box
                                                    component='span'
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        bgcolor:
                                                            'rgba(29, 78, 216, 1)',
                                                        display: 'inline-block',
                                                        mr: 2,
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={`${
                                                        data?.summary
                                                            ?.running || 0
                                                    } Running Jobs`}
                                                />
                                            </ListItem>
                                            <Divider component='li' />
                                            <ListItem>
                                                <Box
                                                    component='span'
                                                    sx={{
                                                        width: 12,
                                                        height: 12,
                                                        borderRadius: '50%',
                                                        bgcolor:
                                                            'rgba(185, 28, 28, 1)',
                                                        display: 'inline-block',
                                                        mr: 2,
                                                    }}
                                                />
                                                <ListItemText
                                                    primary={`${
                                                        data?.summary?.failed ||
                                                        0
                                                    } Failed Jobs`}
                                                />
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <CardContent>
                                        {isLoading ? (
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    p: 4,
                                                }}
                                            >
                                                <CircularProgress />
                                            </Box>
                                        ) : error ? (
                                            <Typography color='error'>
                                                Error loading jobs:{' '}
                                                {String(error)}
                                            </Typography>
                                        ) : data?.jobs.length === 0 ? (
                                            <Box
                                                sx={{textAlign: 'center', p: 4}}
                                            >
                                                <Typography color='text.secondary'>
                                                    No jobs found. Create a new
                                                    fine-tuning job to get
                                                    started.
                                                </Typography>
                                            </Box>
                                        ) : (
                                            <TableContainer
                                                component={Paper}
                                                elevation={0}
                                                variant='outlined'
                                            >
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                Job ID
                                                            </TableCell>
                                                            <TableCell>
                                                                Date
                                                            </TableCell>
                                                            <TableCell align='right'>
                                                                Status
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {data?.jobs.map(
                                                            (job) => (
                                                                <TableRow
                                                                    key={job.id}
                                                                    hover
                                                                >
                                                                    <TableCell>
                                                                        <Typography variant='body2'>
                                                                            {
                                                                                job.id
                                                                            }
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Typography
                                                                            variant='body2'
                                                                            color='text.secondary'
                                                                        >
                                                                            {formatDate(
                                                                                job.createdAt
                                                                            )}
                                                                        </Typography>
                                                                    </TableCell>
                                                                    <TableCell align='right'>
                                                                        <Chip
                                                                            label={
                                                                                job.status
                                                                            }
                                                                            color={getStatusColor(
                                                                                job.status
                                                                            )}
                                                                            size='small'
                                                                            variant='outlined'
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                        )}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        )}
                                    </CardContent>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>
                <Box sx={{flex: 1}}>
                    <Card sx={{mb: 2}}>
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
                </Box>
            </Box>

            {/* Bottom section with jobs table */}
            <Card></Card>
        </Box>
    );
}
