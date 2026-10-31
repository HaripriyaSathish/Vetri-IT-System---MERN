// Animated cartoon illustrations for the Graphic Designing page (pure SVG + CSS, see styles/design.css).
// Chosen per section in the admin by name (`art`), with the alt text from the SEO document as `label`.

const Sparkle = ({ x, y, s = 1, d = 0, c = '#ffc83d' }) => (
  <path className="da-twinkle" style={{ animationDelay: `${d}s` }} fill={c}
    d={`M${x} ${y - 9 * s}q${1.6 * s} ${7.4 * s} ${9 * s} ${9 * s}q${-7.4 * s} ${1.6 * s} ${-9 * s} ${9 * s}q${-1.6 * s} ${-7.4 * s} ${-9 * s} ${-9 * s}q${7.4 * s} ${-1.6 * s} ${9 * s} ${-9 * s}z`} />
);

// Designer at a drawing screen, drawing a logo, with palette, visiting card, brochure and pen tool floating around
function HeroScene() {
  return (
    <svg viewBox="0 0 560 480">
      <defs>
        <linearGradient id="da-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e8efff" /><stop offset="1" stopColor="#fff1ea" /></linearGradient>
        <linearGradient id="da-screen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#ffffff" /><stop offset="1" stopColor="#f3f6fb" /></linearGradient>
        <linearGradient id="da-logo" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#e7510c" /><stop offset="1" stopColor="#ff9a5c" /></linearGradient>
      </defs>
      <circle cx="300" cy="230" r="200" fill="url(#da-bg)" />
      <circle className="da-orbit" cx="300" cy="230" r="222" fill="none" stroke="#c9d6f2" strokeWidth="2" strokeDasharray="4 12" />

      {/* desk */}
      <rect x="60" y="356" width="460" height="16" rx="8" fill="#002673" />
      <rect x="92" y="372" width="12" height="80" rx="5" fill="#1d3f8f" /><rect x="476" y="372" width="12" height="80" rx="5" fill="#1d3f8f" />

      {/* drawing screen */}
      <g className="da-float-sm">
        <rect x="232" y="96" width="272" height="196" rx="18" fill="#002673" />
        <rect x="244" y="108" width="248" height="172" rx="10" fill="url(#da-screen)" />
        <rect x="254" y="120" width="22" height="148" rx="6" fill="#e8efff" />
        {['#e7510c', '#002673', '#18b47b', '#7c5cff', '#ffc83d'].map((c, i) => <rect key={c} x="259" y={128 + i * 26} width="12" height="12" rx="3" fill={c} />)}
        {/* logo being drawn */}
        <g transform="translate(384 186)">
          <circle r="52" fill="none" stroke="#dbe5f7" strokeWidth="1.5" strokeDasharray="3 5" />
          <circle className="da-draw" r="40" fill="none" stroke="#002673" strokeWidth="7" strokeLinecap="round" pathLength="100" />
          <path className="da-draw da-draw--2" d="M-18 14 C-18 -16 4 -26 20 -22 C14 -6 4 10 -18 14 Z" fill="none" stroke="#e7510c" strokeWidth="6" strokeLinejoin="round" pathLength="100" />
          <path className="da-fill" d="M-18 14 C-18 -16 4 -26 20 -22 C14 -6 4 10 -18 14 Z" fill="url(#da-logo)" />
          <circle className="da-pop" cx="20" cy="-22" r="5" fill="#fff" stroke="#e7510c" strokeWidth="2.5" />
          <circle className="da-pop da-pop--2" cx="-18" cy="14" r="5" fill="#fff" stroke="#e7510c" strokeWidth="2.5" />
        </g>
        {/* swatches under the artboard */}
        {['#e7510c', '#ff9a5c', '#002673', '#18b47b'].map((c, i) => <circle key={c} className="da-swatch" style={{ animationDelay: `${i * 0.25}s` }} cx={318 + i * 26} cy="262" r="7" fill={c} />)}
        <rect x="350" y="292" width="36" height="40" fill="#1d3f8f" /><rect x="320" y="330" width="96" height="12" rx="6" fill="#002673" />
      </g>

      {/* chair */}
      <rect x="66" y="250" width="22" height="104" rx="11" fill="#7c5cff" />
      <rect x="70" y="330" width="96" height="18" rx="9" fill="#6a4be8" />

      {/* designer */}
      <g className="da-body">
        <path d="M92 344 v-70 c0-30 22-52 52-52 s52 22 52 52 v70 z" fill="#e7510c" />
        <path d="M126 226 l18 22 l18 -22" fill="#fff" />
        {/* drawing arm with stylus */}
        <g className="da-arm">
          <path d="M176 250 C204 262 214 292 236 318" fill="none" stroke="#e7510c" strokeWidth="20" strokeLinecap="round" />
          <circle cx="240" cy="322" r="11" fill="#c98b62" />
          <rect x="242" y="296" width="6" height="34" rx="3" fill="#002673" transform="rotate(28 245 313)" />
        </g>
        {/* head */}
        <g className="da-head">
          <rect x="133" y="200" width="22" height="24" rx="8" fill="#b97a52" />
          <circle cx="144" cy="176" r="38" fill="#c98b62" />
          <path d="M106 176 c-4 -34 22 -54 46 -50 c24 4 34 22 32 44 c-10 -14 -30 -20 -50 -18 c-12 2 -22 10 -28 24 z" fill="#2b1d16" />
          <circle cx="170" cy="128" r="14" fill="#2b1d16" />
          <circle cx="104" cy="182" r="6" fill="#c98b62" />
          <g className="da-blink"><circle cx="134" cy="178" r="4" fill="#2b1d16" /><circle cx="160" cy="178" r="4" fill="#2b1d16" /></g>
          <path d="M136 194 q11 10 22 0" fill="none" stroke="#2b1d16" strokeWidth="3" strokeLinecap="round" />
          <circle cx="126" cy="190" r="5" fill="#ff8a80" opacity=".5" /><circle cx="168" cy="190" r="5" fill="#ff8a80" opacity=".5" />
        </g>
      </g>

      {/* drawing tablet on desk */}
      <rect x="196" y="336" width="98" height="20" rx="6" fill="#1d3f8f" /><rect x="204" y="340" width="82" height="12" rx="3" fill="#3d64c4" />

      {/* mug with steam */}
      <g transform="translate(450 318)">
        <path className="da-steam" d="M8 -6 q-6 -10 0 -18 q6 -8 0 -18" fill="none" stroke="#9fb3dc" strokeWidth="3" strokeLinecap="round" />
        <path className="da-steam da-steam--2" d="M20 -6 q-6 -10 0 -18 q6 -8 0 -18" fill="none" stroke="#9fb3dc" strokeWidth="3" strokeLinecap="round" />
        <rect x="0" y="0" width="30" height="38" rx="6" fill="#18b47b" /><path d="M30 10 h6 a8 8 0 0 1 0 16 h-6" fill="none" stroke="#18b47b" strokeWidth="5" />
      </g>

      {/* floating palette */}
      <g className="da-float" style={{ animationDelay: '-1s' }}>
        <path d="M40 92 c0 -32 34 -52 66 -44 c30 8 36 34 22 44 c-10 8 -24 2 -26 14 c-2 14 14 18 6 28 c-14 16 -68 4 -68 -42 z" fill="#fff" stroke="#e3e9f4" strokeWidth="2" />
        {[['#e7510c', 66, 70], ['#ffc83d', 88, 62], ['#18b47b', 60, 96], ['#7c5cff', 78, 116]].map(([c, x, y]) => <circle key={c} cx={x} cy={y} r="8" fill={c} />)}
      </g>

      {/* flipping visiting card */}
      <g transform="translate(470 40)">
        <g className="da-flip">
          <g className="da-face-front">
            <rect width="78" height="48" rx="6" fill="#002673" />
            <circle cx="18" cy="24" r="9" fill="#e7510c" />
            <rect x="34" y="17" width="34" height="5" rx="2.5" fill="#fff" /><rect x="34" y="27" width="22" height="4" rx="2" fill="#9fb3dc" />
          </g>
          <g className="da-face-back">
            <rect width="78" height="48" rx="6" fill="#fff" stroke="#002673" strokeWidth="2" />
            {[12, 22, 32].map((y) => <rect key={y} x="10" y={y} width={y === 12 ? 44 : 56} height="4" rx="2" fill="#c9d6f2" />)}
          </g>
        </g>
      </g>

      {/* pen tool bezier */}
      <g className="da-float" style={{ animationDelay: '-2.2s' }}>
        <path d="M150 50 C190 10 240 80 280 40" fill="none" stroke="#7c5cff" strokeWidth="3" />
        <line x1="190" y1="20" x2="150" y2="50" stroke="#c4b8ff" strokeWidth="1.5" /><circle cx="190" cy="20" r="4" fill="#c4b8ff" />
        <rect x="145" y="45" width="10" height="10" fill="#fff" stroke="#7c5cff" strokeWidth="2" />
        <rect x="275" y="35" width="10" height="10" fill="#fff" stroke="#7c5cff" strokeWidth="2" />
      </g>

      {/* brochure folding */}
      <g transform="translate(14 230)"><g className="da-float-sm" style={{ animationDelay: '-1.4s' }}>
        <rect width="38" height="54" rx="3" fill="#fff" stroke="#e3e9f4" strokeWidth="2" />
        <rect x="6" y="8" width="26" height="14" rx="2" fill="#ffd9c4" /><rect x="6" y="28" width="22" height="3" fill="#c9d6f2" /><rect x="6" y="35" width="18" height="3" fill="#c9d6f2" />
        <g className="da-page"><rect x="38" width="38" height="54" rx="3" fill="#f3f6fb" stroke="#e3e9f4" strokeWidth="2" /><rect x="44" y="10" width="26" height="3" fill="#c9d6f2" /><rect x="44" y="17" width="20" height="3" fill="#c9d6f2" /></g>
      </g></g>

      <Sparkle x={130} y={64} /><Sparkle x={520} y={150} s={0.8} d={0.8} c="#e7510c" /><Sparkle x={36} y={196} s={0.7} d={1.4} c="#7c5cff" /><Sparkle x={500} y={400} s={0.9} d={0.4} />
    </svg>
  );
}

