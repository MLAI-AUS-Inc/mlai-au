/**
 * HudOverlay Component
 * Responsive SVG/CSS-based HUD overlay that recreates the spaceship cockpit aesthetic
 * Replaces the static PNG HUD image for better scaling across screen sizes
 */

import { useEffect, useState, useRef } from 'react';

interface HudOverlayProps {
  className?: string;
}

// HUD color scheme
const HUD_COLOR = '#FF6B35';
const HUD_COLOR_LIGHT = 'rgba(255, 107, 53, 0.3)';

export function HudOverlay({ className = '' }: HudOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Track container dimensions for responsive SVG
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const { width, height } = dimensions;
  const cornerSize = Math.min(width, height) * 0.08; // Corner cut size
  const frameInset = 12; // Frame padding from edge
  const strokeWidth = 3;

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 3 }}
    >
      {/* SVG Frame and Crosshair */}
      {width > 0 && height > 0 && (
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox={`0 0 ${width} ${height}`}
          preserveAspectRatio="none"
        >
          {/* Outer frame with chamfered corners */}
          <path
            d={`
              M ${frameInset + cornerSize} ${frameInset}
              L ${width - frameInset - cornerSize} ${frameInset}
              L ${width - frameInset} ${frameInset + cornerSize}
              L ${width - frameInset} ${height - frameInset - cornerSize}
              L ${width - frameInset - cornerSize} ${height - frameInset}
              L ${frameInset + cornerSize} ${height - frameInset}
              L ${frameInset} ${height - frameInset - cornerSize}
              L ${frameInset} ${frameInset + cornerSize}
              Z
            `}
            fill="none"
            stroke={HUD_COLOR}
            strokeWidth={strokeWidth}
          />

          {/* Corner accent lines - top left */}
          <line
            x1={frameInset}
            y1={frameInset + cornerSize + 20}
            x2={frameInset}
            y2={frameInset + cornerSize + 80}
            stroke={HUD_COLOR}
            strokeWidth={strokeWidth + 2}
          />

          {/* Corner accent lines - top right */}
          <line
            x1={width - frameInset}
            y1={frameInset + cornerSize + 20}
            x2={width - frameInset}
            y2={frameInset + cornerSize + 80}
            stroke={HUD_COLOR}
            strokeWidth={strokeWidth + 2}
          />

          {/* Corner accent lines - bottom left */}
          <line
            x1={frameInset}
            y1={height - frameInset - cornerSize - 80}
            x2={frameInset}
            y2={height - frameInset - cornerSize - 20}
            stroke={HUD_COLOR}
            strokeWidth={strokeWidth + 2}
          />

          {/* Corner accent lines - bottom right */}
          <line
            x1={width - frameInset}
            y1={height - frameInset - cornerSize - 80}
            x2={width - frameInset}
            y2={height - frameInset - cornerSize - 20}
            stroke={HUD_COLOR}
            strokeWidth={strokeWidth + 2}
          />

          {/* Center crosshair */}
          <g transform={`translate(${width / 2}, ${height / 2})`}>
            {/* Horizontal lines */}
            <line x1="-40" y1="0" x2="-15" y2="0" stroke={HUD_COLOR} strokeWidth={2} />
            <line x1="15" y1="0" x2="40" y2="0" stroke={HUD_COLOR} strokeWidth={2} />
            {/* Vertical lines */}
            <line x1="0" y1="-40" x2="0" y2="-15" stroke={HUD_COLOR} strokeWidth={2} />
            <line x1="0" y1="15" x2="0" y2="40" stroke={HUD_COLOR} strokeWidth={2} />
            {/* Center dot */}
            <circle cx="0" cy="0" r="2" fill={HUD_COLOR} />
          </g>

          {/* Left vertical scale */}
          <g transform={`translate(${frameInset + 30}, ${height * 0.35})`}>
            <line x1="0" y1="0" x2="0" y2={height * 0.25} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="0" y1="0" x2="10" y2="0" stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="0" y1={height * 0.125} x2="8" y2={height * 0.125} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="0" y1={height * 0.25} x2="10" y2={height * 0.25} stroke={HUD_COLOR} strokeWidth={1} />
            {/* Scale bracket top */}
            <path d={`M -5 -5 L -5 5 L 0 5`} fill="none" stroke={HUD_COLOR} strokeWidth={1} />
            {/* Scale bracket bottom */}
            <path d={`M -5 ${height * 0.25 + 5} L -5 ${height * 0.25 - 5} L 0 ${height * 0.25 - 5}`} fill="none" stroke={HUD_COLOR} strokeWidth={1} />
          </g>

          {/* Right vertical scale */}
          <g transform={`translate(${width - frameInset - 30}, ${height * 0.35})`}>
            <line x1="0" y1="0" x2="0" y2={height * 0.25} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-10" y1="0" x2="0" y2="0" stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-8" y1={height * 0.0625} x2="0" y2={height * 0.0625} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-8" y1={height * 0.125} x2="0" y2={height * 0.125} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-8" y1={height * 0.1875} x2="0" y2={height * 0.1875} stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-10" y1={height * 0.25} x2="0" y2={height * 0.25} stroke={HUD_COLOR} strokeWidth={1} />
            {/* Scale bracket top */}
            <path d={`M 5 -5 L 5 5 L 0 5`} fill="none" stroke={HUD_COLOR} strokeWidth={1} />
            {/* Scale bracket bottom */}
            <path d={`M 5 ${height * 0.25 + 5} L 5 ${height * 0.25 - 5} L 0 ${height * 0.25 - 5}`} fill="none" stroke={HUD_COLOR} strokeWidth={1} />
          </g>

          {/* Right targeting reticle */}
          <g transform={`translate(${width - frameInset - 100}, ${height * 0.22})`}>
            <circle cx="0" cy="0" r="35" fill="none" stroke={HUD_COLOR} strokeWidth={2} />
            <circle cx="0" cy="0" r="25" fill="none" stroke={HUD_COLOR} strokeWidth={1} />
            <line x1="-45" y1="0" x2="-35" y2="0" stroke={HUD_COLOR} strokeWidth={2} />
            <line x1="35" y1="0" x2="45" y2="0" stroke={HUD_COLOR} strokeWidth={2} />
            <line x1="0" y1="-45" x2="0" y2="-35" stroke={HUD_COLOR} strokeWidth={2} />
            <line x1="0" y1="35" x2="0" y2="45" stroke={HUD_COLOR} strokeWidth={2} />
          </g>

          {/* Bottom panel outline */}
          <rect
            x={width * 0.25}
            y={height - frameInset - 100}
            width={width * 0.5}
            height={70}
            rx={8}
            fill={HUD_COLOR_LIGHT}
            stroke={HUD_COLOR}
            strokeWidth={2}
          />

          {/* Bottom left circle for mascot */}
          <g transform={`translate(${frameInset + 80}, ${height - frameInset - 80})`}>
            <circle cx="0" cy="0" r="55" fill="none" stroke={HUD_COLOR} strokeWidth={2} />
            {/* Tick marks around circle */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i * 15 - 90) * (Math.PI / 180);
              const innerR = i % 3 === 0 ? 58 : 56;
              const outerR = i % 3 === 0 ? 68 : 62;
              return (
                <line
                  key={i}
                  x1={Math.cos(angle) * innerR}
                  y1={Math.sin(angle) * innerR}
                  x2={Math.cos(angle) * outerR}
                  y2={Math.sin(angle) * outerR}
                  stroke={HUD_COLOR}
                  strokeWidth={i % 3 === 0 ? 2 : 1}
                />
              );
            })}
          </g>
        </svg>
      )}

      {/* MLAI Title */}
      <div
        className="absolute left-1/2 -translate-x-1/2 font-black tracking-tight"
        style={{
          top: frameInset + 5,
          color: HUD_COLOR,
          fontSize: 'clamp(32px, 5vw, 64px)',
          fontFamily: 'Impact, sans-serif',
          letterSpacing: '0.05em',
        }}
      >
        MLAI
      </div>

      {/* Left Stats Panel */}
      <div
        className="absolute font-mono text-xs sm:text-sm"
        style={{
          top: height * 0.1,
          left: frameInset + 25,
          color: HUD_COLOR,
        }}
      >
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">%LIGHTSPEED</div>
          <div className="text-sm sm:text-lg font-bold">87.3</div>
        </div>
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">SCAN RANGE</div>
          <div className="text-sm sm:text-lg font-bold">54.37 M</div>
        </div>
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">FUEL CORE</div>
          <div className="text-sm sm:text-lg font-bold">0.07</div>
        </div>
      </div>

      {/* Right Stats Panel */}
      <div
        className="absolute font-mono text-xs sm:text-sm text-right"
        style={{
          top: height * 0.1,
          right: frameInset + 140,
          color: HUD_COLOR,
        }}
      >
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">VECTOR</div>
          <div className="text-sm sm:text-lg font-bold">IL081In</div>
        </div>
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">SHIELDS</div>
          <div className="text-sm sm:text-lg font-bold">2.6</div>
        </div>
        <div className="mb-1">
          <div className="text-[10px] sm:text-xs opacity-80">DRIFT</div>
          <div className="text-sm sm:text-lg font-bold">10.31 %</div>
        </div>
      </div>

      {/* Left scale labels */}
      <div
        className="absolute font-mono text-[10px] sm:text-xs"
        style={{
          top: height * 0.38,
          left: frameInset + 45,
          color: HUD_COLOR,
        }}
      >
        <div>60.8%</div>
        <div style={{ marginTop: height * 0.18 }}>20.8%</div>
      </div>

      {/* Right scale labels */}
      <div
        className="absolute font-mono text-[10px] sm:text-xs text-right"
        style={{
          top: height * 0.38,
          right: frameInset + 45,
          color: HUD_COLOR,
        }}
      >
        <div>100%</div>
        <div style={{ marginTop: height * 0.04 }}>5.%</div>
        <div style={{ marginTop: height * 0.035 }}>0.%</div>
        <div style={{ marginTop: height * 0.035 }}>-5.%</div>
        <div style={{ marginTop: height * 0.04 }}>100%</div>
      </div>

      {/* Kangaroo mascot SVG in bottom left circle */}
      <div
        className="absolute"
        style={{
          left: frameInset + 25,
          bottom: frameInset + 25,
          width: 110,
          height: 110,
        }}
      >
        <svg
          viewBox="0 0 254 303"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          <g
            transform="translate(0,303) scale(0.1,-0.1)"
            fill={HUD_COLOR}
            stroke="none"
          >
            <path d="M110 2909 c-71 -74 -62 -262 27 -533 80 -246 187 -406 351 -528 62
