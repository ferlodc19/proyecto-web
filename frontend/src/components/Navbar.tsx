import { Link, NavLink } from 'react-router-dom';
import { Search, Bell, CircleUser } from 'lucide-react';
import { Logo } from './Logo';

export function Navbar() {
  const navItems = [
    { to: '/empleos', label: 'Empleos' },
    { to: '/empresas', label: 'Empresas' },
    { to: '/sueldos', label: 'Sueldos' },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-line">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-16 h-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] gap-4">
        {/* Zona izquierda: Logotipo Lupa (34 px) */}
        <Link
          to="/"
          aria-label="Jobly — Ir al inicio"
          className="inline-flex items-center shrink-0 rounded-xs justify-self-start"
        >
          <Logo height={34} />
        </Link>

        {/* Zona central: Navegación principal (desktop) */}
        <nav
          aria-label="Navegación principal"
          className="hidden md:flex items-center h-full gap-12 lg:gap-[72px] justify-self-center"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative h-full inline-flex items-center text-[16px] font-semibold transition-colors ${
                  isActive
                    ? 'text-green-700'
                    : 'text-ink hover:text-green-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-500 rounded-t-full"
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Zona derecha: Acciones globales (objetivos táctiles >= 44 px) */}
        <div className="flex items-center gap-1 sm:gap-2 justify-self-end">
          <Link
            to="/empleos"
            className="h-11 px-3 inline-flex items-center gap-2 text-[15px] font-semibold text-ink hover:bg-field rounded-sm transition-colors"
          >
            <Search size={18} strokeWidth={1.8} aria-hidden="true" />
            <span className="hidden sm:inline">Buscar</span>
          </Link>

          <button
            type="button"
            aria-label="Notificaciones y alertas de empleo"
            className="w-11 h-11 inline-flex items-center justify-center text-ink hover:bg-field rounded-sm transition-colors"
          >
            <Bell size={20} strokeWidth={1.8} aria-hidden="true" />
          </button>

          <Link
            to="/acceso"
            aria-label="Cuenta e inicio de sesión"
            className="w-11 h-11 inline-flex items-center justify-center text-ink hover:bg-field rounded-sm transition-colors"
          >
            <CircleUser size={22} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </div>

      {/* Navegación secundaria visible en móvil */}
      <nav
        aria-label="Navegación móvil"
        className="flex md:hidden items-center justify-around border-t border-line h-12 px-4 bg-white"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative h-full inline-flex items-center text-[15px] font-semibold ${
                isActive ? 'text-green-700' : 'text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span>{item.label}</span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 right-0 h-[3px] bg-green-500"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
