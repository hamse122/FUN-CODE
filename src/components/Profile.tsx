export default function Profile() {
  return (
    <aside className="profile-card-container">
      <svg className="electric-svg" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id="turbulent-displace"
            colorInterpolationFilters="sRGB"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise1"
              seed="1"
            />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate
                attributeName="dy"
                values="700; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise2"
              seed="1"
            />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate
                attributeName="dy"
                values="0; -700"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise3"
              seed="2"
            />
            <feOffset in="noise3" dx="0" dy="0" result="offsetNoise3">
              <animate
                attributeName="dx"
                values="490; 0"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feTurbulence
              type="turbulence"
              baseFrequency="0.02"
              numOctaves="10"
              result="noise4"
              seed="2"
            />
            <feOffset in="noise4" dx="0" dy="0" result="offsetNoise4">
              <animate
                attributeName="dx"
                values="0; -490"
                dur="6s"
                repeatCount="indefinite"
                calcMode="linear"
              />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend
              in="part1"
              in2="part2"
              mode="color-dodge"
              result="combinedNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div className="profile-inner">
        <div className="profile-main-card">
          <div className="profile">
            <div className="scrollbar-glass">Available</div>

            <div className="profile-avatar">HM</div>

            <h2>HAMSE MO</h2>

            <p className="profile-role">Full-Stack Developer</p>

            <div className="profile-status">
              <span />
              Available for projects
            </div>

            <div className="profile-info">
              <div>
                <span>Location</span>
                <strong>Somaliland</strong>
              </div>

              <div>
                <span>Stack</span>
                <strong>React / Django</strong>
              </div>

              <div>
                <span>Mobile</span>
                <strong>Flutter</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-border-effect">
          <div className="electric-border" />
          <div className="glow-layer-1" />
          <div className="glow-layer-2" />
        </div>

        <div className="profile-background-glow" />
      </div>
    </aside>
  );
}
