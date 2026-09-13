import { STATUS, useToa } from '../../context/ToaContext';
import './StatusPanel.css';

function StatusPanel() {
  const { status, message, toilets } = useToa();

  if (status === STATUS.IDLE) return null;

  if (status === STATUS.LOCATING) {
    return <p className="status status--busy">Finding you on the map…</p>;
  }

  if (status === STATUS.SEARCHING) {
    return <p className="status status--busy">Sniffing out nearby toilets…</p>;
  }

  if (status === STATUS.ERROR) {
    return <p className="status status--error">{message}</p>;
  }

  if (status === STATUS.SUCCESS && toilets.length === 0) {
    return <p className="status status--empty">{message}</p>;
  }

  if (status === STATUS.SUCCESS) {
    return (
      <p className="status status--success">
        Found {toilets.length} toilet{toilets.length === 1 ? '' : 's'} nearby, closest first.
      </p>
    );
  }

  return null;
}

export default StatusPanel;
