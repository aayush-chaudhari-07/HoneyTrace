export function HoneyJar() {
  return (
    <svg viewBox="0 0 200 240" fill="none" className="h-full w-full drop-shadow-xl">
      {/* lid */}
      <rect x="62" y="14" width="76" height="26" rx="8" fill="var(--color-espresso)" />
      <rect x="62" y="30" width="76" height="6" rx="3" fill="var(--color-primary-deep)" />
      {/* jar body */}
      <path
        d="M58 48h84l10 22v118a26 26 0 0 1-26 26H74a26 26 0 0 1-26-26V70l10-22Z"
        fill="var(--color-card)"
        stroke="var(--color-espresso)"
        strokeWidth="4"
      />
      {/* honey fill */}
      <path
        d="M52 96h96v92a22 22 0 0 1-22 22H74a22 22 0 0 1-22-22V96Z"
        fill="var(--color-primary)"
      />
      <path
        d="M52 96c10 8 22-6 32 0s22-6 32 0 22-6 32 0v14H52V96Z"
        fill="var(--color-primary-deep)"
        opacity="0.55"
      />
      {/* label */}
      <rect x="70" y="118" width="60" height="52" rx="8" fill="var(--color-background)" stroke="var(--color-espresso)" strokeWidth="2.5" />
      <path d="M100 128l12 7v14l-12 7-12-7v-14z" stroke="var(--color-primary-deep)" strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="82" y="158" width="36" height="4" rx="2" fill="var(--color-primary-deep)" opacity="0.6" />
      {/* glass shine */}
      <path d="M66 60c-4 10-6 20-6 34" stroke="var(--color-background)" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

export default HoneyJar;
