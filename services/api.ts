import axios, {AxiosError} from 'axios';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {
    JobFormState,
    ModelOption,
    JobListResponse,
    FineTuningJob,
    ValidationErrorResponse,
    PermissionErrorResponse,
    LimitReachedResponse,
} from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_API_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fe-test-api-production.up.railway.app/api';

const client = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    },
});

export const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 400) {
            return axiosError.response.data as ValidationErrorResponse;
        }

        if (
            axiosError.response?.status === 401 ||
            axiosError.response?.status === 403
        ) {
            return axiosError.response.data as PermissionErrorResponse;
        }

        if (axiosError.response?.status === 429) {
            return axiosError.response.data as LimitReachedResponse;
        }

        return {error: 'An unexpected error occurred'};
    }

    return {error: 'Network error, please check your connection'};
};

export const jobsApi = {
    fetchJobs: async (): Promise<JobListResponse> => {
        const response = await client.get('/jobs');
        return response.data;
    },

    fetchJob: async (id: string): Promise<FineTuningJob> => {
        const response = await client.get(`/jobs/${id}`);
        return response.data;
    },

    createJob: async (data: JobFormState): Promise<FineTuningJob> => {
        const response = await client.post('/jobs', data);
        return response.data;
    },

    deleteJob: async (id: string): Promise<void> => {
        await client.delete(`/jobs/${id}`);
    },
};

export const modelsApi = {
    fetchModels: async (): Promise<ModelOption[]> => {
        const response = await client.get('/models');
        return response.data;
    },
};

export const JOBS_QUERY_KEY = 'jobs';
export const MODELS_QUERY_KEY = 'models';

// Jobs hooks
export function useJobs() {
    return useQuery({
        queryKey: [JOBS_QUERY_KEY],
        queryFn: jobsApi.fetchJobs,
    });
}

export function useJob(id: string) {
    return useQuery({
        queryKey: [JOBS_QUERY_KEY, id],
        queryFn: () => jobsApi.fetchJob(id),
        enabled: !!id,
    });
}

export function useCreateJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (jobData: JobFormState) => jobsApi.createJob(jobData),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [JOBS_QUERY_KEY]});
        },
    });
}

export function useDeleteJob() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => jobsApi.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: [JOBS_QUERY_KEY]});
        },
    });
}

// Models hooks
export function useModels() {
    return useQuery({
        queryKey: [MODELS_QUERY_KEY],
        queryFn: modelsApi.fetchModels,
        staleTime: 1000 * 60 * 30, // 30 minutes - models don't change often
    });
}
