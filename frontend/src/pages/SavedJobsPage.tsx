import { Link } from 'react-router-dom';
import { ArrowRight, Bookmark, Trash2 } from 'lucide-react';
import { MOCK_JOBS } from '../data/mockJobs';
import { useSavedJobs } from '../context/useSavedJobs';

function formatCurrencyMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function SavedJobsPage() {
  const { savedIds, toggleSaveJob } = useSavedJobs();
  const savedJobs = MOCK_JOBS.filter((job) => savedIds.includes(job.id));

  if (savedJobs.length === 0) {
    return (
      <main className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-field px-4 py-10">
        <section className="w-full max-w-lg rounded-xl border border-line bg-white p-10 text-center shadow-xs">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-mint-50 text-green-700">
            <Bookmark className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 text-[20px] font-bold text-ink">
            Tu lista de guardados está vacía
          </h1>
          <p className="mt-2 text-[14px] leading-relaxed text-ink-2">
            Cuando encuentres una oferta interesante, guárdala para revisarla aquí después.
          </p>
          <Link
            to="/empleos"
            className="mt-6 inline-flex h-[44px] items-center gap-2 rounded-lg bg-black px-6 text-[14px] font-semibold text-white transition-colors hover:bg-ink"
          >
            <span>Buscar vacantes</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-7rem)] bg-field px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-6 text-[28px] font-bold tracking-[-0.02em] text-ink sm:text-[32px]">
          Mis empleos guardados
        </h1>
        <div className="space-y-3">
          {savedJobs.map((job) => (
            <article
              key={job.id}
              className="flex flex-col justify-between gap-4 rounded-xl border border-line bg-white p-5 shadow-xs sm:flex-row sm:items-center sm:p-6"
            >
              <div className="space-y-1.5">
                <p className="text-[13px] font-semibold text-ink-2">
                  {job.companyName}
                  {job.companyRating ? ` · ${job.companyRating.toFixed(1)} ★` : ''}
                </p>
                <h2 className="text-[18px] font-bold text-ink">{job.title}</h2>
                <p className="text-[14px] text-ink-2">{job.location}</p>
                <p className="text-[13px] font-medium text-ink">
                  {formatCurrencyMXN(job.salaryMin)} - {formatCurrencyMXN(job.salaryMax)} / mes
                </p>
              </div>
              <button
                type="button"
                onClick={() => toggleSaveJob(job.id)}
                className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 self-start rounded-lg px-3 text-[13px] font-semibold text-ink-2 transition-colors hover:bg-field hover:text-red-700 sm:self-center"
                aria-label={`Quitar ${job.title} de guardados`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Quitar</span>
              </button>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
