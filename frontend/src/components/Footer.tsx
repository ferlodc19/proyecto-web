import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-line bg-white mt-16">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-16 py-7 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Link to="/" aria-label="Jobly — Inicio" className="inline-flex items-center">
          <Logo height={24} />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-6 text-[13px] text-ink-2">
          <Link to="/privacidad" className="hover:text-green-700 transition-colors">
            Privacidad
          </Link>
          <Link to="/terminos" className="hover:text-green-700 transition-colors">
            Términos
          </Link>
          <Link to="/ayuda" className="hover:text-green-700 transition-colors">
            Ayuda
          </Link>
          <span className="text-ink-3">© Jobly</span>
        </div>
      </div>
    </footer>
  );
}
