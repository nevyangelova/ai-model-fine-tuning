'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import { BuildOutlined } from '@mui/icons-material';
import Link from 'next/link';
import PrimaryButton from '@/components/ui/PrimaryButton';

export default function GetStartedCard() {
  return (
    <Card sx={{ p: { xs: 1, sm: 2 } }}>
      <Typography variant='h6' gutterBottom sx={{ ml: { xs: 1, sm: 2 } }}>
        Get Started
      </Typography>
      <CardContent sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: { xs: 1, sm: 2 },
        p: { xs: 1, sm: 2 }
      }}>
        <Card sx={{ display: 'flex', height: '100%', minHeight: { xs: '160px', sm: '180px' } }}>
          <Box
            sx={{
              width: { xs: '25%', sm: '30%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'rgba(0, 0, 0, 0.02)',
              borderRight: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <BuildOutlined
              sx={{
                fontSize: { xs: 48, sm: 64 },
                color: 'rgba(0, 0, 0, 0.5)',
                transform: 'rotate(-15deg)',
              }}
            />
          </Box>
          <Box sx={{ width: { xs: '75%', sm: '70%' }, p: { xs: 2, sm: 3 } }}>
            <Typography variant='h6' gutterBottom>
              Get Started with Fine-tuning
            </Typography>
            <Typography variant='body2' sx={{ mb: 2 }}>
              Simple, ready-to-use inference endpoints
              that are paid per request. No
              commitments, only pay for what you use
              with Nscale Serverless.
            </Typography>
            <PrimaryButton
              component={Link}
              href='/new'
              size="small"
              sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
            >
              New Fine-tuning Job
            </PrimaryButton>
          </Box>
        </Card>
      </CardContent>
    </Card>
  );
}
