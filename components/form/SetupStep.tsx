'use client';

import {
    Box,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    Button,
    CircularProgress,
} from '@mui/material';
import {useFormContext} from '@/contexts/FormContext';
import {useModels} from '@/services/api';

export default function SetupStep() {
    const {formData, errors, updateField, nextStep} = useFormContext();
    const {data: models, isLoading, error: apiError} = useModels();

    return (
        <Box>
            <Typography variant='h5' fontWeight={600} gutterBottom>
                Set up your run
            </Typography>
            <Typography variant='body1' color='text.secondary' paragraph>
                Give your job a name and select a base model to fine-tune.
            </Typography>

            <Box sx={{my: 4}}>
                <TextField
                    fullWidth
                    label='Job name'
                    value={formData.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    error={!!errors.name}
                    helperText={
                        errors.name ||
                        '3-50 characters, alphanumeric and dashes only'
                    }
                    margin='normal'
                />

                <FormControl
                    fullWidth
                    margin='normal'
                    error={!!errors.baseModel}
                >
                    <InputLabel id='model-select-label'>Base model</InputLabel>
                    <Select
                        labelId='model-select-label'
                        id='model-select'
                        value={formData.baseModel}
                        onChange={(e) =>
                            updateField('baseModel', e.target.value as string)
                        }
                        label='Base model'
                    >
                        {isLoading ? (
                            <MenuItem disabled>Loading models...</MenuItem>
                        ) : apiError ? (
                            <MenuItem disabled>Error loading models</MenuItem>
                        ) : (
                            models?.map((model) => (
                                <MenuItem key={model.id} value={model.id}>
                                    {model.displayName}
                                </MenuItem>
                            ))
                        )}
                    </Select>
                    {errors.baseModel ? (
                        <FormHelperText>{errors.baseModel}</FormHelperText>
                    ) : (
                        <FormHelperText>
                            Select a base model to fine-tune
                        </FormHelperText>
                    )}
                </FormControl>
            </Box>

            <Box sx={{display: 'flex', justifyContent: 'flex-end', mt: 4}}>
                <Button
                    variant='contained'
                    onClick={nextStep}
                    disabled={isLoading}
                >
                    Next: Configure your run
                    {isLoading && <CircularProgress size={24} sx={{ml: 1}} />}
                </Button>
            </Box>
        </Box>
    );
}