// Logo mark drawn stroke by stroke on an artboard
function LogoArt() {
  return (
    <svg viewBox="0 0 240 160">
      <rect x="20" y="12" width="200" height="136" rx="14" fill="#fff" />
      {[60, 100, 140, 180].map((x) => <line key={x} x1={x} y1="20" x2={x} y2="140" stroke="#eef3fc" strokeWidth="1.5" />)}
      {[50, 80, 110].map((y) => <line key={y} x1="28" y1={y} x2="212" y2={y} stroke="#eef3fc" strokeWidth="1.5" />)}
      <g transform="translate(120 80)">
        <circle className="da-draw" r="40" fill="none" stroke="#002673" strokeWidth="6" pathLength="100" />
        <path className="da-fill" d="M-20 16 L0 -26 L20 16 Z" fill="#e7510c" />
        <path className="da-draw da-draw--2" d="M-20 16 L0 -26 L20 16 Z" fill="none" stroke="#e7510c" strokeWidth="4" strokeLinejoin="round" pathLength="100" />
        <circle className="da-pop" cy="4" r="6" fill="#ffc83d" />
      </g>
      <g transform="translate(150 40)"><g className="da-cursor"><path d="M0 0 l14 30 l4 -12 l12 -4 z" fill="#002673" stroke="#fff" strokeWidth="2" /></g></g>
      <Sparkle x={196} y={36} s={0.7} c="#e7510c" /><Sparkle x={44} y={126} s={0.6} d={0.9} />
    </svg>
  );
}

