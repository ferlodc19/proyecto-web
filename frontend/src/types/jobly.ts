export type SalarySource = 'employer' | 'estimate';
export type JobStatus = 'draft' | 'pending_review' | 'open' | 'paused' | 'closed';
export type ApplyMethod = 'quick' | 'external';
export type WorkModality = 'presencial' | 'hibrido' | 'remoto';
export type WorkSchedule = 'tiempo_completo' | 'medio_tiempo' | 'proyecto' | 'primer_empleo';
export type ExperienceLevel = 'sin_experiencia' | '1_2' | '3_5' | 'mas_5';
export type EmploymentStatus = 'current' | 'former';
export type BusinessOutlook = 'positive' | 'neutral' | 'negative';
export type ModerationStatus = 'pending' | 'approved' | 'rejected';
export type SalaryPeriod = 'monthly' | 'annual';
export type InterviewOutcome = 'accepted' | 'declined' | 'no_offer';
export type InterviewExperience = 'positive' | 'neutral' | 'negative';
export type InterviewDifficulty = 'easy' | 'medium' | 'hard';
export type ApplicationStatus = 'sent' | 'viewed' | 'in_process' | 'closed';
export type AlertFrequency = 'instant' | 'daily' | 'weekly';
export type EmployerRole = 'owner' | 'recruiter';
export type VerificationMethod = 'corporate_email' | 'document';
export type NotificationType =
  | 'alert_match'
  | 'application_status'
  | 'content_moderation'
  | 'employer_message';

export interface CompanySubratings {
  cultura: number;
  diversidad: number;
  conciliacion: number;
  direccion: number;
  sueldo: number;
  carrera: number;
}

export interface CompanyCounts {
  reviews: number;
  jobs: number;
  salaries: number;
  interviews: number;
}

export interface Company {
  id: string;
  slug: string;
  name: string;
  logoUrl?: string;
  industry: string;
  hq: string;
  size: string;
  founded?: number;
  type?: string;
  website?: string;
  description?: string;
  rating: number;
  recommendPct: number;
  ceoApprovalPct: number;
  subratings: CompanySubratings;
  counts: CompanyCounts;
}

export interface JobQuestion {
  id: string;
  label: string;
  required: boolean;
}

export interface Job {
  id: string;
  companyId: string;
  companyName: string;
  companyRating?: number;
  companyLogoUrl?: string;
  title: string;
  location: string;
  remote: boolean;
  modality: WorkModality;
  schedule: WorkSchedule;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  salarySource: SalarySource;
  quickApply: boolean;
  applyMethod: ApplyMethod;
  externalUrl?: string;
  skills: string[];
  lookingFor: string[];
  responsibilities: string[];
  postedAt: string;
  postedDaysAgo: number;
  expiresAt?: string;
  status: JobStatus;
  questions?: JobQuestion[];
}

export interface Review {
  id: string;
  companyId: string;
  rating: number;
  title: string;
  pros: string;
  cons: string;
  jobTitle: string;
  location: string;
  employmentStatus: EmploymentStatus;
  recommends: boolean;
  approvesCeo: boolean;
  outlook: BusinessOutlook;
  helpfulCount: number;
  createdAt: string;
  moderationStatus: ModerationStatus;
}

export interface Salary {
  id: string;
  jobTitle: string;
  companyId?: string;
  companyName?: string;
  location: string;
  yearsExp: string;
  basePay: number;
  extraPay: number;
  period: SalaryPeriod;
}

export interface Interview {
  id: string;
  jobTitle: string;
  companyId: string;
  date: string;
  outcome: InterviewOutcome;
  experience: InterviewExperience;
  difficulty: InterviewDifficulty;
  source: string;
  text: string;
  questions: {
    question: string;
    suggestedAnswer?: string;
  }[];
}

export interface UserExperience {
  title: string;
  company: string;
  from: string;
  to?: string;
}

export interface UserEducation {
  institution: string;
  degree: string;
  from: string;
  to?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  location: string;
  phone?: string;
  skills: string[];
  experience: UserExperience[];
  education: UserEducation[];
  cvFileUrl?: string;
  savedJobIds: string[];
  followedCompanyIds: string[];
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  jobId: string;
  status: ApplicationStatus;
  createdAt: string;
  cvSnapshotUrl?: string;
  answers: { questionId: string; answer: string }[];
  channel: ApplyMethod;
}

export interface JobAlert {
  id: string;
  userId: string;
  query: string;
  location: string;
  filters: Record<string, string>;
  frequency: AlertFrequency;
  active: boolean;
}

export interface Employer {
  id: string;
  companyId: string;
  members: { userId: string; role: EmployerRole }[];
  verifiedAt?: string;
  verificationMethod: VerificationMethod;
}

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  link?: string;
  readAt?: string;
  createdAt: string;
}
