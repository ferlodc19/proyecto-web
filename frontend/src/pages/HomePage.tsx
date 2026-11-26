import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Zap, Star, X } from 'lucide-react';
import { CompanyAvatar } from '../components/CompanyAvatar';
import {
  MOCK_JOBS,
  MOCK_COMPANIES,
  formatSalaryRangeMXN,
  formatCompactCount,
} from '../services/mockData';

type HeroSearchTab = 'empleos' | 'empresas' | 'sueldos';

const TAB_CONFIG: Record<
  HeroSearchTab,
  {
    label: string;
    queryPlaceholder: string;
    locationPlaceholder: string;
    buttonText: string;
  }
> = {
  empleos: {
    label: 'Empleos',
    queryPlaceholder: 'Encuentra tu empleo ideal',
    locationPlaceholder: 'Ciudad, estado o remoto',
    buttonText: 'Buscar',
  },
  empresas: {
    label: 'Empresas',
    queryPlaceholder: 'Nombre de la empresa o sector',
    locationPlaceholder: 'Ciudad o estado',
    buttonText: 'Buscar empresas',
  },
  sueldos: {
    label: 'Sueldos',
    queryPlaceholder: 'Puesto o palabra clave',
    locationPlaceholder: 'Ciudad, estado o remoto',
    buttonText: 'Comparar sueldos',
  },
};

