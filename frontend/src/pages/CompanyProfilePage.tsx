import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  ExternalLink,
  MapPin,
  MessageSquareText,
  Star,
  Users,
} from 'lucide-react';
import { CompanyAvatar } from '../components/CompanyAvatar';
import { MOCK_JOBS } from '../data/mockJobs';
import {
  formatCompactCount,
  formatSalaryRangeMXN,
  MOCK_COMPANIES,
} from '../services/mockData';

const SUBRATING_LABELS = [
  { key: 'cultura', label: 'Cultura y valores' },
  { key: 'diversidad', label: 'Diversidad e inclusión' },
  { key: 'conciliacion', label: 'Equilibrio vida y trabajo' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'sueldo', label: 'Sueldo y prestaciones' },
  { key: 'carrera', label: 'Oportunidades de carrera' },
] as const;

function formatCompanyType(type?: string) {
  return type?.replace('Empresa ', '') ?? 'No especificado';
}

export function CompanyProfilePage() {
  const { slug } = useParams<{ slug: string }>();
  const company = MOCK_COMPANIES.find((item) => item.slug === slug);

  if (!company) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-field px-4 py-12">
        <section className="max-w-md rounded-xl border border-line bg-white p-8 text-center shadow-xs">
          <h1 className="text-2xl font-bold text-ink">No encontramos esa empresa</h1>
          <p className="mt-2 text-sm text-ink-2">
            Revisa el enlace o vuelve al catálogo de empresas.
          </p>
          <Link
            to="/empresas"
            className="mt-5 inline-flex items-center gap-2 font-semibold text-green-700 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Volver a empresas
          </Link>
        </section>
      </main>
    );
  }

  const companyJobs = MOCK_JOBS.filter(
    (job) => job.companyName === company.name && job.status === 'open'
  );
  const reviewPath = `/empresas/${company.slug}/resenas`;
  const interviewPath = `/empresas/${company.slug}/entrevistas`;
  const salaryPath = `/sueldos/ingeniero-de-software?empresa=${company.slug}`;

  return (
    <main className="min-h-screen bg-field pb-16">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-container px-4 py-7 sm:px-6 sm:py-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <Link
              to="/empresas"
              className="inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-2 hover:text-green-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Todas las empresas
            </Link>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
              <CompanyAvatar
                companyId={company.id}
                name={company.name}
                logoUrl={company.logoUrl}
                size="lg"
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-green-700">Perfil de empresa</p>
                <h1 className="mt-1 text-[30px] font-bold tracking-[-0.02em] text-ink sm:text-[36px]">
                  {company.name}
                </h1>
                <p className="mt-1 text-base text-ink-2">{company.industry}</p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-2">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    {company.hq}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="h-4 w-4" aria-hidden="true" />
                    {company.size}
                  </span>
                  {company.founded && (
                    <span className="inline-flex items-center gap-1.5">
                      <CalendarDays className="h-4 w-4" aria-hidden="true" />
                      Fundada en {company.founded}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 sm:justify-end">
                <a
                  href="#vacantes"
                  className="inline-flex h-11 items-center gap-2 rounded-lg bg-black px-4 text-sm font-semibold text-white hover:bg-ink"
                >
                  <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
                  Ver empleos
                </a>
                <Link
                  to={reviewPath}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-line-strong px-4 text-sm font-semibold text-ink hover:bg-field"
                >
                  <MessageSquareText className="h-4 w-4" aria-hidden="true" />
                  Reseñas
                </Link>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg bg-field p-4">
                <p className="text-xs text-ink-2">Calificación</p>
                <p className="mt-1 inline-flex items-center gap-1 text-xl font-bold text-ink">
                  {company.rating.toFixed(1)}
                  <Star className="h-4 w-4 fill-green-500 text-green-500" aria-hidden="true" />
                  <span className="sr-only">de 5 estrellas</span>
                </p>
              </div>
              <div className="rounded-lg bg-field p-4">
                <p className="text-xs text-ink-2">Reseñas</p>
                <p className="mt-1 text-xl font-bold text-ink">
                  {formatCompactCount(company.counts.reviews)}
                </p>
              </div>
              <div className="rounded-lg bg-field p-4">
                <p className="text-xs text-ink-2">La recomienda</p>
                <p className="mt-1 text-xl font-bold text-ink">{company.recommendPct}%</p>
              </div>
              <div className="rounded-lg bg-field p-4">
                <p className="text-xs text-ink-2">Aprueba a su CEO</p>
                <p className="mt-1 text-xl font-bold text-ink">{company.ceoApprovalPct}%</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-5xl gap-5 px-4 pt-7 sm:px-6 lg:grid-cols-[1.5fr_1fr] lg:px-0 lg:pt-9">
        <div className="space-y-5">
          <section className="rounded-xl border border-line bg-white p-5 shadow-xs sm:p-6">
            <h2 className="text-xl font-bold text-ink">Acerca de {company.name}</h2>
            <p className="mt-3 text-sm leading-6 text-ink-2">
              {company.description || 'Esta empresa aún no ha agregado una descripción.'}
            </p>
            <dl className="mt-5 grid gap-4 border-t border-line pt-5 sm:grid-cols-2">
              <div>
                <dt className="text-xs text-ink-3">Tipo de empresa</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">
                  {formatCompanyType(company.type)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-ink-3">Tamaño</dt>
                <dd className="mt-1 text-sm font-semibold text-ink">{company.size}</dd>
              </div>
              {company.website && (
                <div className="sm:col-span-2">
                  <dt className="text-xs text-ink-3">Sitio web</dt>
                  <dd className="mt-1">
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
                    >
                      {company.website.replace(/^https?:\/\//, '')}
                      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  </dd>
                </div>
              )}
            </dl>
          </section>

          <section className="rounded-xl border border-line bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-ink">Calificaciones</h2>
                <p className="mt-1 text-sm text-ink-2">Opiniones de quienes conocen la empresa.</p>
              </div>
              <Link to={reviewPath} className="text-sm font-semibold text-green-700 hover:underline">
                Ver reseñas <ArrowRight className="inline h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-5 space-y-4">
              {SUBRATING_LABELS.map(({ key, label }) => {
                const rating = company.subratings[key];
                return (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between gap-3 text-sm">
                      <span className="text-ink-2">{label}</span>
                      <span className="shrink-0 font-semibold text-ink">
                        {rating.toFixed(1)} / 5
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-field">
                      <span
                        className="block h-full rounded-full bg-green-500"
                        style={{ width: `${(rating / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section id="vacantes" className="scroll-mt-24 rounded-xl border border-line bg-white p-5 shadow-xs sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-ink">Empleos en {company.name}</h2>
                <p className="mt-1 text-sm text-ink-2">
                  Vacantes destacadas disponibles en Jobly.
                </p>
              </div>
              <span className="text-sm text-ink-2">
                {companyJobs.length} {companyJobs.length === 1 ? 'vacante' : 'vacantes'}
              </span>
            </div>
            {companyJobs.length > 0 ? (
              <div className="mt-4 divide-y divide-line">
                {companyJobs.map((job) => (
                  <Link
                    key={job.id}
                    to={`/empleos?id=${job.id}`}
                    className="flex flex-col gap-2 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-ink hover:text-green-700">{job.title}</h3>
                      <p className="mt-1 text-sm text-ink-2">
                        {job.location} · {job.modality === 'hibrido' ? 'Híbrido' : job.modality === 'remoto' ? 'Remoto' : 'Presencial'}
                      </p>
                    </div>
                    <span className="shrink-0 text-sm font-semibold text-ink">
                      {formatSalaryRangeMXN(job.salaryMin, job.salaryMax)} / mes
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-lg bg-field p-4 text-sm text-ink-2">
                No hay vacantes destacadas para esta empresa por ahora.
              </p>
            )}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border border-line bg-white p-5 shadow-xs sm:p-6">
            <h2 className="text-lg font-bold text-ink">Explora más</h2>
            <div className="mt-3 divide-y divide-line">
              <Link to={reviewPath} className="flex items-center justify-between gap-3 py-4 first:pt-0">
                <span>
                  <span className="block text-sm font-semibold text-ink">Reseñas</span>
                  <span className="mt-1 block text-xs text-ink-2">
                    {formatCompactCount(company.counts.reviews)} opiniones
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-ink-3" aria-hidden="true" />
              </Link>
              <Link to={salaryPath} className="flex items-center justify-between gap-3 py-4">
                <span>
                  <span className="block text-sm font-semibold text-ink">Sueldos</span>
                  <span className="mt-1 block text-xs text-ink-2">
                    {formatCompactCount(company.counts.salaries)} reportes
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-ink-3" aria-hidden="true" />
              </Link>
              <Link to={interviewPath} className="flex items-center justify-between gap-3 py-4 last:pb-0">
                <span>
                  <span className="block text-sm font-semibold text-ink">Entrevistas</span>
                  <span className="mt-1 block text-xs text-ink-2">
                    {formatCompactCount(company.counts.interviews)} experiencias
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 text-ink-3" aria-hidden="true" />
              </Link>
            </div>
          </section>

          <section className="rounded-xl border border-line bg-mint-50 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-green-700" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-ink">Conoce antes de postularte</h2>
                <p className="mt-1 text-sm leading-5 text-ink-2">
                  Revisa las opiniones, los sueldos y las vacantes para decidir si esta empresa va contigo.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </main>
  );
}
