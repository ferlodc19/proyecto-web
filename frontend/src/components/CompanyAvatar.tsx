const AVATAR_PALETTE = ['#2B50EC', '#7C3AED', '#C2410C', '#20262E', '#0A8A3A'];

function getStableColor(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

interface CompanyAvatarProps {
  companyId: string;
  name: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function CompanyAvatar({
  companyId,
  name,
  logoUrl,
  size = 'sm',
}: CompanyAvatarProps) {
  const sizeClasses = {
    sm: 'w-[26px] h-[26px] text-[11px] rounded-xs',
    md: 'w-12 h-12 text-base rounded-md',
    lg: 'w-24 h-24 text-2xl rounded-lg',
  }[size];

  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt={`Logo de ${name}`}
        className={`${sizeClasses} object-cover border border-line bg-white shrink-0`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{ color: getStableColor(companyId || name) }}
      className={`${sizeClasses} font-brand font-extrabold bg-white border border-line inline-flex items-center justify-center shrink-0 select-none tracking-tight`}
    >
      {getInitials(name)}
    </div>
  );
}
