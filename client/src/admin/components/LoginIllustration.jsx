// Animated cartoon for the admin login: a Vetri team member presenting a live dashboard.
// Pure SVG + CSS animations (see login.css, classes prefixed `ill-`).
export default function LoginIllustration() {
  return (
    <svg className="ill" viewBox="0 0 520 420" role="img" aria-label="Cartoon of a Vetri team member presenting a website dashboard">
      <defs>
        <linearGradient id="ill-screen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#f2f6fd" />
        </linearGradient>
        <linearGradient id="ill-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff8a4c" />
          <stop offset="1" stopColor="#e7510c" />
        </linearGradient>
        <filter id="ill-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="10" stdDeviation="10" floodColor="#000" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* backdrop */}
      <circle cx="260" cy="215" r="172" fill="rgba(255,255,255,0.06)" />
      <circle className="ill-ring" cx="260" cy="215" r="196" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="2" strokeDasharray="4 10" />
      <ellipse cx="260" cy="400" rx="210" ry="12" fill="rgba(0,0,0,0.18)" />

      {/* sparkles */}
      <g fill="#ffb38a">
        <path className="ill-twinkle" d="M60 40l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" />
        <path className="ill-twinkle ill-d2" d="M498 150l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" />
        <path className="ill-twinkle ill-d3" d="M300 26l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      </g>

      {/* desk */}
      <rect x="64" y="268" width="340" height="12" rx="6" fill="#ffffff" opacity="0.95" />
      <rect x="92" y="280" width="9" height="114" rx="4" fill="#c9d6ee" />
      <rect x="368" y="280" width="9" height="114" rx="4" fill="#c9d6ee" />

      {/* monitor with live dashboard */}
      <g filter="url(#ill-shadow)">
        <rect x="104" y="92" width="262" height="156" rx="14" fill="url(#ill-screen)" />
      </g>
      <rect x="104" y="92" width="262" height="22" rx="11" fill="#eef3fc" />
      <circle cx="120" cy="103" r="4" fill="#ff5f57" /><circle cx="133" cy="103" r="4" fill="#febc2e" /><circle cx="146" cy="103" r="4" fill="#28c840" />
      <rect x="104" y="114" width="50" height="134" fill="#002673" />
      <rect x="114" y="126" width="30" height="6" rx="3" fill="#e7510c" />
      <rect x="114" y="142" width="30" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
      <rect x="114" y="155" width="24" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
      <rect x="114" y="168" width="28" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
      <rect x="114" y="181" width="20" height="5" rx="2.5" fill="rgba(255,255,255,0.4)" />
      {/* stat tiles */}
      <rect x="166" y="124" width="56" height="26" rx="6" fill="#fff1ea" />
      <rect x="172" y="131" width="26" height="5" rx="2.5" fill="#e7510c" />
      <rect x="172" y="140" width="40" height="4" rx="2" fill="#f5b597" />
      <rect x="230" y="124" width="56" height="26" rx="6" fill="#eef3fc" />
      <rect x="236" y="131" width="30" height="5" rx="2.5" fill="#002673" />
      <rect x="236" y="140" width="40" height="4" rx="2" fill="#b9c8e1" />
      {/* growing bars */}
      <g>
        <rect className="ill-bar" x="170" y="196" width="14" height="40" rx="4" fill="url(#ill-bar)" />
        <rect className="ill-bar ill-d1" x="192" y="176" width="14" height="60" rx="4" fill="#002673" />
        <rect className="ill-bar ill-d2" x="214" y="186" width="14" height="50" rx="4" fill="url(#ill-bar)" />
        <rect className="ill-bar ill-d3" x="236" y="166" width="14" height="70" rx="4" fill="#002673" />
      </g>
      {/* drawing line chart */}
      <rect x="264" y="160" width="92" height="76" rx="8" fill="#ffffff" stroke="#e3e9f4" />
      <polyline className="ill-line" points="272,224 288,206 302,214 318,190 334,198 348,174" fill="none" stroke="#e7510c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="ill-dot" cx="348" cy="174" r="4.5" fill="#e7510c" />
      {/* stand */}
      <rect x="222" y="248" width="26" height="16" fill="#c9d6ee" />
      <rect x="200" y="262" width="70" height="7" rx="3.5" fill="#b9c8e1" />

      {/* plant */}
      <g className="ill-plant">
        <ellipse cx="86" cy="226" rx="8" ry="20" fill="#22c55e" transform="rotate(-25 86 226)" />
        <ellipse cx="98" cy="222" rx="8" ry="22" fill="#16a34a" transform="rotate(12 98 222)" />
        <ellipse cx="78" cy="236" rx="6" ry="14" fill="#4ade80" transform="rotate(-55 78 236)" />
      </g>
      <path d="M76 240h30l-4 28H80z" fill="#e7510c" />
      {/* mug with steam */}
      <rect x="330" y="246" width="20" height="22" rx="5" fill="#ffffff" stroke="#c9d6ee" />
      <path d="M350 251a6 6 0 0 1 0 12" fill="none" stroke="#c9d6ee" strokeWidth="3" />
      <path className="ill-steam" d="M336 240c-4-6 4-8 0-14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />
      <path className="ill-steam ill-d2" d="M344 240c-4-6 4-8 0-14" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2" strokeLinecap="round" />

      {/* character */}
      <g className="ill-person">
        {/* legs + shoes */}
        <rect x="426" y="298" width="14" height="96" rx="7" fill="#1d2b4f" />
        <rect x="451" y="298" width="14" height="96" rx="7" fill="#22325c" />
        <ellipse cx="430" cy="396" rx="14" ry="6" fill="#0f1a33" />
        <ellipse cx="461" cy="396" rx="14" ry="6" fill="#0f1a33" />
        {/* pointing arm (behind body) */}
        <g className="ill-arm-point">
          <rect x="370" y="214" width="58" height="14" rx="7" fill="#ffffff" stroke="#e3e9f4" />
          <circle cx="368" cy="221" r="8.5" fill="#f4c7a1" />
        </g>
        {/* body: white Vetri polo */}
        <rect x="414" y="206" width="64" height="104" rx="24" fill="#ffffff" stroke="#e3e9f4" strokeWidth="1.5" />
        <path d="M434 206l12 14 12-14" fill="none" stroke="#c9d6ee" strokeWidth="2" />
        <circle cx="464" cy="234" r="6" fill="none" stroke="#16a34a" strokeWidth="2" />
        {/* lanyard + ID card */}
        <path d="M438 212l8 30 8-30" fill="none" stroke="#002673" strokeWidth="2.5" />
        <rect x="439" y="240" width="14" height="18" rx="3" fill="#ffffff" stroke="#002673" strokeWidth="1.5" />
        <rect x="442" y="244" width="8" height="4" rx="1" fill="#e7510c" />
        {/* waving arm */}
        <g className="ill-arm-wave">
          <rect x="469" y="168" width="14" height="56" rx="7" fill="#ffffff" stroke="#e3e9f4" />
          <circle cx="476" cy="164" r="9.5" fill="#f4c7a1" />
        </g>
        {/* neck + head */}
        <rect x="439" y="192" width="14" height="18" rx="5" fill="#eab48f" />
        <g className="ill-head">
          <circle cx="446" cy="138" r="13" fill="#2d1e17" />
          <circle cx="446" cy="172" r="27" fill="#f4c7a1" />
          <path d="M418 172c0-18 12-29 28-29s28 11 28 29c-6-10-16-15-28-15s-22 5-28 15z" fill="#2d1e17" />
          <path d="M419 170c-3 14 0 26 6 34" fill="none" stroke="#2d1e17" strokeWidth="6" strokeLinecap="round" />
          <g className="ill-eyes">
            <ellipse cx="437" cy="176" rx="2.7" ry="3.5" fill="#1b1b2f" />
            <ellipse cx="455" cy="176" rx="2.7" ry="3.5" fill="#1b1b2f" />
          </g>
          <circle cx="431" cy="185" r="4" fill="#f59e9e" opacity="0.45" />
          <circle cx="461" cy="185" r="4" fill="#f59e9e" opacity="0.45" />
          <path d="M438 188q8 7 16 0" fill="none" stroke="#b4543a" strokeWidth="2.2" strokeLinecap="round" />
        </g>
      </g>

      {/* floating "Changes saved" card */}
      <g className="ill-float">
        <g filter="url(#ill-shadow)">
          <rect x="330" y="30" width="150" height="44" rx="14" fill="#ffffff" />
        </g>
        <circle cx="352" cy="52" r="12" fill="#dcfce7" />
        <path d="M346 52l4.5 4.5 8-8" fill="none" stroke="#16a34a" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        <text x="372" y="49" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="12" fontWeight="800" fill="#002673">Changes saved</text>
        <text x="372" y="63" fontFamily="Inter, sans-serif" fontSize="9.5" fill="#8592ad">Live on website</text>
      </g>

      {/* floating image card */}
      <g className="ill-float ill-d2">
        <g filter="url(#ill-shadow)">
          <rect x="14" y="128" width="78" height="60" rx="12" fill="#ffffff" />
        </g>
        <rect x="22" y="136" width="62" height="40" rx="6" fill="#eef3fc" />
        <circle cx="70" cy="146" r="5" fill="#e7510c" />
        <path d="M24 174l16-18 12 12 8-8 22 14z" fill="#002673" opacity="0.85" />
      </g>

      {/* spinning gear */}
      <g className="ill-gear">
        <circle cx="70" cy="64" r="17" fill="none" stroke="#e7510c" strokeWidth="7" strokeDasharray="5.5 4.5" />
        <circle cx="70" cy="64" r="11" fill="none" stroke="#e7510c" strokeWidth="4" />
      </g>
    </svg>
  );
}
