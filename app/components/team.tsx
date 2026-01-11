import { useState } from "react";

// Team member data
const people = [
  {
    name: "Xavier Andueza",
    role: "President",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    pixelImageUrl: "", // Will use default pixel character until individual art is added
    linkedIn: "https://www.linkedin.com/in/xavier-andueza/",
    twitter: "",
  },
  {
    name: "Michael Reitzenstein",
    role: "Vice President",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fmichael.png?alt=media&token=a8a3f7eb-784f-4392-814d-404d9e5aea85",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/michael-reitzenstein-5528024/",
    twitter: "",
  },
  {
    name: "Pegah Khaleghi",
    role: "Treasurer",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fpegah.png?alt=media&token=ad0f30bd-bf3b-49d6-827d-3998132a647d",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/pegah-khaleghi/",
    twitter: "",
  },
  {
    name: "Lukas Wesemann",
    role: "Secretary",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Flukas.png?alt=media&token=490ac923-dd87-4291-bc7d-3a02bdfac45e",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/lukaswesemann/",
    twitter: "",
  },
  {
    name: "Dr Sam Donegan",
    role: "Head of Marketing",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fsam.png?alt=media&token=dd8f33f3-cc74-43cd-8a0f-ebc2e6fb07c3",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/samueldonegan/",
    twitter: "",
  },
  {
    name: "Callum Holt",
    role: "Head of Partnerships",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fcallum.png?alt=media&token=c4ca5617-42c0-424a-b13c-0b66a0c08b7a",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/callumholt/",
    twitter: "",
  },
  {
    name: "Tom McKenzie",
    role: "Head of Technology",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Ftom.png?alt=media&token=b2e5357e-ca52-40d7-953c-b505b178225f",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/tom-mckenzie-dev/",
    twitter: "",
  },
  {
    name: "Jasmine Raj",
    role: "Co-Head of Community",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fjasmine.png?alt=media&token=1574f699-b846-4198-b50d-7a8938177450",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/jasmine-raj-49000b21a/",
    twitter: "",
  },
  {
    name: "Ethan Lee",
    role: "Co-Head of Community",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fethan.png?alt=media&token=cbdb1fc0-c25a-4df8-8931-d2355b89b4ce",
    pixelImageUrl: "",
    linkedIn: "https://www.linkedin.com/in/ethan-lee-resume/",
    twitter: "",
  },
  {
    name: "Alisa Belova",
    role: "Head of People",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2FAlisa.jpeg?alt=media&token=9b7c4f50-867f-43db-99e2-7172a525105f",
    pixelImageUrl: "",
    linkedIn: "",
    twitter: "",
  },
];

