import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  MapPin,
  Bookmark,
  BookmarkCheck,
  Star,
  Bell,
  Zap,
  MoreHorizontal,
  Pencil,
  CheckCircle2,
  BellRing,
} from 'lucide-react';
import { MOCK_JOBS, type JobWithCompanyMeta } from '../data/mockJobs';
import type { WorkModality } from '../types/jobly';
import { useSavedJobs } from '../context/SavedJobsContext';

function formatCurrencyMXN(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatSalaryLine(job: JobWithCompanyMeta): string {
  const sourceLabel =
    job.salarySource === 'employer'
      ? '(Proporcionado por el empleador)'
      : '(Estimación de Jobly)';
  return `${formatCurrencyMXN(job.salaryMin)} - ${formatCurrencyMXN(job.salaryMax)} ${sourceLabel}`;
}

export function JobsPage() {
  const [searchParams] = useSearchParams();
  const { savedIds, toggleSaveJob } = useSavedJobs();
  const [activeTab, setActiveTab] = useState<'for_you' | 'search'>(() =>
    searchParams.has('q') || searchParams.has('l') ? 'search' : 'for_you'
  );
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [locationQuery, setLocationQuery] = useState(() => searchParams.get('l') ?? '');
  const [selectedModality, setSelectedModality] = useState<WorkModality | 'all'>('all');

  const [selectedJobId, setSelectedJobId] = useState<string>(
    searchParams.get('id') ?? MOCK_JOBS[0]?.id ?? ''
  );
  const [appliedIds, setAppliedIds] = useState<string[]>([]);
  const [alertCreated, setAlertCreated] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter((job) => {
      const q = query.trim().toLowerCase();
      const loc = locationQuery.trim().toLowerCase();

      const matchesQuery =
        !q ||
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.skills.some((s) => s.toLowerCase().includes(q));

      const matchesLocation =
        !loc ||
        job.location.toLowerCase().includes(loc) ||
        (loc.includes('remoto') && job.remote);

      const matchesModality =
        selectedModality === 'all' || job.modality === selectedModality;

      return matchesQuery && matchesLocation && matchesModality;
    });
  }, [query, locationQuery, selectedModality]);

  const activeJob: JobWithCompanyMeta | undefined = useMemo(() => {
    return (
      filteredJobs.find((j) => j.id === selectedJobId) ?? filteredJobs[0]
    );
  }, [filteredJobs, selectedJobId]);

  function handleApply(job: JobWithCompanyMeta) {
    if (!appliedIds.includes(job.id)) {
      setAppliedIds((prev) => [...prev, job.id]);
    }
  }

  function handleSelectJob(jobId: string) {
    setSelectedJobId(jobId);
    setShowFullDescription(false);
  }

  return (
    <div className="min-h-screen bg-white pb-16">
      {/* Encabezado de búsqueda estilo manual Jobly */}
      <section className="border-b border-line bg-white pt-5">
        <div className="mx-auto max-w-container px-4 sm:px-6 lg:px-16">
          {/* Barra píldora dividida */}
          <div className="mx-auto flex max-w-[680px] flex-col overflow-hidden rounded-2xl border border-line bg-field sm:h-[48px] sm:flex-row sm:items-center sm:rounded-full">
            <div className="relative flex flex-1 items-center px-4 py-2.5 sm:py-0">
              <Search
                className="mr-2.5 h-4 w-4 shrink-0 text-ink-3"
                aria-hidden="true"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (e.target.value.trim()) setActiveTab('search');
                }}
                placeholder="Encuentra tu empleo ideal"
                aria-label="Encuentra tu empleo ideal"
                className="w-full bg-transparent text-[14px] text-ink placeholder:text-ink-3 focus:outline-none"
              />
            </div>

            <div className="hidden h-6 w-px bg-line-strong sm:block" />

            <div className="relative flex flex-1 items-center border-t border-line px-4 py-2.5 sm:border-t-0 sm:py-0">
              <MapPin
                className="mr-2.5 h-4 w-4 shrink-0 text-ink-3"
                aria-hidden="true"
              />
              <input
                type="text"
                value={locationQuery}
                onChange={(e) => {
                  setLocationQuery(e.target.value);
                  if (e.target.value.trim()) setActiveTab('search');
                }}
                placeholder="Ciudad, estado o trabajo en remoto"
                aria-label="Ciudad, estado o trabajo en remoto"
                className="w-full bg-transparent text-[14px] text-ink placeholder:text-ink-3 focus:outline-none"
              />
            </div>
          </div>

          {/* Fila de pestañas centradas (Para ti / Buscar) + Crear alerta de empleo */}
          <div className="relative mt-5 flex items-center justify-between sm:justify-center">
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setActiveTab('for_you')}
                className={`relative pb-3 text-[14px] font-semibold transition-colors ${
                  activeTab === 'for_you'
                    ? 'text-ink'
                    : 'text-ink-2 hover:text-ink'
                }`}
              >
                Para ti
                {activeTab === 'for_you' && (
                  <span className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-full bg-green-700" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('search')}
                className={`relative pb-3 text-[14px] font-semibold transition-colors ${
                  activeTab === 'search'
                    ? 'text-ink'
                    : 'text-ink-2 hover:text-ink'
                }`}
              >
                Buscar
                {activeTab === 'search' && (
                  <span className="absolute inset-x-0 bottom-0 h-[2.5px] rounded-full bg-green-700" />
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setAlertCreated((prev) => !prev)}
              className="inline-flex items-center gap-1.5 pb-3 text-[13px] font-semibold text-ink transition-colors hover:text-green-700 sm:absolute sm:right-0"
            >
              {alertCreated ? (
                <>
                  <BellRing className="h-4 w-4 text-green-700" />
                  <span className="text-green-700">Alerta activada</span>
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  <span>Crear alerta de empleo</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Filtros rápidos visibles cuando está activa la pestaña "Buscar" */}
      {activeTab === 'search' && (
        <div className="border-b border-line bg-field/60">
          <div className="mx-auto flex max-w-container flex-wrap items-center gap-2 px-4 py-3 sm:px-6 lg:px-16">
            {(
              [
                { id: 'all', label: 'Todos los modelos' },
                { id: 'remoto', label: 'Remoto' },
                { id: 'hibrido', label: 'Híbrido' },
                { id: 'presencial', label: 'Presencial' },
              ] as const
            ).map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedModality(item.id)}
                className={`h-8 rounded-full border px-3.5 text-[13px] font-semibold transition-colors ${
                  selectedModality === item.id
                    ? 'border-ink bg-ink text-white'
                    : 'border-line-strong bg-white text-ink hover:bg-field'
                }`}
              >
                {item.label}
              </button>
            ))}

            {(query || locationQuery || selectedModality !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setLocationQuery('');
                  setSelectedModality('all');
                }}
                className="ml-auto text-[13px] font-semibold text-green-700 hover:underline"
              >
                Restablecer búsqueda
              </button>
            )}
          </div>
        </div>
      )}

      {/* Layout principal: Columna izquierda (lista) + Columna derecha (4 tarjetas) */}
      <div className="mx-auto max-w-container px-4 pt-6 sm:px-6 lg:px-16">
        {filteredJobs.length === 0 ? (
          <div className="rounded-xl border border-line bg-white p-12 text-center shadow-xs">
            <h2 className="text-[20px] font-bold text-ink">
              No encontramos vacantes que coincidan con tu búsqueda
            </h2>
            <p className="mt-2 text-[14px] text-ink-2">
              Prueba con otras palabras clave o cambia la ubicación.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[340px_1fr]">
            {/* Lista izquierda */}
            <div className="space-y-3">
              {filteredJobs.map((job) => {
                const isSelected = activeJob?.id === job.id;
                const isSaved = savedIds.includes(job.id);

                return (
                  <article
                    key={job.id}
                    onClick={() => handleSelectJob(job.id)}
                    className={`cursor-pointer rounded-xl border bg-white p-4 transition-all ${
                      isSelected
                        ? 'border-line-strong shadow-sm ring-1 ring-ink/10'
                        : 'border-line hover:border-line-strong'
                    }`}
                  >
                    {/* Fila empresa + guardar */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-xs text-[10px] font-bold ${job.companyBadgeBg} ${job.companyBadgeText}`}
                        >
                          {job.companyInitials}
                        </span>
                        <span className="text-[12px] font-medium text-ink">
                          {job.companyName}
                        </span>
                        {job.companyRating && (
                          <span className="inline-flex items-center gap-0.5 text-[12px] font-bold text-ink">
                            {job.companyRating.toFixed(1)}
                            <Star className="h-3 w-3 fill-ink text-ink" />
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        aria-label={isSaved ? 'Quitar de guardados' : 'Guardar empleo'}
                        className="rounded-sm p-1 text-ink transition-colors hover:bg-field"
                      >
                        {isSaved ? (
                          <BookmarkCheck className="h-4 w-4 text-green-700" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </button>
                    </div>

                    {/* Título, ubicación y salario */}
                    <h2 className="mt-2 text-[15px] font-bold leading-snug text-ink">
                      {job.title}
                    </h2>
                    <p className="mt-0.5 text-[12px] text-ink-2">{job.location}</p>
                    <p className="mt-0.5 text-[12px] leading-snug text-ink-2">
                      {formatSalaryLine(job)}
                    </p>

                    {/* Badge Candidatura rápida + fecha */}
                    <div className="mt-3 flex items-end justify-between gap-2">
                      {job.quickApply ? (
                        <span className="inline-flex items-center gap-1 rounded-xs bg-mint-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                          <Zap className="h-3 w-3 fill-green-700" />
                          Candidatura rápida
                        </span>
                      ) : (
                        <span />
                      )}

                      <span className="text-[11px] font-medium text-ink-3">
                        {job.postedShortLabel}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Columna derecha: 4 tarjetas independientes apiladas */}
            {activeJob && (
              <div className="space-y-4">
                {/* Tarjeta 1: Encabezado de la vacante */}
                <section className="rounded-xl border border-line bg-white p-6 shadow-xs sm:p-7">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-[12px] font-bold ${activeJob.companyBadgeBg} ${activeJob.companyBadgeText}`}
                      >
                        {activeJob.companyInitials}
                      </span>
                      <span className="text-[15px] font-semibold text-ink">
                        {activeJob.companyName}
                      </span>
                      {activeJob.companyRating && (
                        <span className="inline-flex items-center gap-1 text-[13px] font-bold text-ink">
                          {activeJob.companyRating.toFixed(1)}
                          <Star className="h-3.5 w-3.5 fill-ink text-ink" />
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      aria-label="Más opciones"
                      className="flex h-9 w-9 items-center justify-center rounded-lg bg-field text-ink-2 transition-colors hover:text-ink"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>

                  <h1 className="mt-3 text-[24px] font-bold leading-tight text-ink sm:text-[26px]">
                    {activeJob.title}
                  </h1>

                  {/* Pills de ubicación y salario */}
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-field px-2.5 py-1 text-[12px] font-semibold text-ink">
                      {activeJob.location}
                    </span>
                    <span className="rounded-md bg-field px-2.5 py-1 text-[12px] font-medium text-ink-2">
                      {formatSalaryLine(activeJob)}
                    </span>
                  </div>

                  {/* Botón Candidatura rápida + Guardar */}
                  <div className="mt-5 flex items-center gap-2.5">
                    {appliedIds.includes(activeJob.id) ? (
                      <button
                        type="button"
                        disabled
                        className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-mint-50 px-5 text-[14px] font-semibold text-green-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Candidatura enviada
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApply(activeJob)}
                        className="inline-flex h-[42px] items-center gap-2 rounded-lg bg-black px-5 text-[14px] font-semibold text-white transition-colors hover:bg-ink"
                      >
                        <Zap className="h-4 w-4 fill-white" />
                        <span>
                          {activeJob.quickApply
                            ? 'Candidatura rápida'
                            : 'Postularme ahora'}
                        </span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleSaveJob(activeJob.id)}
                      aria-label={
                        savedIds.includes(activeJob.id)
                          ? 'Quitar de guardados'
                          : 'Guardar vacante'
                      }
                      className="flex h-[42px] w-[42px] items-center justify-center rounded-lg border border-line-strong bg-white text-ink transition-colors hover:bg-field"
                    >
                      {savedIds.includes(activeJob.id) ? (
                        <BookmarkCheck className="h-4 w-4 text-green-700" />
                      ) : (
                        <Bookmark className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </section>

                {/* Tarjeta 2: Tus cualificaciones para este empleo */}
                <section className="rounded-xl border border-line bg-white p-6 shadow-xs sm:p-7">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-[19px] font-bold text-ink">
                      Tus cualificaciones para este empleo
                    </h2>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-ink hover:text-green-700"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      <span>Editar</span>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {activeJob.skills.map((skill) => (
                      <div
                        key={skill}
                        className="flex items-center gap-2 text-[14px] text-ink"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 fill-green-700 text-white" />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Tarjeta 3: A quién buscamos / Qué harás */}
                <section className="rounded-xl border border-line bg-white p-6 shadow-xs sm:p-7">
                  <div>
                    <h3 className="text-[15px] font-bold text-ink">
                      A quién buscamos
                    </h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-2">
                      {activeJob.lookingFor.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <h3 className="text-[15px] font-bold text-ink">Qué harás</h3>
                    <ul className="mt-2.5 list-disc space-y-1.5 pl-5 text-[14px] leading-relaxed text-ink-2">
                      {activeJob.responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  {showFullDescription && (
                    <div className="mt-5 border-t border-line pt-4 text-[14px] text-ink-2">
                      <p>
                        <strong className="text-ink">Modalidad de trabajo:</strong>{' '}
                        {activeJob.modality === 'hibrido'
                          ? 'Híbrido'
                          : activeJob.modality === 'remoto'
                            ? '100% Remoto'
                            : 'Presencial'}
                        . Prestaciones de ley y superiores desde el primer día.
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setShowFullDescription((prev) => !prev)}
                    className="mt-5 text-[13px] font-bold text-green-700 hover:underline"
                  >
                    {showFullDescription ? 'Mostrar menos' : 'Mostrar más'}
                  </button>
                </section>

                {/* Tarjeta 4: Sobre la empresa */}
                <section className="rounded-xl border border-line bg-white p-6 shadow-xs sm:p-7">
                  <h2 className="text-[19px] font-bold text-ink">
                    Sobre la empresa
                  </h2>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <span className="block text-[12px] text-ink-3">Tamaño</span>
                      <span className="mt-0.5 block text-[14px] font-bold text-ink">
                        {activeJob.companySize}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[12px] text-ink-3">Sector</span>
                      <span className="mt-0.5 block text-[14px] font-bold text-ink">
                        {activeJob.companySector}
                      </span>
                    </div>

                    <div>
                      <span className="block text-[12px] text-ink-3">Sede</span>
                      <span className="mt-0.5 block text-[14px] font-bold text-ink">
                        {activeJob.companyHq}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/empresas/${activeJob.companyId}`}
                    className="mt-5 inline-block text-[13px] font-bold text-green-700 underline hover:text-green-800"
                  >
                    Ver perfil, reseñas y sueldos
                  </Link>
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
