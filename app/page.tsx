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
    Snackbar,
} from '@mui/material';
import {PieChart} from '@mui/x-charts/PieChart';
import Link from 'next/link';
import {useJobs} from '@/services/api';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {BuildOutlined} from '@mui/icons-material';

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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

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

    const hasJobs =
        data?.summary &&
        data.summary.running + data.summary.completed + data.summary.failed > 0;

    return (
        <Box p={4}>
            <Typography variant='h4' fontWeight={700} gutterBottom>
                Acme Inc
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: {xs: 'column', md: 'row'},
                    gap: 4,
                    mb: 4,
                }}
            >
                <Box sx={{flex: 1}}>
                    <Card>
                        <CardContent>
                            <Typography variant='h6' gutterBottom sx={{ml: 2}}>
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
                                    <Card
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            p: 3,
                                            m: 2,
                                        }}
                                    >
                                        <PieChart
                                            width={140}
                                            height={140}
                                            tooltip={{trigger: 'none'}}
                                            series={[
                                                {
                                                    data: chartData,
                                                    innerRadius: 70,
                                                    outerRadius: 60,
                                                    paddingAngle: 2,
                                                    cornerRadius: 4,
                                                    startAngle: 0,
                                                    endAngle: 360,
                                                },
                                            ]}
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
                                        <List sx={{flex: 2}} disablePadding>
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
                                    </Card>
                                    <CardContent>
                                        <TableContainer
                                            component={Paper}
                                            elevation={0}
                                            variant='outlined'
                                        >
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell
                                                            sx={{
                                                                backgroundColor:
                                                                    '#f0f0f0',
                                                            }}
                                                        >
                                                            Job ID
                                                        </TableCell>
                                                        <TableCell
                                                            sx={{
                                                                backgroundColor:
                                                                    '#f0f0f0',
                                                            }}
                                                        >
                                                            Date
                                                        </TableCell>
                                                        <TableCell
                                                            align='right'
                                                            sx={{
                                                                backgroundColor:
                                                                    '#f0f0f0',
                                                            }}
                                                        >
                                                            Status
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {data?.jobs.map((job) => (
                                                        <TableRow
                                                            key={job.id}
                                                            hover
                                                        >
                                                            <TableCell>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'inline-flex',
                                                                        alignItems:
                                                                            'center',
                                                                        gap: 0.5,
                                                                        backgroundColor:
                                                                            '#e0e0e0',
                                                                        borderRadius:
                                                                            '4px',
                                                                        px: 1,
                                                                        py: 0.5,
                                                                        cursor: 'pointer',
                                                                    }}
                                                                    onClick={() => {
                                                                        navigator.clipboard.writeText(
                                                                            job.id
                                                                        );
                                                                    }}
                                                                >
                                                                    <Typography variant='body2'>
                                                                        {job.id}
                                                                    </Typography>
                                                                    <ContentCopyIcon
                                                                        sx={{
                                                                            fontSize: 16,
                                                                        }}
                                                                    />
                                                                </Box>
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
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </CardContent>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </Box>

                <Box sx={{flex: 1}}>
                    <Card sx={{p: 2}}>
                        <Typography variant='h6' gutterBottom sx={{ml: 2}}>
                            Get Started
                        </Typography>
                        <CardContent
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Card
                                sx={{
                                    display: 'flex',
                                    height: '100%',
                                    minHeight: '180px',
                                }}
                            >
                                <Box
                                    sx={{
                                        width: '30%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        bgcolor: 'rgba(0, 0, 0, 0.02)',
                                        borderRight:
                                            '1px solid rgba(0, 0, 0, 0.06)',
                                    }}
                                >
                                    <BuildOutlined
                                        sx={{
                                            fontSize: 64,
                                            color: 'rgba(0, 0, 0, 0.5)',
                                            transform: 'rotate(-15deg)',
                                        }}
                                    />
                                </Box>
                                <Box sx={{width: '70%', p: 3}}>
                                    <Typography variant='h6' gutterBottom>
                                        Get Started with Fine-tuning
                                    </Typography>
                                    <Typography variant='body2' sx={{mb: 2}}>
                                        Simple, ready-to-use inference endpoints
                                        that are paid per request. No
                                        commitments, only pay for what you use
                                        with Nscale Serverless.
                                    </Typography>
                                    <Button
                                        variant='contained'
                                        component={Link}
                                        href='/new'
                                        sx={{
                                            backgroundColor: '#000',
                                            borderRadius: '4px',
                                            '&:hover': {
                                                backgroundColor: '#333',
                                            },
                                        }}
                                    >
                                        New Fine-tuning Job
                                    </Button>
                                </Box>
                            </Card>
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Box>
    );
}
