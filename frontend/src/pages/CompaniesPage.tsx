import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { MapPin, Search, Star } from 'lucide-react';
import { CompanyAvatar } from '../components/CompanyAvatar';
import { formatCompactCount, MOCK_COMPANIES } from '../services/mockData';

export function CompaniesPage() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(() => searchParams.get('q') ?? '');
  const [location, setLocation] = useState(() => searchParams.get('l') ?? '');

  const companies = useMemo(() => {
    const search = query.trim().toLocaleLowerCase('es-MX');
    const place = location.trim().toLocaleLowerCase('es-MX');

    return MOCK_COMPANIES.filter((company) => {
      const matchesQuery =
        !search ||
        company.name.toLocaleLowerCase('es-MX').includes(search) ||
        company.industry.toLocaleLowerCase('es-MX').includes(search);
      const matchesLocation =
        !place || company.hq.toLocaleLowerCase('es-MX').includes(place);

      return matchesQuery && matchesLocation;
    });
  }, [query, location]);

  return (
    <main className="min-h-screen bg-field pb-16">
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-container px-4 py-9 sm:px-6 sm:py-12 lg:px-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold text-green-700">Explora Jobly</p>
            <h1 className="mt-2 text-[30px] font-bold tracking-[-0.02em] text-ink sm:text-[36px]">
              Encuentra una empresa para ti
            </h1>
            <p className="mt-2 text-[15px] text-ink-2">
              Consulta calificaciones, reseñas y oportunidades de empleo.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-[1.3fr_1fr]">
              <label className="flex h-12 items-center gap-3 rounded-lg border border-line-strong bg-white px-4 focus-within:border-green-700">
                <Search className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
                <span className="sr-only">Nombre de empresa o sector</span>
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Empresa o sector"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
                />
              </label>
              <label className="flex h-12 items-center gap-3 rounded-lg border border-line-strong bg-white px-4 focus-within:border-green-700">
                <MapPin className="h-4 w-4 shrink-0 text-ink-3" aria-hidden="true" />
                <span className="sr-only">Ciudad o estado</span>
                <input
                  type="search"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  placeholder="Ciudad o estado"
                  className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="companies-results-heading"
        className="mx-auto max-w-container px-4 pt-8 sm:px-6 sm:pt-10 lg:px-16"
      >
        <div className="mx-auto max-w-5xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 id="companies-results-heading" className="text-lg font-bold text-ink">
              Empresas populares
            </h2>
            <span className="text-sm text-ink-2">
              {companies.length} {companies.length === 1 ? 'empresa' : 'empresas'}
            </span>
          </div>

          {companies.length === 0 ? (
            <div className="rounded-xl border border-line bg-white px-6 py-12 text-center">
              <h3 className="text-lg font-bold text-ink">No encontramos empresas</h3>
              <p className="mt-2 text-sm text-ink-2">
                Prueba con otro nombre, sector o ubicación.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {companies.map((company) => (
                <article
                  key={company.id}
                  className="flex min-h-[218px] flex-col rounded-xl border border-line bg-white p-5 shadow-xs transition-colors hover:border-line-strong sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <CompanyAvatar
                      companyId={company.id}
                      name={company.name}
                      logoUrl={company.logoUrl}
                      size="md"
                    />
                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/empresas/${company.slug}`}
                        className="text-lg font-bold text-ink hover:text-green-700 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                      >
                        {company.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink-2">{company.industry}</p>
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-2">
                        <span className="inline-flex items-center gap-1 font-semibold text-ink">
                          {company.rating.toFixed(1)}
                          <Star className="h-3.5 w-3.5 fill-green-500 text-green-500" aria-hidden="true" />
                        </span>
                        <span>
                          {formatCompactCount(company.counts.reviews)} reseñas
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-ink-2">
                    {company.description}
                  </p>

                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <span className="text-xs text-ink-2">
                      {company.size} · {company.hq}
                    </span>
                    <Link
                      to={`/empresas/${company.slug}`}
                      className="text-sm font-semibold text-green-700 hover:underline"
                    >
                      Ver empresa
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