-46 79 -80 111 -221 28 -121 25 -169 -22 -388 -40 -186 -53 -302 -66 -594 -12
-256 -53 -390 -169 -549 -38 -52 -36 -78 6 -84 16 -3 32 14 73 74 119 176 154
305 169 618 14 282 41 495 65 509 11 6 37 27 59 47 23 21 57 45 76 55 19 10
64 40 99 67 87 65 98 64 146 -20 13 -23 32 -39 55 -47 26 -9 36 -19 42 -44 12
-43 5 -43 250 -28 241 15 248 17 248 78 0 33 4 41 25 49 18 7 25 17 25 35 0
14 6 25 13 25 20 0 45 31 49 60 2 16 10 26 24 28 28 4 199 -125 294 -223 42
-42 97 -88 125 -102 65 -33 95 -61 95 -89 0 -51 -59 -56 -149 -14 -89 42 -142
49 -170 21 -48 -48 -6 -112 102 -157 90 -36 117 -69 117 -139 0 -73 -18 -93
-97 -105 -61 -10 -66 -9 -199 39 -140 51 -154 53 -154 22 0 -24 22 -42 83 -66
81 -33 70 -41 -60 -49 -65 -3 -161 -13 -213 -21 -312 -49 -493 -19 -616 103
-27 27 -55 62 -63 78 -7 16 -17 36 -21 44 -11 22 -64 20 -68 -3 -10 -53 115
-205 205 -247 85 -40 289 -76 370 -66 21 3 91 13 156 22 65 9 120 14 124 10 3
-3 -2 -41 -12 -83 -22 -99 -32 -379 -16 -440 9 -31 17 -43 30 -43 28 0 31 18
31 183 0 387 32 444 219 396 195 -49 268 -31 392 98 84 87 88 101 81 298 l-5
159 -38 40 c-23 26 -56 48 -89 59 -75 26 -67 50 20 58 95 8 113 23 144 122 3
9 17 22 30 27 19 7 26 19 31 54 5 32 13 47 26 51 23 7 32 38 27 91 l-3 39 -95
3 c-52 1 -176 -4 -275 -11 -198 -15 -204 -15 -349 41 -95 37 -91 33 -72 71 9
17 43 104 75 193 97 272 224 549 295 649 65 89 87 174 54 207 -22 22 -72 14
-104 -16 -48 -46 -124 -105 -214 -167 -316 -217 -427 -322 -563 -527 -131
-199 -151 -213 -185 -126 -78 201 -247 475 -384 623 -94 101 -340 276 -438
312 -62 22 -87 17 -130 -28z m123 -51 c12 -6 38 -24 57 -40 19 -15 39 -28 44
-28 12 0 87 -60 149 -119 78 -74 154 -182 192 -272 50 -121 105 -449 105 -628
0 -93 4 -132 13 -139 53 -44 87 161 52 318 -9 41 -27 129 -40 195 -14 66 -30
142 -36 168 -6 27 -8 51 -5 55 25 24 99 -97 188 -310 34 -82 67 -148 73 -148
6 0 28 -10 50 -21 35 -19 48 -20 105 -13 141 18 270 11 325 -18 93 -48 108
-88 34 -88 -26 0 -42 -5 -46 -15 -8 -23 -4 -25 100 -40 112 -17 147 -29 147
-50 0 -21 -18 -23 -275 -30 -375 -10 -434 -16 -486 -48 -55 -34 -160 -105
-217 -146 -65 -47 -72 -43 -72 40 0 74 -46 284 -75 339 -8 16 -38 48 -67 72
-185 154 -230 217 -322 451 -76 192 -122 477 -84 515 15 15 63 15 91 0z m1797
-151 c0 -7 -29 -56 -64 -109 -73 -112 -252 -534 -295 -695 -14 -52 -24 -53
-91 -8 -75 50 -145 68 -248 63 -108 -6 -109 -2 -31 114 135 202 186 252 499
487 216 162 230 171 230 148z m80 -1113 c13 -32 -2 -54 -36 -54 -25 0 -42 36
-30 65 10 26 55 18 66 -11z m-120 -19 c4 -24 11 -31 35 -35 24 -4 31 -11 33
-33 3 -20 9 -27 26 -27 44 0 63 -50 26 -70 -26 -14 -58 2 -66 34 -4 16 -15 26
-34 30 -16 3 -34 15 -41 28 -7 12 -18 29 -26 36 -16 17 -17 44 -1 60 20 20 42
9 48 -23z m-685 -25 c13 -14 16 -28 11 -51 -5 -26 -3 -30 10 -25 46 18 74 -33
38 -68 -26 -26 -64 -6 -64 35 0 12 -7 19 -19 19 -23 0 -26 4 -35 46 -11 52 26
80 59 44z m135 -9 c7 -13 7 -28 0 -45 -16 -43 -70 -28 -70 19 0 43 50 62 70
26z m-270 -5 c6 -8 10 -25 8 -38 -2 -18 2 -23 20 -24 56 -3 58 -59 2 -59 -29
0 -36 4 -40 25 -4 19 -11 25 -30 25 -20 0 -26 6 -28 28 -6 49 39 77 68 43z
m1020 -1 c22 -26 4 -65 -30 -65 -37 0 -61 39 -40 65 16 19 54 19 70 0z m-896
-135 c32 -12 33 -34 5 -54 -17 -11 -27 -12 -45 -4 -37 17 -31 63 8 67 4 1 18
-3 32 -9z m1004 -533 c2 -10 -2 -32 -9 -48 -23 -57 -61 -17 -44 48 7 29 48 29
53 0z"/>
          </g>
        </svg>
      </div>
    </div>
  );
}
