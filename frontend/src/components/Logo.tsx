interface LogoProps {
  height?: number;
  variant?: 'default' | 'inverted' | 'mint';
  className?: string;
}

export function Logo({ height = 34, variant = 'default', className = '' }: LogoProps) {
  const textColor =
    variant === 'inverted' ? '#FFFFFF' : variant === 'mint' ? '#0A8A3A' : '#20262E';
  const handleColor =
    variant === 'inverted' ? '#B6F0C8' : variant === 'mint' ? '#0A8A3A' : '#0CAA41';

  return (
    <svg
      height={height}
      viewBox="0 0 132 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Jobly"
      className={`select-none ${className}`}
    >
      {/* Letra j */}
      <rect x="6" y="6.5" width="6.8" height="6.5" rx="1.5" fill={textColor} />
      <path
        d="M12.8 18V42.5C12.8 48.2 9.8 51.5 4.2 51.5H1.5V45.5H3.8C5.8 45.5 6.4 44.5 6.4 42.2V18H12.8Z"
        fill={textColor}
      />

      {/* Letra o como Lupa (misma altura y grosor que la b) */}
      <circle cx="34.5" cy="31" r="9.8" stroke={textColor} strokeWidth="6.4" />
      <path
        d="M42.2 38.7L49.5 46"
        stroke={handleColor}
        strokeWidth="6.4"
        strokeLinecap="round"
      />

      {/* Letra b */}
      <path
        d="M56 6H62.4V20.8C64.4 18.9 67.1 17.8 70.3 17.8C77.3 17.8 82.2 23.3 82.2 31C82.2 38.7 77.3 44.2 70.3 44.2C67.1 44.2 64.4 43.1 62.4 41.2V44H56V6ZM69.1 38.4C73.1 38.4 75.7 35.4 75.7 31C75.7 26.6 73.1 23.6 69.1 23.6C65.1 23.6 62.4 26.6 62.4 31C62.4 35.4 65.1 38.4 69.1 38.4Z"
        fill={textColor}
      />

      {/* Letra l */}
      <rect x="88.5" y="6" width="6.4" height="38" fill={textColor} />

      {/* Letra y */}
      <path
        d="M100.5 18H107.6L114.2 35.8L120.6 18H127.5L114.1 53H107.1L110.8 43.6L100.5 18Z"
        fill={textColor}
      />
    </svg>
  );
}
