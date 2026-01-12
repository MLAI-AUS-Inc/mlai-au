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

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? people.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === people.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="fighter-select-wrapper">
      <div className="fighter-select-container">
        {/* Pixel World Map Background */}
        <div className="fighter-select-bg" />

        {/* Main Content */}
        <div className="fighter-select-content">
          {/* Title */}
          <h2 className="fighter-select-title">OUR TEAM</h2>
          <p className="fighter-select-subtitle">(CHOOSE YOUR FIGHTER)</p>

          {/* === MOBILE LAYOUT === */}
          <div className="fighter-mobile-layout">
            {/* Character Preview */}
            <div className="fighter-mobile-preview">
              <img
                src={selectedPerson.pixelImageUrl || defaultPixelCharacter}
                alt={`${selectedPerson.name} pixel art`}
                className="fighter-mobile-preview-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultPixelCharacter;
                }}
              />
            </div>

            {/* Player Info */}
            <div className="fighter-mobile-info">
              <div className="fighter-mobile-player-label">PLAYER 1</div>
              <div className="fighter-mobile-player-name">{selectedPerson.name.toUpperCase()}</div>
              <div className="fighter-mobile-player-role">{selectedPerson.role.toUpperCase()}</div>
            </div>

            {/* Character Selection with Nav Arrows */}
            <div className="fighter-mobile-selection">
              <button
                className="fighter-mobile-nav-btn"
                onClick={handlePrev}
                aria-label="Previous character"
              >
                ◀
              </button>

              <div className="fighter-mobile-grid">
                {people.map((person, index) => (
                  <button
                    key={person.name}
                    className={`fighter-mobile-select-box ${index === selectedIndex ? "fighter-mobile-select-box-active" : ""}`}
                    onClick={() => setSelectedIndex(index)}
                    aria-label={`Select ${person.name}`}
                  >
                    <img
                      src={person.imageUrl}
                      alt={person.name}
                      className="fighter-mobile-select-photo"
                    />
                  </button>
                ))}
              </div>

              <button
                className="fighter-mobile-nav-btn"
                onClick={handleNext}
                aria-label="Next character"
              >
                ▶
              </button>
            </div>

            {/* Press Start Button */}
            <a
              href={selectedPerson.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="fighter-mobile-press-start"
            >
              VIEW PROFILE
            </a>
          </div>

          {/* === DESKTOP LAYOUT === */}
          <div className="fighter-desktop-layout">
            {/* Left: Character Selection Grid */}
            <div className="fighter-grid-left">
              {/* Navigation Arrow Left */}
              <button
                className="fighter-nav-arrow fighter-nav-left"
                onClick={handlePrev}
                aria-label="Previous character"
              >
                ◀
              </button>

              {/* 3x3+ Grid */}
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
              <img
                src={selectedPerson.pixelImageUrl || defaultPixelCharacter}
                alt={`${selectedPerson.name} pixel art`}
                className="fighter-preview-image"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultPixelCharacter;
                }}
              />
            </div>

            {/* Right: Player Info Panel */}
            <div className="fighter-info-right">
              {/* Navigation Arrow Right */}
              <button
                className="fighter-nav-arrow fighter-nav-right"
                onClick={handleNext}
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
                      <span className="fighter-social-url">linkedin.com</span>
                      <span className="fighter-social-action">
                        VIEW PROFILE
                      </span>
                    </a>
                  )}
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
          min-height: 400px;
          background-color: #3537dc;
          overflow: hidden;
          border-radius: 1.5rem;
          padding: 16px;
        }

        @media (min-width: 640px) {
          .fighter-select-container {
            border-radius: 2rem;
            padding: 20px;
          }
        }

        @media (min-width: 1024px) {
          .fighter-select-container {
            min-height: 500px;
            border-radius: 2.5rem;
            padding: 24px 32px;
          }
        }

        .fighter-select-bg {
          position: absolute;
          inset: 0;
          background-image: url('https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/1000.jpg?alt=media&token=e0cb1706-b9c1-474d-8be1-b63e01b1f139');
          background-size: cover;
          background-position: center;
          opacity: 0.9;
          border-radius: inherit;
        }

        .fighter-select-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .fighter-select-title {
          font-family: 'Press Start 2P', cursive;
          font-size: 16px;
          color: #ffeb3b;
          text-align: center;
          text-shadow: 
            2px 2px 0 #1a1a8e,
            -1px -1px 0 #1a1a8e,
            1px -1px 0 #1a1a8e,
            -1px 1px 0 #1a1a8e;
          letter-spacing: 2px;
          margin: 0;
          padding-top: 16px;
        }

        @media (min-width: 640px) {
          .fighter-select-title {
            font-size: 24px;
            letter-spacing: 3px;
            padding-top: 20px;
          }
        }

        @media (min-width: 1024px) {
          .fighter-select-title {
            font-size: clamp(28px, 3.5vw, 42px);
            padding-top: 24px;
          }
        }

        .fighter-select-subtitle {
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #00e5ff;
          text-align: center;
          margin: 8px 0 16px;
        }

        @media (min-width: 640px) {
          .fighter-select-subtitle {
            font-size: 12px;
          }
        }

        @media (min-width: 1024px) {
          .fighter-select-subtitle {
            display: none;
          }
        }

        /* ========== MOBILE LAYOUT ========== */
        .fighter-mobile-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }

        @media (min-width: 1024px) {
          .fighter-mobile-layout {
            display: none;
          }
        }

        .fighter-mobile-preview {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 140px;
        }

        @media (min-width: 640px) {
          .fighter-mobile-preview {
            height: 180px;
          }
        }

        .fighter-mobile-preview-image {
          height: 100%;
          width: auto;
          image-rendering: pixelated;
          filter: drop-shadow(3px 3px 0 rgba(0, 0, 0, 0.3));
        }

        .fighter-mobile-info {
          text-align: center;
          background: linear-gradient(135deg, #1a1a6e 0%, #2a2a8e 100%);
          border: 2px solid #00e5ff;
          border-radius: 8px;
          padding: 12px 20px;
          width: 100%;
          max-width: 280px;
        }

        .fighter-mobile-player-label {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          color: #ffeb3b;
          margin-bottom: 8px;
        }

        .fighter-mobile-player-name {
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #ffffff;
          margin-bottom: 4px;
          line-height: 1.4;
        }

        .fighter-mobile-player-role {
          font-family: 'Press Start 2P', cursive;
          font-size: 8px;
          color: #aaaaff;
        }

        .fighter-mobile-selection {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
        }

        .fighter-mobile-nav-btn {
          background: transparent;
          border: none;
          color: #00e5ff;
          font-size: 20px;
          cursor: pointer;
          padding: 12px;
          transition: transform 0.2s, color 0.2s;
          min-width: 44px;
          min-height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .fighter-mobile-nav-btn:hover,
        .fighter-mobile-nav-btn:active {
          color: #ffeb3b;
          transform: scale(1.1);
        }

        .fighter-mobile-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
        }

        @media (min-width: 400px) {
          .fighter-mobile-grid {
            gap: 6px;
          }
        }

        .fighter-mobile-select-box {
          width: 40px;
          height: 40px;
          border: 2px solid #1a1a8e;
          background: #2a2a6e;
          border-radius: 4px;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        @media (min-width: 400px) {
          .fighter-mobile-select-box {
            width: 48px;
            height: 48px;
          }
        }

        .fighter-mobile-select-box-active {
          border-color: #00e5ff !important;
          box-shadow: 0 0 8px #00e5ff;
        }

        .fighter-mobile-select-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .fighter-mobile-press-start {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          color: #1a1a1a;
          background: #ffeb3b;
          border: none;
          border-radius: 8px;
          padding: 14px 24px;
          text-decoration: none;
          cursor: pointer;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* ========== DESKTOP LAYOUT ========== */
        .fighter-desktop-layout {
          display: none;
        }

        @media (min-width: 1024px) {
          .fighter-desktop-layout {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 24px;
            flex: 1;
            align-items: center;
            margin-top: 24px;
          }
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
          width: 80px;
          height: 80px;
          border: 3px solid #1a1a8e;
          background: #2a2a6e;
          border-radius: 4px;
          padding: 0;
          cursor: pointer;
          overflow: hidden;
          transition: all 0.2s ease;
        }

        @media (min-width: 1280px) {
          .fighter-select-box {
            width: 96px;
            height: 96px;
          }
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
          min-width: 44px;
          min-height: 44px;
        }

        .fighter-nav-arrow:hover {
          color: #ffeb3b;
          transform: scale(1.2);
        }

        .fighter-nav-left {
          left: -20px;
        }

        .fighter-nav-right {
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
        }

        .fighter-nav-right:hover {
          transform: translateY(-50%) scale(1.2);
        }

        /* Center: Character Preview */
        .fighter-preview-center {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 300px;
        }

        @media (min-width: 1280px) {
          .fighter-preview-center {
            min-height: 350px;
          }
        }

        .fighter-preview-image {
          height: 300px;
          width: auto;
          image-rendering: pixelated;
          filter: drop-shadow(4px 4px 0 rgba(0, 0, 0, 0.3));
        }

        @media (min-width: 1280px) {
          .fighter-preview-image {
            height: 400px;
          }
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
          padding: 20px;
          width: 100%;
          max-width: 320px;
          box-shadow: 0 0 20px #00e5ff30;
        }

        @media (min-width: 1280px) {
          .fighter-player-box {
            padding: 24px;
            max-width: 360px;
          }
        }

        .fighter-player-label {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
          color: #ffeb3b;
          margin-bottom: 12px;
          text-shadow: 2px 2px 0 #1a1a4e;
        }

        @media (min-width: 1280px) {
          .fighter-player-label {
            font-size: 24px;
            margin-bottom: 16px;
          }
        }

        .fighter-player-name {
          font-family: 'Press Start 2P', cursive;
          font-size: 12px;
          color: #ffffff;
          margin-bottom: 8px;
          line-height: 1.5;
        }

        @media (min-width: 1280px) {
          .fighter-player-name {
            font-size: 16px;
          }
        }

        .fighter-player-role {
          font-family: 'Press Start 2P', cursive;
          font-size: 10px;
          color: #aaaaff;
          margin-bottom: 20px;
        }

        @media (min-width: 1280px) {
          .fighter-player-role {
            font-size: 12px;
            margin-bottom: 24px;
          }
        }

        .fighter-social-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fighter-social-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: 'Press Start 2P', cursive;
          font-size: 8px;
          color: #ffffff;
          text-decoration: none;
          transition: color 0.2s;
          min-height: 44px;
        }

        @media (min-width: 1280px) {
          .fighter-social-link {
            font-size: 10px;
            gap: 12px;
          }
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
        }

        /* Press Start Button */
        .fighter-press-start {
          font-family: 'Press Start 2P', cursive;
          font-size: 18px;
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
          min-height: 44px;
        }

        @media (min-width: 1280px) {
          .fighter-press-start {
            font-size: 24px;
          }
        }

        .fighter-press-start:hover {
          transform: scale(1.1);
        }

        @keyframes blink-text {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