// Visiting card flipping between front and back
function CardArt() {
  return (
    <svg viewBox="0 0 240 160">
      <ellipse className="da-shadow" cx="120" cy="140" rx="70" ry="8" fill="#002673" opacity=".12" />
      <g transform="translate(50 32)">
        <g className="da-flip">
          <g className="da-face-front">
            <rect width="140" height="88" rx="10" fill="#002673" />
            <path d="M0 64 Q70 40 140 70 V78 a10 10 0 0 1 -10 10 H10 a10 10 0 0 1 -10 -10 z" fill="#e7510c" />
            <circle cx="30" cy="30" r="14" fill="#fff" /><path d="M24 36 L30 22 L36 36 Z" fill="#e7510c" />
            <rect x="54" y="22" width="66" height="7" rx="3.5" fill="#fff" /><rect x="54" y="34" width="44" height="5" rx="2.5" fill="#9fb3dc" />
          </g>
          <g className="da-face-back">
            <rect width="140" height="88" rx="10" fill="#fff" stroke="#002673" strokeWidth="2.5" />
            <rect y="0" width="12" height="88" rx="6" fill="#e7510c" />
            {[[22, 70], [38, 90], [54, 80], [70, 60]].map(([y, w]) => <g key={y}><circle cx="28" cy={y} r="4" fill="#e7510c" /><rect x="38" y={y - 3} width={w} height="6" rx="3" fill="#c9d6f2" /></g>)}
          </g>
        </g>
      </g>
      <Sparkle x={206} y={30} s={0.7} /><Sparkle x={32} y={44} s={0.6} d={1} c="#e7510c" />
    </svg>
  );
}

