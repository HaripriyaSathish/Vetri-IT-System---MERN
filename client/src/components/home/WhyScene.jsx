import '../../styles/why-scene.css';

/* Animated cartoon scene for the home "Why Choose" section: a team cheering in front of a night
   city while a laptop builds a site, a rocket launches and confetti falls. Pure SVG + CSS motion.
   Animated parts are drawn around their own origin inside a translate() group, so CSS rotate/scale
   happen around that point (shoulder, flame top, bar baseline...). */

const CONFETTI = [
  [40, '#ffd23f', 0, 5.2], [95, '#ff5d8f', 1.6, 6.1], [150, '#3ddc97', 3.1, 5.6], [205, '#ff8a3d', 0.8, 6.4],
  [260, '#7cc6fe', 2.4, 5.0], [320, '#ffd23f', 4.0, 6.0], [370, '#c77dff', 1.2, 5.4], [425, '#ff5d8f', 3.6, 6.2],
  [480, '#3ddc97', 0.4, 5.8], [535, '#ff8a3d', 2.0, 5.3], [575, '#7cc6fe', 4.4, 6.6], [120, '#c77dff', 4.8, 5.9],
  [345, '#ff8a3d', 5.4, 5.5], [505, '#ffd23f', 5.8, 6.3],
];

const STARS = [[60, 95, 0], [190, 60, 1.1], [520, 80, 0.5], [565, 150, 1.8], [30, 190, 2.4], [410, 105, 1.4], [255, 112, 2.9]];

const BUILDINGS = [
  [0, 290, 52, '#123a8c'], [48, 250, 44, '#0e2f78'], [88, 300, 40, '#163f95'], [124, 232, 50, '#0f327d'],
  [400, 240, 48, '#0f327d'], [444, 285, 42, '#163f95'], [482, 222, 54, '#0e2f78'], [532, 268, 68, '#123a8c'],
];

function Windows({ x, y, w }) {
  const cells = [];
  for (let r = 0; y + 14 + r * 22 < 395; r += 1) {
    for (let c = 0; 8 + c * 14 + 7 < w; c += 1) {
      const lit = (r * 3 + c * 5 + x) % 4 !== 0;
      cells.push(
        <rect key={`${r}-${c}`} x={x + 8 + c * 14} y={y + 14 + r * 22} width="7" height="10" rx="1.5"
          className={lit ? 'ws-win' : 'ws-win ws-win--off'} style={{ animationDelay: `${((r + c + x) % 7) * 0.6}s` }} />,
      );
    }
  }
  return cells;
}

