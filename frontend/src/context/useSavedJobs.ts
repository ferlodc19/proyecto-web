import { useContext } from 'react';
import { SavedJobsContext } from './SavedJobsContextObject';

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) {
    throw new Error('useSavedJobs debe usarse dentro de SavedJobsProvider');
  }
  return ctx;
}