// A5 brochure with a page turning
function BrochureArt() {
  return (
    <svg viewBox="0 0 240 160">
      <ellipse cx="120" cy="146" rx="84" ry="7" fill="#002673" opacity=".1" />
      <g transform="translate(40 22)">
        <rect width="80" height="114" rx="4" fill="#fff" stroke="#dbe5f7" strokeWidth="2" />
        <rect x="10" y="12" width="60" height="34" rx="4" fill="#ffd9c4" /><circle cx="28" cy="28" r="7" fill="#e7510c" />
        {[56, 66, 76, 86, 96].map((y, i) => <rect key={y} x="10" y={y} width={i % 2 ? 44 : 60} height="4" rx="2" fill="#c9d6f2" />)}
        <rect x="80" width="80" height="114" rx="4" fill="#fff" stroke="#dbe5f7" strokeWidth="2" />
        {[14, 24, 34].map((y) => <rect key={y} x="90" y={y} width="56" height="4" rx="2" fill="#c9d6f2" />)}
        <rect x="90" y="48" width="26" height="26" rx="4" fill="#e8efff" /><rect x="122" y="48" width="26" height="26" rx="4" fill="#dff5ec" />
        <rect x="90" y="82" width="58" height="20" rx="4" fill="#002673" />
        <g className="da-turn">
          <rect x="80" width="80" height="114" rx="4" fill="#f8faff" stroke="#c9d6f2" strokeWidth="2" />
          {[18, 28, 38, 48].map((y) => <rect key={y} x="92" y={y} width="50" height="4" rx="2" fill="#dbe5f7" />)}
        </g>
      </g>
      <text x="208" y="34" className="da-tag" textAnchor="middle">A5</text>
    </svg>
  );
}

// Logo, visiting card and brochure stacked as one package
function PackageArt() {
  return (
    <svg viewBox="0 0 240 180">
      <circle cx="120" cy="96" r="72" fill="#fff1ea" />
      <g transform="translate(30 70)"><g className="da-float" style={{ animationDelay: '-.6s' }}>
        <rect width="62" height="88" rx="4" fill="#fff" stroke="#dbe5f7" strokeWidth="2" transform="rotate(-10)" />
        <rect x="8" y="10" width="44" height="22" rx="3" fill="#ffd9c4" transform="rotate(-10)" />
        {[40, 50, 60].map((y) => <rect key={y} x="8" y={y} width="40" height="4" rx="2" fill="#c9d6f2" transform="rotate(-10)" />)}
      </g></g>
      <g transform="translate(130 104)"><g className="da-float" style={{ animationDelay: '-1.8s' }}>
        <rect width="86" height="54" rx="7" fill="#002673" transform="rotate(8)" />
        <circle cx="20" cy="26" r="9" fill="#e7510c" transform="rotate(8)" /><rect x="36" y="20" width="38" height="6" rx="3" fill="#fff" transform="rotate(8)" />
      </g></g>
      <g transform="translate(120 58)"><g className="da-float">
        <circle r="34" fill="#fff" stroke="#e7510c" strokeWidth="5" />
        <path d="M-15 12 L0 -18 L15 12 Z" fill="#e7510c" /><circle cy="2" r="5" fill="#ffc83d" />
      </g></g>
      <Sparkle x={196} y={40} /><Sparkle x={44} y={46} s={0.7} d={0.7} c="#e7510c" /><Sparkle x={214} y={150} s={0.6} d={1.3} c="#7c5cff" />
    </svg>
  );
}

// Company profile brochure cover with growing bars
function ProfileArt() {
  return (
    <svg viewBox="0 0 240 180">
      <circle cx="120" cy="92" r="74" fill="#e8efff" />
      <rect x="92" y="34" width="96" height="128" rx="6" fill="#fff" stroke="#dbe5f7" strokeWidth="2" transform="rotate(8 140 98)" />
      <g className="da-float-sm">
        <rect x="58" y="24" width="104" height="136" rx="6" fill="#fff" stroke="#c9d6f2" strokeWidth="2" />
        <rect x="58" y="24" width="104" height="44" rx="6" fill="#002673" />
        <circle cx="80" cy="46" r="10" fill="#e7510c" /><rect x="96" y="40" width="54" height="6" rx="3" fill="#fff" /><rect x="96" y="50" width="34" height="4" rx="2" fill="#9fb3dc" />
        {[[72, 30, '#e7510c'], [90, 44, '#ff9a5c'], [108, 22, '#18b47b'], [126, 52, '#7c5cff']].map(([x, h, c], i) => (
          <rect key={x} className="da-bar" style={{ animationDelay: `${i * 0.2}s` }} x={x} y={138 - h} width="12" height={h} rx="3" fill={c} />
        ))}
        <line x1="68" y1="140" x2="152" y2="140" stroke="#dbe5f7" strokeWidth="2" />
        {[80, 88].map((y) => <rect key={y} x="70" y={y} width="80" height="4" rx="2" fill="#c9d6f2" />)}
      </g>
      <Sparkle x={194} y={38} s={0.8} c="#e7510c" /><Sparkle x={40} y={140} s={0.6} d={1} />
    </svg>
  );
}