function Person({ x, skin, shirt, pants, hair, pose, delay }) {
  return (
    <g transform={`translate(${x} 400)`}>
      <ellipse cx="0" cy="2" rx="26" ry="5" className="ws-shadow" style={{ animationDelay: delay }} />
      <g className={`ws-jump ws-jump--${pose}`} style={{ animationDelay: delay }}>
        {/* legs + shoes */}
        <path d="M-8 -46 L-10 -4 M8 -46 L10 -4" stroke={pants} strokeWidth="11" strokeLinecap="round" />
        <ellipse cx="-12" cy="-2" rx="9" ry="5" fill="#1b1f3b" />
        <ellipse cx="12" cy="-2" rx="9" ry="5" fill="#1b1f3b" />

        {/* left arm */}
        <g transform="translate(-17 -88)">
          <g className={pose === 'cheer' ? 'ws-arm-l-up' : 'ws-arm-l-down'} style={{ animationDelay: delay }}>
            {pose === 'cheer'
              ? <path d="M0 0 L-16 -36" stroke={shirt} strokeWidth="10" strokeLinecap="round" />
              : <path d="M0 0 L-12 30" stroke={shirt} strokeWidth="10" strokeLinecap="round" />}
            <circle cx={pose === 'cheer' ? -16 : -12} cy={pose === 'cheer' ? -38 : 32} r="6" fill={skin} />
          </g>
        </g>

        {/* body */}
        <rect x="-21" y="-98" width="42" height="56" rx="15" fill={shirt} />
        <path d="M-21 -60 h42" stroke="rgba(0,0,0,.12)" strokeWidth="4" />

        {/* right arm, waving, holding a prop */}
        <g transform="translate(17 -88)">
          <g className="ws-arm-wave" style={{ animationDelay: delay }}>
            <path d="M0 0 L16 -36" stroke={shirt} strokeWidth="10" strokeLinecap="round" />
            <circle cx="16" cy="-38" r="6" fill={skin} />
            {pose === 'phone' && (
              <g transform="translate(12 -60)">
                <rect width="14" height="24" rx="3" fill="#1b1f3b" />
                <rect x="2" y="3" width="10" height="16" rx="1.5" className="ws-phone-screen" />
              </g>
            )}
            {pose === 'flag' && (
              <g transform="translate(16 -38)">
                <path d="M0 0 V-52" stroke="#5b3a1e" strokeWidth="3" strokeLinecap="round" />
                <g transform="translate(0 -52)">
                  <path className="ws-flag" d="M0 0 C10 -5 20 5 32 0 V20 C20 25 10 15 0 20 Z" fill="#e7510c" />
                </g>
              </g>
            )}
          </g>
        </g>

        {/* head */}
        <rect x="-6" y="-106" width="12" height="10" fill={skin} />
        <circle cx="0" cy="-122" r="21" fill={skin} />
        {hair}
        <g transform="translate(0 -122)">
          <g className="ws-blink" style={{ animationDelay: delay }}>
            <circle cx="-7" cy="0" r="2.6" fill="#1b1f3b" />
            <circle cx="7" cy="0" r="2.6" fill="#1b1f3b" />
          </g>
        </g>
        <circle cx="-12" cy="-114" r="3.5" fill="#ff8fa3" opacity=".55" />
        <circle cx="12" cy="-114" r="3.5" fill="#ff8fa3" opacity=".55" />
        <path d="M-8 -113 Q0 -104 8 -113 Z" fill="#7a1f2b" />
      </g>
    </g>
  );
}

