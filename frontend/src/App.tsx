import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { JobsPage } from './pages/JobsPage';
import { SavedJobsPage } from './pages/SavedJobsPage';
import { AccessPage } from './pages/AccessPage';
import { SavedJobsProvider } from './context/SavedJobsContext';

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-16 py-20 text-center">
      <h1 className="text-[32px] font-bold text-ink">{title}</h1>
      <p className="mt-2 text-ink-2">Vista en construcción — siguiente paso del plan.</p>
    </div>
  );
}

export function App() {
  return (
    <SavedJobsProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-white text-ink">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/empleos" element={<JobsPage />} />
              <Route path="/guardados" element={<SavedJobsPage />} />
              <Route path="/empresas" element={<ComingSoon title="Empresas" />} />
              <Route
                path="/empresas/:slug"
                element={<ComingSoon title="Perfil de empresa" />}
              />
              <Route
                path="/empresas/:slug/resenas"
                element={<ComingSoon title="Reseñas de empresa" />}
              />
              <Route
                path="/empresas/:slug/entrevistas"
                element={<ComingSoon title="Entrevistas" />}
              />
              <Route path="/sueldos" element={<ComingSoon title="Sueldos" />} />
              <Route path="/sueldos/:puesto" element={<ComingSoon title="Sueldos" />} />
              <Route path="/acceso" element={<AccessPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </SavedJobsProvider>
  );
}

export default App;