// Shop front, waving business owner, freelancer laptop and startup rocket
function AudienceArt() {
  return (
    <svg viewBox="0 0 240 180">
      <circle cx="120" cy="96" r="76" fill="#fff1ea" />
      {/* shop */}
      <rect x="22" y="78" width="78" height="80" rx="4" fill="#fff" stroke="#dbe5f7" strokeWidth="2" />
      <path d="M18 66 h86 l-6 18 h-74 z" fill="#e7510c" />
      {[30, 50, 70].map((x) => <path key={x} d={`M${x} 66 h10 l-2 18 h-10 z`} fill="#fff" opacity=".8" />)}
      <rect x="34" y="104" width="24" height="54" rx="3" fill="#002673" /><rect x="66" y="100" width="24" height="22" rx="3" fill="#e8efff" />
      {/* person waving */}
      <g transform="translate(140 74)">
        <path d="M-22 84 v-30 c0 -16 10 -26 22 -26 s22 10 22 26 v30 z" fill="#002673" />
        <g className="da-wave"><path d="M16 36 C30 28 34 14 32 2" fill="none" stroke="#002673" strokeWidth="9" strokeLinecap="round" /><circle cx="32" cy="0" r="6" fill="#c98b62" /></g>
        <circle cy="10" r="17" fill="#c98b62" />
        <path d="M-17 8 c0 -20 34 -20 34 -2 c-8 -8 -24 -8 -34 2 z" fill="#2b1d16" />
        <g className="da-blink"><circle cx="-6" cy="12" r="2.4" fill="#2b1d16" /><circle cx="6" cy="12" r="2.4" fill="#2b1d16" /></g>
        <path d="M-5 19 q5 5 10 0" fill="none" stroke="#2b1d16" strokeWidth="2" strokeLinecap="round" />
      </g>
      {/* laptop */}
      <g transform="translate(172 128)"><rect width="50" height="30" rx="4" fill="#3d64c4" /><rect x="4" y="4" width="42" height="22" rx="2" fill="#e8efff" /><rect x="-6" y="30" width="62" height="6" rx="3" fill="#002673" /><path className="da-swatch" d="M14 18 l8 -8 l6 6 l8 -8" fill="none" stroke="#18b47b" strokeWidth="2.5" /></g>
      {/* rocket */}
      <g transform="translate(196 30)"><g className="da-rocket">
        <path d="M0 0 c10 6 14 20 10 34 h-20 c-4 -14 0 -28 10 -34 z" fill="#fff" stroke="#002673" strokeWidth="2.5" />
        <circle cy="16" r="4.5" fill="#7c5cff" /><path d="M-10 34 l-6 8 h8 z M10 34 l6 8 h-8 z" fill="#e7510c" />
        <path className="da-flame" d="M-5 36 q5 16 10 0 z" fill="#ffc83d" />
      </g></g>
      <Sparkle x={150} y={40} s={0.7} c="#7c5cff" /><Sparkle x={30} y={42} s={0.6} d={0.8} />
    </svg>
  );
}

const ARTS = { hero: HeroScene, logo: LogoArt, card: CardArt, brochure: BrochureArt, package: PackageArt, profile: ProfileArt, audience: AudienceArt };
export const DESIGN_ART_OPTIONS = [
  ['', 'None'], ['hero', 'Designer at work (hero)'], ['logo', 'Logo being drawn'], ['card', 'Visiting card flip'], ['brochure', 'Brochure page turn'],
  ['package', 'Logo + card + brochure package'], ['profile', 'Company profile brochure'], ['audience', 'Small businesses'],
];

export default function DesignArt({ name, label, className = '' }) {
  const Art = ARTS[name];
  if (!Art) return null;
  return (
    <div className={`dart dart--${name} ${className}`} role="img" aria-label={label || undefined} aria-hidden={label ? undefined : 'true'}>
      <Art />
    </div>
  );
}
