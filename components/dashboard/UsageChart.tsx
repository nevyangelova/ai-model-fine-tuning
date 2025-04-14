'use client';

import React from 'react';
import {PieChart} from '@mui/x-charts/PieChart';
import {Box, List, ListItem, ListItemText, Divider, Stack} from '@mui/material';

interface JobSummary {
    running: number;
    completed: number;
    failed: number;
}

interface UsageChartProps {
    summary: JobSummary;
}

export default function UsageChart({summary}: UsageChartProps) {
    const chartData = [
        {
            id: 'running',
            value: summary.running,
            color: 'rgba(29, 78, 216, 1)',
        },
        {
            id: 'completed',
            value: summary.completed,
            color: 'rgba(21, 128, 61, 1)',
        },
        {
            id: 'failed',
            value: summary.failed,
            color: 'rgba(185, 28, 28, 1)',
        },
    ];

    return (
        <Stack
            direction={{xs: 'column', md: 'row'}}
            spacing={2}
            alignItems='center'
            justifyContent={{xs: 'center', md: 'space-between'}}
            sx={{
                p: {xs: 1.5, sm: 2, md: 3},
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: {xs: '100%', md: 'auto'},
                    margin: '0 auto',
                }}
            >
                <PieChart
                    width={140}
                    height={140}
                    margin={{right: 5, left: 5, top: 5, bottom: 5}}
                    tooltip={{trigger: 'none'}}
                    series={[
                        {
                            data: chartData,
                            innerRadius: 60,
                            outerRadius: 50,
                            paddingAngle: 2,
                            cornerRadius: 4,
                            startAngle: 0,
                            endAngle: 360,
                        },
                    ]}
                    slotProps={{
                        legend: {
                            hidden: true,
                        },
                    }}
                />
            </Box>
            <List
                sx={{
                    flex: {xs: 'none', md: 2},
                    width: {xs: '100%', md: 'auto'},
                }}
                disablePadding
            >
                <ListItem>
                    <Box
                        component='span'
                        sx={{
                            width: 12,
                            height: 12,
                            borderRadius: '50%',
                            bgcolor: 'rgba(21, 128, 61, 1)',
                            display: 'inline-block',
                            mr: 2,
                        }}
                    />
                    <ListItemText
                        primary={`${summary.completed || 0} Completed Jobs`}
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
                            bgcolor: 'rgba(29, 78, 216, 1)',
                            display: 'inline-block',
                            mr: 2,
                        }}
                    />
                    <ListItemText
                        primary={`${summary.running || 0} Running Jobs`}
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
                            bgcolor: 'rgba(185, 28, 28, 1)',
                            display: 'inline-block',
                            mr: 2,
                        }}
                    />
                    <ListItemText
                        primary={`${summary.failed || 0} Failed Jobs`}
                    />
                </ListItem>
            </List>
        </Stack>
    );
}
