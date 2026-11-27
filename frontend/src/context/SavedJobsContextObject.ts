import { createContext } from 'react';

export interface SavedJobsContextValue {
  savedIds: string[];
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

export const SavedJobsContext = createContext<SavedJobsContextValue | undefined>(
  undefined
);
