import { formatDistance } from '../../utils/distance';
import './ToiletCard.css';

const ACCENTS = ['yellow', 'pink', 'teal'];

function ToiletCard({ toilet, index }) {
  const accent = ACCENTS[index % ACCENTS.length];
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${toilet.lat},${toilet.lon}`;

  return (
    <li className={`toilet-card toilet-card--${accent}`}>
      <div className="toilet-card__row">
        <h3 className="toilet-card__name">{toilet.name}</h3>
        <span className="toilet-card__distance">{formatDistance(toilet.distanceMeters)}</span>
      </div>

      <div className="toilet-card__tags">
        <span className="toilet-card__tag">{toilet.access}</span>
        {toilet.wheelchair && <span className="toilet-card__tag">Wheelchair accessible</span>}
        {toilet.openingHours && (
          <span className="toilet-card__tag">Open {toilet.openingHours}</span>
        )}
      </div>

      {toilet.operator && (
        <p className="toilet-card__operator">Run by {toilet.operator}</p>
      )}

      <a
        className="toilet-card__link"
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
      >
        Get directions
      </a>
    </li>
  );
}

export default ToiletCard;
