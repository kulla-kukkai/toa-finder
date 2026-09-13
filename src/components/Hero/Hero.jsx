import LocateButton from '../LocateButton/LocateButton';
import './Hero.css';

function HeroIllustration() {
  return (
    <svg
      className="hero__illustration"
      viewBox="0 0 320 320"
      role="img"
      aria-label="Illustration of a map pin marking a restroom door"
    >
      <path
        d="M160 18c78 0 142 58 142 140s-64 144-142 144S18 240 18 158 82 18 160 18Z"
        fill="var(--color-teal)"
        opacity="0.18"
      />
      <rect x="96" y="86" width="128" height="168" rx="18" fill="var(--color-surface)" stroke="var(--color-ink)" strokeWidth="4" />
      <rect x="118" y="86" width="84" height="18" fill="var(--color-pink)" />
      <circle cx="196" cy="172" r="7" fill="var(--color-ink)" />
      <path
        d="M160 120c-30 0-46 24-46 50 0 32 24 62 46 78 22-16 46-46 46-78 0-26-16-50-46-50Z"
        fill="var(--color-yellow)"
        stroke="var(--color-ink)"
        strokeWidth="4"
        transform="translate(0 -8) scale(0.62)"
        style={{ transformOrigin: '160px 190px' }}
      />
      <circle cx="160" cy="176" r="10" fill="var(--color-ink)" />
    </svg>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__copy">
        <h1 className="hero__title">
          Caught short? Let's find your nearest toa.
        </h1>
        <p className="hero__subtitle">
          Free public restrooms can be surprisingly hard to spot around town.
          PooPooPeePee asks OpenStreetMap where the nearest one is and points
          you straight there — no app store, no account, no fuss.
        </p>
        <LocateButton />
      </div>
      <HeroIllustration />
    </section>
  );
}

export default Hero;
