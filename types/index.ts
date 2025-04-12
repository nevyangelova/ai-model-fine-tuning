// types/index.ts

export type JobStatus = 'Running' | 'Completed' | 'Failed';

// job schema from api 
export interface FineTuningJob {
  id: string;
  name: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
  date: string;
  createdAt: string;
  status: JobStatus;
}

// job input from create job handler
export interface JobFormState {
  name: string;
  baseModel: string;
  epochs: number;
  evaluationEpochs: number;
  warmupEpochs: number;
  learningRate: number;
}

// model schema from api
export interface ModelOption {
  id: string;
  displayName: string;
}

// summary stats 
export interface JobSummaryStats {
  completed: number;
  running: number;
  failed: number;
}

// Response from GET /jobs
export interface JobListResponse {
  jobs: FineTuningJob[];
  summary: JobSummaryStats;
}

export interface ValidationErrorResponse {
  error: string;
  fields: Record<string, string>;
}

export interface PermissionErrorResponse {
  error: string;
}

export interface LimitReachedResponse {
  error: string;
  message: string;
}
  