export function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<HeroSearchTab>('empleos');
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');

  const currentTab = TAB_CONFIG[activeTab];
  const featuredJobs = MOCK_JOBS.filter((j) => j.status === 'open').slice(0, 4);
  const popularCompanies = MOCK_COMPANIES.slice(0, 4);

  function handleSearchSubmit(e: FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (location.trim()) params.set('l', location.trim());
    const qs = params.toString();

    if (activeTab === 'empleos') {
      navigate(qs ? `/empleos?${qs}` : '/empleos');
    } else if (activeTab === 'empresas') {
      navigate(qs ? `/empresas?${qs}` : '/empresas');
    } else {
      const roleSlug = query.trim()
        ? encodeURIComponent(query.trim().toLowerCase().replace(/\s+/g, '-'))
        : 'ingeniero-de-software';
      const locParam = location.trim()
        ? `?l=${encodeURIComponent(location.trim())}`
        : '';
      navigate(`/sueldos/${roleSlug}${locParam}`);
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 2. Héroe menta (8.1) */}
      <section className="border-b border-line/60 bg-mint-50 px-4 py-10 sm:px-6 sm:py-14 lg:px-16 lg:py-16">
        <div className="mx-auto max-w-hero text-center">
          <h1 className="mx-auto max-w-[780px] text-[30px] font-bold leading-[36px] tracking-[-0.02em] text-ink sm:text-[42px] sm:leading-[48px] lg:text-[48px] lg:leading-[54px]">
            Tu fuente de información laboral, contada por empleados reales
          </h1>

          <p className="mx-auto mt-3.5 max-w-[560px] text-[16px] leading-[24px] text-ink-2 sm:mt-4 sm:text-[18px] sm:leading-[26px]">
            Busca empleos, compara sueldos y lee reseñas anónimas antes de tu
            próxima entrevista.
          </p>

          {/* Pestañas del buscador: Empleos · Empresas · Sueldos (7.4 / 8.1) */}
          <div
            role="tablist"
            aria-label="Tipo de búsqueda"
            className="mt-7 inline-flex items-center justify-center gap-6 sm:mt-8 sm:gap-9"
          >
            {(Object.keys(TAB_CONFIG) as HeroSearchTab[]).map((tabKey) => {
              const isSelected = activeTab === tabKey;
              return (
                <button
                  key={tabKey}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tabKey)}
                  className={`relative flex h-[44px] items-center text-[16px] font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${
                    isSelected
                      ? 'text-green-700'
                      : 'text-ink hover:text-green-700'
                  }`}
                >
                  {TAB_CONFIG[tabKey].label}
                  {isSelected && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] rounded-full bg-green-500" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Buscador responsivo: tarjeta apilada en móvil (52 px c/u) y píldora doble en escritorio */}
          <form
            role="search"
            onSubmit={handleSearchSubmit}
            className="mx-auto mt-5 max-w-[760px]"
          >
            <div className="overflow-hidden rounded-[14px] border border-line-input bg-white shadow-soft sm:flex sm:h-[54px] sm:items-center sm:rounded-pill sm:border-line-strong">
              {/* Campo 1: Puesto / Empresa */}
              <div className="flex h-[52px] flex-1 items-center border-b border-line px-4 sm:h-full sm:border-b-0 sm:border-r sm:pl-5 sm:pr-3">
                <Search
                  className="mr-3 h-5 w-5 shrink-0 text-ink-3"
                  aria-hidden="true"
                />
                <label htmlFor="hero-query" className="sr-only">
                  {currentTab.queryPlaceholder}
                </label>
                <input
                  id="hero-query"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={currentTab.queryPlaceholder}
                  className="w-full bg-transparent text-[16px] text-ink placeholder:text-ink-3 focus:outline-none"
                />
                {query && (
                  <button
                    type="button"
                    aria-label="Limpiar texto de búsqueda"
                    onClick={() => setQuery('')}
                    className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-3 hover:bg-field hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Campo 2: Ubicación */}
              <div className="flex h-[52px] flex-1 items-center px-4 sm:h-full sm:pl-4 sm:pr-4">
                <MapPin
                  className="mr-3 h-5 w-5 shrink-0 text-ink-3"
                  aria-hidden="true"
                />
                <label htmlFor="hero-location" className="sr-only">
                  {currentTab.locationPlaceholder}
                </label>
                <input
                  id="hero-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder={currentTab.locationPlaceholder}
                  className="w-full bg-transparent text-[16px] text-ink placeholder:text-ink-3 focus:outline-none"
                />
                {location && (
                  <button
                    type="button"
                    aria-label="Limpiar ubicación"
                    onClick={() => setLocation('')}
                    className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-3 hover:bg-field hover:text-ink"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            </div>

            {/* Botón primario: ancho completo en móvil, centrado en escritorio (7.3 / 8.1) */}
            <div className="mt-3.5 sm:mt-5">
              <button
                type="submit"
                className="inline-flex h-[52px] w-full items-center justify-center whitespace-nowrap rounded-sm bg-black px-8 text-[17px] font-semibold text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto sm:min-w-[164px]"
              >
                {currentTab.buttonText}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Contenido principal */}
      <main className="mx-auto max-w-container px-4 py-10 sm:px-6 sm:py-12 lg:px-16">
        {/* 3. Empleos para ti (8.1) */}
        <section aria-labelledby="heading-empleos-para-ti">
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="heading-empleos-para-ti"
              className="text-[22px] font-semibold leading-[28px] tracking-[-0.01em] text-ink sm:text-[26px] sm:leading-[34px]"
            >
              Empleos para ti
            </h2>
            <Link
              to="/empleos"
              className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-[15px] font-semibold text-green-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Ver todos
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                to={`/empleos?id=${job.id}`}
                className="group flex flex-col justify-between rounded-lg border border-line bg-white p-5 shadow-card transition-all hover:border-line-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <CompanyAvatar
                      companyId={job.companyId}
                      name={job.companyName}
                      logoUrl={job.companyLogoUrl}
                      size="sm"
                    />
                    <span className="truncate text-[14px] font-medium text-ink">
                      {job.companyName}
                    </span>
                    {job.companyRating !== undefined && (
                      <span className="inline-flex shrink-0 items-center gap-1 text-[14px] font-semibold text-ink">
                        {job.companyRating.toFixed(1)}
                        <Star
                          className="h-3.5 w-3.5 fill-green-500 text-green-500"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-[16px] font-bold leading-[22px] text-ink group-hover:underline">
                    {job.title}
                  </h3>

                  <p className="mt-1.5 text-[14px] text-ink-2">{job.location}</p>
                  <p className="mt-0.5 text-[14px] font-medium text-ink-2">
                    {formatSalaryRangeMXN(job.salaryMin, job.salaryMax)}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2">
                  {job.quickApply ? (
                    <span className="inline-flex items-center gap-1.5 rounded-xs bg-mint px-2.5 py-1 text-[14px] font-semibold text-green-700">
                      <Zap
                        className="h-3.5 w-3.5 fill-green-500 text-green-500"
                        aria-hidden="true"
                      />
                      Postulación rápida
                    </span>
                  ) : (
                    <span className="text-[13px] text-ink-2">
                      Postulación externa
                    </span>
                  )}
                  <span className="text-[13px] text-ink-2">{job.postedAt}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Empresas populares (8.1) */}
        <section
          aria-labelledby="heading-empresas-populares"
          className="mt-12 sm:mt-14"
        >
          <div className="flex items-baseline justify-between gap-4">
            <h2
              id="heading-empresas-populares"
              className="text-[22px] font-semibold leading-[28px] tracking-[-0.01em] text-ink sm:text-[26px] sm:leading-[34px]"
            >
              Empresas populares
            </h2>
            <Link
              to="/empresas"
              className="inline-flex min-h-[44px] shrink-0 items-center whitespace-nowrap text-[15px] font-semibold text-green-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              Explorar empresas
            </Link>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {popularCompanies.map((company) => (
              <div
                key={company.id}
                className="flex flex-col justify-between rounded-lg border border-line bg-white p-5 shadow-card"
              >
                <Link
                  to={`/empresas/${company.slug}`}
                  className="group flex items-center gap-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  <CompanyAvatar
                    companyId={company.id}
                    name={company.name}
                    logoUrl={company.logoUrl}
                    size="md"
                  />
                  <div className="min-w-0">
                    <h3 className="truncate text-[16px] font-bold text-ink group-hover:underline">
                      {company.name}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[14px] text-ink-2">
                      <span className="inline-flex items-center gap-1 font-semibold text-ink">
                        {company.rating.toFixed(1)}
                        <Star
                          className="h-3.5 w-3.5 fill-green-500 text-green-500"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="text-ink-4" aria-hidden="true">
                        ·
                      </span>
                      <span>
                        {formatCompactCount(company.counts.reviews)} reseñas
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[14px] font-semibold text-green-700">
                  <Link
                    to={`/empresas/${company.slug}/resenas`}
                    className="inline-flex min-h-[36px] items-center hover:underline"
                  >
                    Reseñas
                  </Link>
                  <span className="text-ink-4" aria-hidden="true">
                    ·
                  </span>
                  <Link
                    to={`/sueldos/ingeniero-de-software?empresa=${company.slug}`}
                    className="inline-flex min-h-[36px] items-center hover:underline"
                  >
                    Sueldos
                  </Link>
                  <span className="text-ink-4" aria-hidden="true">
                    ·
                  </span>
                  <Link
                    to={`/empleos?q=${encodeURIComponent(company.name)}`}
                    className="inline-flex min-h-[36px] items-center hover:underline"
                  >
                    Empleos
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Banda de llamada a la acción (8.1) */}
        <section
          aria-labelledby="heading-cta-contribucion"
          className="mt-12 rounded-lg border border-line/60 bg-mint-50 p-6 sm:mt-14 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8 lg:px-12 lg:py-9"
        >
          <div className="max-w-[580px]">
            <h2
              id="heading-cta-contribucion"
              className="text-[22px] font-semibold leading-[28px] tracking-[-0.01em] text-ink sm:text-[26px] sm:leading-[34px]"
            >
              Ayuda a otros a encontrar un buen lugar para trabajar
            </h2>
            <p className="mt-2 text-[16px] leading-[24px] text-ink-2">
              Comparte una reseña, tu sueldo o tu entrevista. Siempre es
              anónimo.
            </p>
          </div>

          {/* Apilados a ancho completo en móvil; en fila sin salto de línea en >= 640 px */}
          <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center lg:mt-0 lg:shrink-0">
            <Link
              to="/empresas/nubia-tech/resenas/nueva"
              className="inline-flex h-[52px] w-full items-center justify-center whitespace-nowrap rounded-sm bg-black px-6 text-[16px] font-semibold text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
            >
              Escribir una reseña
            </Link>
            <Link
              to="/sueldos/agregar"
              className="inline-flex h-[52px] w-full items-center justify-center whitespace-nowrap rounded-sm border-[1.5px] border-ink bg-white px-6 text-[16px] font-semibold text-ink transition-colors hover:bg-field focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 sm:w-auto"
            >
              Agregar sueldo
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
