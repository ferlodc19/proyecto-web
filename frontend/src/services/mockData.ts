import type { Company, UserProfile } from '../types/jobly';

export const MOCK_USER_PROFILE: UserProfile = {
  id: 'user-1',
  email: 'alex.rivera@correo.mx',
  name: 'Alex Rivera',
  location: 'Ciudad de México',
  phone: '+52 55 1234 5678',
  skills: [
    'JavaScript',
    'Java',
    'Programación de software',
    'React',
    'SQL',
    'Figma',
  ],
  experience: [
    {
      title: 'Desarrollador/a Frontend Jr.',
      company: 'Estudio Nube',
      from: '2025-01',
      to: '2026-08',
    },
  ],
  education: [
    {
      institution: 'UNAM',
      degree: 'Ingeniería en Computación',
      from: '2021',
      to: '2025',
    },
  ],
  savedJobIds: ['job-1'],
  followedCompanyIds: ['comp-1'],
  createdAt: '2026-01-15T10:00:00Z',
};

export const MOCK_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    slug: 'nubia-tech',
    name: 'Nubia Tech',
    industry: 'Software',
    hq: 'Ciudad de México',
    size: '201 a 500 empleados',
    founded: 2016,
    type: 'Empresa privada',
    website: 'https://nubiatech.mx',
    description:
      'Desarrollamos plataformas en la nube y herramientas impulsadas por inteligencia artificial para empresas en Latinoamérica.',
    rating: 3.7,
    recommendPct: 72,
    ceoApprovalPct: 85,
    subratings: {
      cultura: 3.8,
      diversidad: 4.0,
      conciliacion: 3.6,
      direccion: 3.3,
      sueldo: 3.5,
      carrera: 3.7,
    },
    counts: {
      reviews: 1204,
      jobs: 128,
      salaries: 4812,
      interviews: 386,
    },
  },
  {
    id: 'comp-2',
    slug: 'pixelia-studio',
    name: 'Pixelia Studio',
    industry: 'Diseño y producto digital',
    hq: 'Ciudad de México',
    size: '51 a 200 empleados',
    founded: 2019,
    type: 'Empresa privada',
    website: 'https://pixelia.studio',
    description:
      'Estudio de diseño de producto y experiencia de usuario que colabora con startups y empresas tecnológicas.',
    rating: 4.6,
    recommendPct: 91,
    ceoApprovalPct: 94,
    subratings: {
      cultura: 4.7,
      diversidad: 4.6,
      conciliacion: 4.8,
      direccion: 4.5,
      sueldo: 4.2,
      carrera: 4.4,
    },
    counts: {
      reviews: 318,
      jobs: 24,
      salaries: 96,
      interviews: 84,
    },
  },
  {
    id: 'comp-3',
    slug: 'banco-aurora',
    name: 'Banco Aurora',
    industry: 'Banca y servicios financieros',
    hq: 'Monterrey, N. L.',
    size: 'Más de 5,000 empleados',
    founded: 1998,
    type: 'Empresa pública',
    website: 'https://bancoaurora.mx',
    description:
      'Institución financiera mexicana enfocada en banca digital, crédito empresarial y soluciones de ahorro.',
    rating: 3.6,
    recommendPct: 68,
    ceoApprovalPct: 74,
    subratings: {
      cultura: 3.5,
      diversidad: 3.8,
      conciliacion: 3.4,
      direccion: 3.4,
      sueldo: 3.9,
      carrera: 3.7,
    },
    counts: {
      reviews: 5420,
      jobs: 312,
      salaries: 1034,
      interviews: 910,
    },
  },
  {
    id: 'comp-4',
    slug: 'kora-salud',
    name: 'Kora Salud',
    industry: 'Salud y bienestar',
    hq: 'Guadalajara, Jal.',
    size: '501 a 1,000 empleados',
    founded: 2014,
    type: 'Empresa privada',
    website: 'https://korasalud.mx',
    description:
      'Red de clínicas de atención primaria y telemedicina accesible en las principales ciudades de México.',
    rating: 4.2,
    recommendPct: 84,
    ceoApprovalPct: 88,
    subratings: {
      cultura: 4.3,
      diversidad: 4.4,
      conciliacion: 4.0,
      direccion: 4.1,
      sueldo: 3.9,
      carrera: 4.1,
    },
    counts: {
      reviews: 642,
      jobs: 57,
      salaries: 188,
      interviews: 145,
    },
  },
  {
    id: 'comp-5',
    slug: 'impulsa-media',
    name: 'Impulsa Media',
    industry: 'Medios y tecnología',
    hq: 'Ciudad de México',
    size: '51 a 200 empleados',
    founded: 2020,
    type: 'Empresa privada',
    website: 'https://impulsamedia.mx',
    description:
      'Plataforma de contenidos digitales y analítica de audiencias para marcas en México.',
    rating: 4.0,
    recommendPct: 79,
    ceoApprovalPct: 82,
    subratings: {
      cultura: 4.1,
      diversidad: 4.2,
      conciliacion: 4.0,
      direccion: 3.8,
      sueldo: 3.7,
      carrera: 3.9,
    },
    counts: {
      reviews: 48,
      jobs: 14,
      salaries: 32,
      interviews: 29,
    },
  },
  {
    id: 'comp-6',
    slug: 'verde-foods',
    name: 'Verde Foods',
    industry: 'Alimentos y consumo',
    hq: 'Ciudad de México',
    size: '1,001 a 5,000 empleados',
    founded: 2011,
    type: 'Empresa privada',
    website: 'https://verdefoods.mx',
    description:
      'Producción y distribución de alimentos saludables con cadenas de suministro sustentables.',
    rating: 4.1,
    recommendPct: 81,
    ceoApprovalPct: 85,
    subratings: {
      cultura: 4.2,
      diversidad: 4.1,
      conciliacion: 3.9,
      direccion: 4.0,
      sueldo: 3.8,
      carrera: 4.0,
    },
    counts: {
      reviews: 215,
      jobs: 39,
      salaries: 74,
      interviews: 61,
    },
  },
];

export function formatCurrencyMXN(amount: number): string {
  return `$${Math.round(amount).toLocaleString('es-MX')}`;
}

export function formatSalaryRangeMXN(min: number, max: number): string {
  return `${formatCurrencyMXN(min)} - ${formatCurrencyMXN(max)}`;
}

export function formatCompactCount(count: number): string {
  if (count >= 1000) {
    const thousands = (count / 1000).toFixed(1).replace(/\.0$/, '');
    return `${thousands} mil`;
  }
  return count.toLocaleString('es-MX');
}
