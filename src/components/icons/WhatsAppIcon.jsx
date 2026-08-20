export default function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="wa-grad" x1="8" y1="4" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#25D366" />
          <stop offset="1" stopColor="#075E54" />
        </linearGradient>
        <radialGradient id="wa-hl" cx="0.3" cy="0.15" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="0.4" stopColor="#ffffff" stopOpacity="0.06" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#wa-grad)" />
      <rect x="1" y="1" width="46" height="46" rx="13" fill="url(#wa-hl)" />
      <rect x="1.5" y="1.5" width="45" height="45" rx="12.5" stroke="#ffffff" strokeOpacity="0.12" />
      <path
        d="M24 12.9c-6.13 0-11.1 4.97-11.1 11.1 0 2.05.56 3.96 1.53 5.6l.24.4-.94 3.44 3.53-.93.39.23A11.03 11.03 0 0 0 24 35.1c6.13 0 11.1-4.97 11.1-11.1S30.13 12.9 24 12.9Z"
        fill="#ffffff"
      />
      <path
        d="M19.86 18.2c-.24-.53-.5-.54-.73-.55h-.62c-.22 0-.57.08-.87.4-.3.32-1.14 1.1-1.14 2.7 0 1.58 1.16 3.1 1.32 3.32.16.21 2.24 3.6 5.55 4.9 2.75 1.08 3.3.86 3.9.81.6-.06 1.94-.79 2.22-1.55.27-.77.27-1.42.19-1.56-.08-.14-.3-.22-.62-.38-.33-.16-1.94-.96-2.24-1.07-.3-.11-.52-.16-.74.16-.22.33-.85 1.07-1.04 1.28-.19.22-.38.25-.71.08-.33-.16-1.38-.51-2.63-1.63-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.66.15-.15.33-.38.5-.58.16-.19.22-.33.33-.55.11-.22.06-.41-.03-.58-.08-.16-.7-1.78-1-2.42Z"
        fill="#075E54"
      />
    </svg>
  )
}
