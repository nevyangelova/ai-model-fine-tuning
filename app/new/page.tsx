import {Box, Paper, Typography} from '@mui/material';
import JobForm from '@/components/form/JobForm';

export default function NewJobPage() {
    return (
        <Box sx={{p: 4, maxWidth: 1000, mx: 'auto'}}>
            <Typography variant='h4' fontWeight={700} sx={{mb: 4}}>
                Fine-tune a model
            </Typography>

            <Paper sx={{p: 4, mb: 4, position: 'relative'}}>
                <JobForm />
            </Paper>
        </Box>
    );
}
