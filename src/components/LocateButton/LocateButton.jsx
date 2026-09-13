import { STATUS, useToa } from '../../context/ToaContext';
import './LocateButton.css';

const LABELS = {
  [STATUS.IDLE]: 'Find toilets near me',
  [STATUS.LOCATING]: 'Finding you…',
  [STATUS.SEARCHING]: 'Searching the map…',
  [STATUS.SUCCESS]: 'Search again',
  [STATUS.ERROR]: 'Try again',
};

function LocateButton() {
  const { status, locate } = useToa();
  const isBusy = status === STATUS.LOCATING || status === STATUS.SEARCHING;

  return (
    <button
      type="button"
      className="locate-button"
      onClick={locate}
      disabled={isBusy}
      aria-busy={isBusy}
    >
      <span className="locate-button__icon" aria-hidden="true">
        {isBusy ? '◌' : '📍'}
      </span>
      {LABELS[status]}
    </button>
  );
}

export default LocateButton;
