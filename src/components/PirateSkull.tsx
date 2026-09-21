interface PirateSkullProps {
  className?: string;
}

export default function PirateSkull({ className }: PirateSkullProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <g fill="currentColor">
        <g transform="rotate(-40 32 32)">
          <rect x="6" y="29" width="52" height="6" rx="3" />
          <circle cx="8" cy="28.2" r="4.3" />
          <circle cx="8" cy="35.8" r="4.3" />
          <circle cx="56" cy="28.2" r="4.3" />
          <circle cx="56" cy="35.8" r="4.3" />
        </g>

        <g transform="rotate(40 32 32)">
          <rect x="6" y="29" width="52" height="6" rx="3" />
          <circle cx="8" cy="28.2" r="4.3" />
          <circle cx="8" cy="35.8" r="4.3" />
          <circle cx="56" cy="28.2" r="4.3" />
          <circle cx="56" cy="35.8" r="4.3" />
        </g>
      </g>
    </svg>
  );
}
