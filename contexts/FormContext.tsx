'use client';

import {createContext, useContext, useState, ReactNode} from 'react';
import {JobFormData, validateJobForm} from '@/utils/validation';

const defaultFormValues: JobFormData = {
    name: '',
    baseModel: '',
    epochs: 3,
    evaluationEpochs: 1,
    warmupEpochs: 1,
    learningRate: 0.0001,
};

interface FormContextType {
    formData: JobFormData;
    errors: Record<string, string>;
    currentStep: number;
    isValid: boolean;
    updateField: <K extends keyof JobFormData>(
        field: K,
        value: JobFormData[K]
    ) => void;
    validateForm: () => boolean;
    nextStep: () => void;
    prevStep: () => void;
    goToStep: (step: number) => void;
    resetForm: () => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export function FormProvider({children}: {children: ReactNode}) {
    const [formData, setFormData] = useState<JobFormData>(defaultFormValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentStep, setCurrentStep] = useState(0);

    const updateField = <K extends keyof JobFormData>(
        field: K,
        value: JobFormData[K]
    ) => {
        const updatedData = {...formData, [field]: value};
        setFormData(updatedData);

        const validation = validateJobForm(updatedData);
        setErrors(validation.valid ? {} : validation.errors);
    };

    const validateForm = (): boolean => {
        const validation = validateJobForm(formData);
        setErrors(validation.valid ? {} : validation.errors);
        return validation.valid;
    };

    const nextStep = () => {
        if (validateForm()) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const prevStep = () => {
        setCurrentStep((prev) => prev - 1);
    };

    const goToStep = (step: number) => {
        setCurrentStep(step);
    };

    const resetForm = () => {
        setFormData(defaultFormValues);
        setErrors({});
        setCurrentStep(0);
    };

    return (
        <FormContext.Provider
            value={{
                formData,
                errors,
                currentStep,
                isValid: Object.keys(errors).length === 0,
                updateField,
                validateForm,
                nextStep,
                prevStep,
                goToStep,
                resetForm,
            }}
        >
            {children}
        </FormContext.Provider>
    );
}

export function useFormContext() {
    const context = useContext(FormContext);
    if (context === undefined) {
        throw new Error('useFormContext must be used within a FormProvider');
    }
    return context;
}