export default function Team() {
  const [selectedIndex, setSelectedIndex] = useState(5); // Start with Callum (matching reference)
  const selectedPerson = people[selectedIndex];

  // Default pixel character (Callum's pixel art as placeholder for all)
  const defaultPixelCharacter = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Untitleddesign-ezgif.com-resize.gif?alt=media&token=d0444d83-e55f-4d56-ae80-0d0680fecd4f";

  return (
    <section className="fighter-select-wrapper">
      <div className="fighter-select-container">
        {/* Pixel World Map Background */}
        <div className="fighter-select-bg" />

        {/* Main Content */}
        <div className="fighter-select-content">
          {/* Title */}
          <h2 className="fighter-select-title">OUR TEAM (CHOOSE YOUR FIGHTER)</h2>

          {/* Grid Container */}
          <div className="fighter-select-grid">
            {/* Left: Character Selection Grid */}
            <div className="fighter-grid-left">
              {/* Navigation Arrow Left */}
              <button
                className="fighter-nav-arrow fighter-nav-left"
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev === 0 ? people.length - 1 : prev - 1
                  )
                }
                aria-label="Previous character"
              >
                ◀
              </button>

              {/* 3x3 Grid */}
              <div className="fighter-selection-grid">
                {people.map((person, index) => (
                  <button
                    key={person.name}
                    className={`fighter-select-box ${index === selectedIndex ? "fighter-select-box-active" : ""
                      }`}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Select ${person.name}`}
                  >
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="fighter-select-photo"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Center: Full Body Character Preview */}
            <div className="fighter-preview-center">
              {/* Use pixel image if available, otherwise show placeholder */}
              <img
                src={selectedPerson.pixelImageUrl || defaultPixelCharacter}
                alt={`${selectedPerson.name} pixel art`}
                className="fighter-preview-image"
                onError={(e) => {
                  // Fallback to default character if pixel image doesn't exist
                  (e.target as HTMLImageElement).src = defaultPixelCharacter;
                }}
              />
            </div>

            {/* Right: Player Info Panel */}
            <div className="fighter-info-right">
              {/* Navigation Arrow Right */}
              <button
                className="fighter-nav-arrow fighter-nav-right"
                onClick={() =>
                  setSelectedIndex((prev) =>
                    prev === people.length - 1 ? 0 : prev + 1
                  )
                }
                aria-label="Next character"
              >
                ▶
              </button>

              {/* Player 1 Info Box */}
              <div className="fighter-player-box">
                <div className="fighter-player-label">PLAYER 1</div>
                <div className="fighter-player-name">{selectedPerson.name.toUpperCase()}</div>
                <div className="fighter-player-role">{selectedPerson.role.toUpperCase()}</div>

                {/* Social Links */}
                <div className="fighter-social-links">
                  {selectedPerson.linkedIn && (
                    <a
                      href={selectedPerson.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fighter-social-link"
                    >
                      <span className="fighter-social-icon">in</span>
                      <span className="fighter-social-url">www.linkedin.com</span>
                      <span className="fighter-social-action">
                        <span className="fighter-twitter-icon">𝕏</span> VIEW PROFILE
                      </span>
                    </a>
                  )}
                  <a
                    href={selectedPerson.linkedIn}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fighter-social-link"
                  >
                    <span className="fighter-social-icon">✉</span>
                    <span className="fighter-social-url">www.linkedin.com/</span>
                    <span className="fighter-social-action">
                      <span className="fighter-link-icon">🔗</span> VIEW PROFILE
                    </span>
                  </a>
                </div>
              </div>

              {/* Press Start Button */}
              <a
                href={selectedPerson.linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="fighter-press-start"
              >
                PRESS START
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scoped Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        .fighter-select-wrapper {
          width: 100%;
          background-color: var(--brutalist-beige);
          padding: 0.5rem;
        }

        @media (min-width: 1024px) {
          .fighter-select-wrapper {
            padding: 0.75rem;
          }
        }

        .fighter-select-container {
          position: relative;
          width: 100%;
          min-height: 500px;
          background-color: #3537dc;
          overflow: hidden;
          border-radius: 2.5rem;
          padding: 24px 32px;
        }

        .fighter-select-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1000.jpg?alt=media&token=e0cb1706-b9c1-474d-8be1-b63e01b1f139');
          background-size: cover;
          background-position: center;
          opacity: 0.9;
          border-radius: 2.5rem;
        }

        .fighter-select-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 24px;
          height: 100%;
        }

        .fighter-select-title {
          font-family: 'Press Start 2P', cursive;
          font-size: clamp(24px, 4vw, 42px);
          color: #ffeb3b;
          text-align: center;
          text-shadow: 
            4px 4px 0 #1a1a8e,
            -1px -1px 0 #1a1a8e,
            1px -1px 0 #1a1a8e,
            -1px 1px 0 #1a1a8e;
          letter-spacing: 3px;
          margin: 0;
          padding-top: 24px;
          padding-bottom: 8px;
        }

        .fighter-select-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 24px;
          flex: 1;
          align-items: center;
        }

        /* Left: Character Selection Grid */
        .fighter-grid-left {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fighter-selection-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .fighter-select-box {
          width: 96px;
          height: 96px;
          border: 3px solid #1a1a8e;
          background: #2a2a6e;
          border-radius: 4px;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        .fighter-select-box:hover {
          border-color: #00bcd4;
          transform: scale(1.05);
        }

        .fighter-select-box-active {
          border-color: #00e5ff !important;
          box-shadow: 
            0 0 10px #00e5ff,
            0 0 20px #00e5ff40,
            inset 0 0 10px #00e5ff20;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 10px #00e5ff, 0 0 20px #00e5ff40; }
          50% { box-shadow: 0 0 20px #00e5ff, 0 0 40px #00e5ff60; }
        }

        .fighter-select-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Navigation Arrows */
        .fighter-nav-arrow {
          position: absolute;
          background: transparent;
          border: none;
          color: #00e5ff;
          font-size: 24px;
          cursor: pointer;
          padding: 8px;
          transition: transform 0.2s, color 0.2s;
          z-index: 20;
        }

        .fighter-nav-arrow:hover {
          color: #ffeb3b;
          transform: scale(1.2);
        }

        .fighter-nav-left {
          left: -10px;
        }

        .fighter-nav-right {
          right: 40px;
          top: 50%;
          transform: translateY(-50%);
        }

        /* Center: Character Preview */
        .fighter-preview-center {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 350px;
        }

        .fighter-preview-image {
          height: 400px;
          width: auto;
          image-rendering: pixelated;
          filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.3));
        }

        @keyframes character-idle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        /* Right: Player Info Panel */
        .fighter-info-right {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: flex-end;
        }

        .fighter-player-box {
          background: linear-gradient(135deg, #1a1a6e 0%, #2a2a8e 100%);
          border: 3px solid #00e5ff;
          border-radius: 8px;
          padding: 24px;
          min-width: 360px;
          box-shadow: 0 0 20px #00e5ff30;
        }

        .fighter-player-label {
          font-family: 'Press Start 2P', cursive;
          font-size: 24px;
          color: #ffeb3b;
          margin-bottom: 16px;
          text-shadow: 2px 2px 0 #1a1a4e;
        }

        .fighter-player-name {
          font-family: 'Press Start 2P', cursive;
          font-size: 16px;
          color: #ffffff;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .fighter-player-role {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          color: #aaaaff;
          margin-bottom: 24px;
        }

        .fighter-social-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fighter-social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #ffffff;
          text-decoration: none;
          transition: color 0.2s;
        }

        .fighter-social-link:hover {
          color: #00e5ff;
        }

        .fighter-social-icon {
          background: #0077b5;
          color: white;
          width: 18px;
          height: 18px;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
          font-family: Arial, sans-serif;
        }

        .fighter-social-url {
          color: #aaaaff;
        }

        .fighter-social-action {
          color: #00e5ff;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .fighter-twitter-icon,
        .fighter-link-icon {
          font-size: 10px;
        }

        /* Press Start Button */
        /* Press Start Button */
        .fighter-press-start {
          font-family: 'Press Start 2P', cursive;
          font-size: 24px;
          color: #ffeb3b;
          background: transparent;
          border: none;
          padding: 16px;
          text-decoration: none;
          text-shadow: 
            4px 4px 0 #1a1a8e,
            -1px -1px 0 #1a1a8e,
            1px -1px 0 #1a1a8e,
            -1px 1px 0 #1a1a8e;
          animation: blink-text 1s step-end infinite;
          cursor: pointer;
        }

        .fighter-press-start:hover {
          transform: scale(1.1);
          text-shadow: 
            6px 6px 0 #1a1a8e,
            -2px -2px 0 #1a1a8e,
            2px -2px 0 #1a1a8e,
            -2px 2px 0 #1a1a8e;
        }

        .fighter-press-start:active {
          transform: scale(0.95);
        }

        @keyframes blink-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .fighter-select-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .fighter-preview-center {
            order: -1;
            min-height: 250px;
          }

          .fighter-preview-image {
            max-height: 200px;
          }

          .fighter-info-right {
            align-items: center;
          }

          .fighter-player-box {
            min-width: auto;
            width: 100%;
            max-width: 300px;
          }

          .fighter-select-box {
            width: 60px;
            height: 60px;
          }

          .fighter-nav-left {
            left: 0;
          }

          .fighter-nav-right {
            right: 0;
          }
        }

        @media (max-width: 640px) {
          .fighter-select-container {
            padding: 16px;
            border-radius: 12px;
          }

          .fighter-select-title {
            font-size: 14px;
          }

          .fighter-select-box {
            width: 50px;
            height: 50px;
          }

          .fighter-player-label {
            font-size: 14px;
          }

          .fighter-player-name {
            font-size: 9px;
          }

          .fighter-press-start {
            font-size: 11px;
            padding: 12px 24px;
          }
        }
      `}</style>
    </section>
  );
}
