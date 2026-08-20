export default function GitHubIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="gh-grad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#2B2F36" />
          <stop offset="1" stopColor="#0D1117" />
        </linearGradient>
        <radialGradient id="gh-hl" cx="0.3" cy="0.15" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.16" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.04" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#gh-grad)" />
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#gh-hl)" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="#ffffff" strokeOpacity="0.10" />
      <path
        d="M24 11c-7.18 0-13 5.82-13 13 0 5.74 3.73 10.61 8.9 12.33.65.12.89-.28.89-.63 0-.31-.01-1.13-.02-2.22-3.62.79-4.39-1.75-4.39-1.75-.59-1.5-1.44-1.9-1.44-1.9-1.18-.8.09-.79.09-.79 1.3.09 1.99 1.34 1.99 1.34 1.16 1.98 3.04 1.41 3.78 1.08.12-.84.45-1.41.83-1.74-2.89-.33-5.93-1.44-5.93-6.42 0-1.42.51-2.58 1.34-3.49-.13-.33-.58-1.66.13-3.46 0 0 1.09-.35 3.58 1.33a12.4 12.4 0 0 1 6.52 0c2.49-1.68 3.58-1.33 3.58-1.33.71 1.8.26 3.13.13 3.46.83.91 1.34 2.07 1.34 3.49 0 5-3.04 6.09-5.94 6.41.47.4.88 1.19.88 2.41 0 1.74-.02 3.14-.02 3.57 0 .35.24.76.9.63A13.02 13.02 0 0 0 37 24c0-7.18-5.82-13-13-13Z"
        fill="#ffffff"
      />
    </svg>
  )
}
