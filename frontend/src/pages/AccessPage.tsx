import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness, Eye, EyeOff } from 'lucide-react';

type AccessMode = 'login' | 'register';

export function AccessPage() {
  const [mode, setMode] = useState<AccessMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState('');

  function changeMode(nextMode: AccessMode) {
    setMode(nextMode);
    setNotice('');
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(
      mode === 'login'
        ? 'El inicio de sesión estará disponible cuando conectemos el servicio de cuentas.'
        : 'El registro estará disponible cuando conectemos el servicio de cuentas.'
    );
  }

  const isRegistering = mode === 'register';

  return (
    <main className="flex min-h-[calc(100vh-7rem)] items-center justify-center bg-field px-4 py-10 sm:px-6">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-ink-2 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Volver al inicio
        </Link>

        <section className="rounded-xl border border-line bg-white p-6 shadow-card sm:p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-mint-50 text-green-700">
            <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
          </div>

          <h1 className="mt-5 text-[28px] font-bold tracking-[-0.02em] text-ink">
            {isRegistering ? 'Únete a Jobly' : 'Bienvenido de nuevo'}
          </h1>
          <p className="mt-1 text-sm text-ink-2">
            {isRegistering
              ? 'Crea una cuenta para guardar empleos y seguir empresas.'
              : 'Inicia sesión para continuar con tu búsqueda de empleo.'}
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-lg bg-field p-1" role="group" aria-label="Tipo de acceso">
            <button
              type="button"
              aria-pressed={!isRegistering}
              onClick={() => changeMode('login')}
              className={`h-10 rounded-md text-sm font-semibold transition-colors ${
                !isRegistering ? 'bg-white text-ink shadow-xs' : 'text-ink-2 hover:text-ink'
              }`}
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              aria-pressed={isRegistering}
              onClick={() => changeMode('register')}
              className={`h-10 rounded-md text-sm font-semibold transition-colors ${
                isRegistering ? 'bg-white text-ink shadow-xs' : 'text-ink-2 hover:text-ink'
              }`}
            >
              Crear cuenta
            </button>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label htmlFor="access-name" className="mb-1.5 block text-sm font-semibold text-ink">
                  Nombre completo
                </label>
                <input
                  id="access-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  placeholder="Tu nombre"
                  className="h-11 w-full rounded-lg border border-line-strong px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
                />
              </div>
            )}

            <div>
              <label htmlFor="access-email" className="mb-1.5 block text-sm font-semibold text-ink">
                Correo electrónico
              </label>
              <input
                id="access-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="nombre@correo.com"
                className="h-11 w-full rounded-lg border border-line-strong px-3.5 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
              />
            </div>

            <div>
              <label htmlFor="access-password" className="mb-1.5 block text-sm font-semibold text-ink">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="access-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isRegistering ? 'new-password' : 'current-password'}
                  required
                  minLength={8}
                  maxLength={128}
                  placeholder={isRegistering ? 'Al menos 8 caracteres' : 'Tu contraseña'}
                  className="h-11 w-full rounded-lg border border-line-strong px-3.5 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 inline-flex w-11 items-center justify-center text-ink-3 hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Eye className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
              {isRegistering && (
                <p className="mt-1.5 text-xs text-ink-3">Usa al menos 8 caracteres.</p>
              )}
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-black px-4 text-sm font-semibold text-white transition-colors hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            >
              {isRegistering ? 'Crear cuenta' : 'Iniciar sesión'}
            </button>
          </form>

          {notice && (
            <p
              className="mt-4 rounded-lg border border-line bg-field p-3 text-sm leading-5 text-ink-2"
              role="status"
              aria-live="polite"
            >
              {notice}
            </p>
          )}

          <p className="mt-5 border-t border-line pt-4 text-center text-xs leading-5 text-ink-3">
            El acceso y el registro todavía no están conectados a un servicio de cuentas.
          </p>
        </section>
      </div>
    </main>
  );
}