export default function WhyScene({ label }) {
  return (
    <div className="why-scene" role="img" aria-label={label || 'Animated illustration of a team celebrating with the message Let us build something great'}>
      <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="wsSky" x1="0" y1="0" x2="0.4" y2="1">
            <stop offset="0" stopColor="#1b2a8f" />
            <stop offset="0.55" stopColor="#2f5fe0" />
            <stop offset="1" stopColor="#7b5cff" />
          </linearGradient>
          <radialGradient id="wsGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fff6c7" stopOpacity=".95" />
            <stop offset="1" stopColor="#fff6c7" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wsGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3ddc97" />
            <stop offset="1" stopColor="#14a37f" />
          </linearGradient>
        </defs>

        <rect width="600" height="420" fill="url(#wsSky)" />

        {/* light rays + glow behind the team */}
        <g transform="translate(300 300)">
          <g className="ws-rays">
            {Array.from({ length: 12 }, (_, i) => (
              <path key={i} d="M0 0 L-24 -420 L24 -420 Z" fill="#fff" opacity=".06" transform={`rotate(${i * 30})`} />
            ))}
          </g>
        </g>
        <circle cx="300" cy="230" r="150" fill="url(#wsGlow)" className="ws-glow" />

        {STARS.map(([x, y, d]) => (
          <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
            <path className="ws-star" style={{ animationDelay: `${d}s` }} d="M0 -9 L2.4 -2.4 L9 0 L2.4 2.4 L0 9 L-2.4 2.4 L-9 0 L-2.4 -2.4 Z" fill="#fff6c7" />
          </g>
        ))}

        {/* drifting clouds */}
        <g className="ws-cloud" style={{ animationDuration: '26s' }}>
          <path d="M0 130 a18 18 0 0 1 30 -12 a22 22 0 0 1 40 6 a14 14 0 0 1 6 26 H4 a14 14 0 0 1 -4 -20Z" fill="#fff" opacity=".85" />
        </g>
        <g className="ws-cloud" style={{ animationDuration: '34s', animationDelay: '-17s' }}>
          <path d="M0 200 a14 14 0 0 1 24 -9 a18 18 0 0 1 32 5 a11 11 0 0 1 4 20 H3 a11 11 0 0 1 -3 -16Z" fill="#fff" opacity=".6" />
        </g>

        {/* rocket launching from behind the city */}
        <g transform="translate(470 330)">
          <g className="ws-rocket">
            <g transform="translate(0 22)">
              <path className="ws-flame" d="M-7 0 Q0 30 7 0 Z" fill="#ffb703" />
              <path className="ws-flame ws-flame--in" d="M-4 0 Q0 18 4 0 Z" fill="#fff3b0" />
            </g>
            <path d="M-10 22 L-18 30 L-10 10 Z M10 22 L18 30 L10 10 Z" fill="#e7510c" />
            <path d="M0 -30 C14 -14 12 10 10 22 H-10 C-12 10 -14 -14 0 -30 Z" fill="#fff" />
            <circle cx="0" cy="-4" r="5.5" fill="#7cc6fe" stroke="#1b2a8f" strokeWidth="2" />
          </g>
        </g>

        {/* city skyline */}
        {BUILDINGS.map(([x, y, w, fill]) => (
          <g key={x}>
            <rect x={x} y={y} width={w} height={420 - y} rx="4" fill={fill} />
            <Windows x={x} y={y} w={w} />
          </g>
        ))}

        <path d="M0 382 Q150 360 300 372 T600 366 V420 H0 Z" fill="url(#wsGround)" />

        {/* floating laptop building a website */}
        <g transform="translate(300 178)">
          <g className="ws-float">
            <rect x="-78" y="-98" width="156" height="98" rx="9" fill="#1b1f3b" />
            <rect x="-70" y="-90" width="140" height="82" rx="4" fill="#f4f7ff" />
            <rect x="-70" y="-90" width="140" height="12" rx="4" fill="#dfe6fb" />
            <circle cx="-62" cy="-84" r="2.2" fill="#ff5d8f" />
            <circle cx="-55" cy="-84" r="2.2" fill="#ffd23f" />
            <circle cx="-48" cy="-84" r="2.2" fill="#3ddc97" />
            {[[-62, -70, 54, '#e7510c', 0], [-62, -60, 40, '#2f5fe0', 0.35], [-62, -50, 48, '#7b5cff', 0.7], [-62, -40, 30, '#3ddc97', 1.05], [-62, -30, 44, '#2f5fe0', 1.4]].map(([x, y, w, f, d]) => (
              <g key={y} transform={`translate(${x} ${y})`}>
                <rect className="ws-code" style={{ animationDelay: `${d}s` }} width={w} height="5" rx="2.5" fill={f} />
              </g>
            ))}
            {[[16, 22, '#ff8a3d', 0.2], [28, 34, '#2f5fe0', 0.5], [40, 46, '#3ddc97', 0.8], [52, 58, '#7b5cff', 1.1]].map(([x, h, f, d]) => (
              <g key={x} transform={`translate(${x} -16)`}>
                <rect className="ws-bar" style={{ animationDelay: `${d}s` }} x="0" y={-h} width="8" height={h} rx="2" fill={f} />
              </g>
            ))}
            <path d="M-92 0 H92 L84 10 H-84 Z" fill="#c9d3ee" />
            <rect x="-16" y="0" width="32" height="4" rx="2" fill="#9aa8d4" />
          </g>
        </g>

        {/* chat bubble with heart */}
        <g transform="translate(150 150)">
          <g className="ws-pop" style={{ animationDelay: '0.4s' }}>
            <path d="M-26 -20 H26 a8 8 0 0 1 8 8 V12 a8 8 0 0 1 -8 8 H-6 L-16 30 L-14 20 H-26 a8 8 0 0 1 -8 -8 V-12 a8 8 0 0 1 8 -8 Z" fill="#fff" />
            <path d="M0 10 C-14 0 -12 -12 -4 -12 C-1 -12 0 -9 0 -8 C0 -9 1 -12 4 -12 C12 -12 14 0 0 10 Z" fill="#ff5d8f" />
          </g>
        </g>

        {/* spinning gears */}
        <g transform="translate(455 150)">
          <g className="ws-gear">
            <path fill="#ffd23f" d="M-4 -22 h8 l2 6 5 2 6 -3 6 6 -3 6 2 5 6 2 v8 l-6 2 -2 5 3 6 -6 6 -6 -3 -5 2 -2 6 h-8 l-2 -6 -5 -2 -6 3 -6 -6 3 -6 -2 -5 -6 -2 v-8 l6 -2 2 -5 -3 -6 6 -6 6 3 5 -2 Z" />
            <circle r="7" fill="#2f5fe0" />
          </g>
        </g>
        <g transform="translate(488 182) scale(.6)">
          <g className="ws-gear ws-gear--rev">
            <path fill="#ff8a3d" d="M-4 -22 h8 l2 6 5 2 6 -3 6 6 -3 6 2 5 6 2 v8 l-6 2 -2 5 3 6 -6 6 -6 -3 -5 2 -2 6 h-8 l-2 -6 -5 -2 -6 3 -6 -6 3 -6 -2 -5 -6 -2 v-8 l6 -2 2 -5 -3 -6 6 -6 6 3 5 -2 Z" />
            <circle r="7" fill="#2f5fe0" />
          </g>
        </g>

        {/* the team */}
        <Person x={160} pose="phone" delay="0s" skin="#f6c9a5" shirt="#7b5cff" pants="#26306b"
          hair={<path d="M-21 -124 C-22 -146 22 -150 21 -124 C14 -136 -6 -138 -21 -124 Z" fill="#4a2c1a" />} />
        <Person x={300} pose="cheer" delay="0.25s" skin="#8d5a3b" shirt="#e7510c" pants="#1f2a5a"
          hair={<g fill="#1b1f3b"><circle cx="-12" cy="-138" r="9" /><circle cx="0" cy="-143" r="10" /><circle cx="12" cy="-138" r="9" /><circle cx="-18" cy="-128" r="6" /><circle cx="18" cy="-128" r="6" /></g>} />
        <Person x={440} pose="flag" delay="0.5s" skin="#f1bb8c" shirt="#10b9a0" pants="#26306b"
          hair={<path d="M-23 -100 C-30 -150 30 -150 23 -100 L18 -100 C20 -120 14 -134 0 -134 C-14 -134 -20 -120 -18 -100 Z" fill="#a0461f" />} />

        {/* confetti */}
        {CONFETTI.map(([x, fill, d, dur], i) => (
          <g key={i} transform={`translate(${x} -16)`}>
            <rect className="ws-confetti" style={{ animationDelay: `${d}s`, animationDuration: `${dur}s` }}
              x="-4" y="-2" width={i % 3 === 0 ? 6 : 9} height={i % 3 === 0 ? 6 : 4} rx={i % 3 === 0 ? 3 : 1} fill={fill} />
          </g>
        ))}
      </svg>

      <p className="why-scene__title" aria-hidden="true">
        {['Let', 'us', 'build', 'something', 'great'].map((w, i) => (
          <span key={w} style={{ animationDelay: `${i * 0.12}s` }}>{w}</span>
        ))}
        <b className="why-scene__spark">✦</b>
      </p>
    </div>
  );
}
