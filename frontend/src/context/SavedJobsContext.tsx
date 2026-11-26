import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react';

interface SavedJobsContextValue {
  savedIds: string[];
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
}

const STORAGE_KEY = 'jobly_saved_job_ids';

const SavedJobsContext = createContext<SavedJobsContextValue | undefined>(
  undefined
);

export function SavedJobsProvider({ children }: { children: ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as string[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignorar errores de cuota en storage
    }
  }, [savedIds]);

  function toggleSaveJob(jobId: string) {
    setSavedIds((prev) =>
      prev.includes(jobId) ? prev.filter((id) => id !== jobId) : [...prev, jobId]
    );
  }

  function isJobSaved(jobId: string) {
    return savedIds.includes(jobId);
  }

  return (
    <SavedJobsContext.Provider value={{ savedIds, toggleSaveJob, isJobSaved }}>
      {children}
    </SavedJobsContext.Provider>
  );
}

export function useSavedJobs() {
  const ctx = useContext(SavedJobsContext);
  if (!ctx) {
    throw new Error('useSavedJobs debe usarse dentro de SavedJobsProvider');
  }
  return ctx;
}
