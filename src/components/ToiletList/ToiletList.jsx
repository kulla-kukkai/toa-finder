import { useToa } from '../../context/ToaContext';
import ToiletCard from '../ToiletCard/ToiletCard';
import './ToiletList.css';

function ToiletList() {
  const { toilets } = useToa();

  if (toilets.length === 0) return null;

  return (
    <ul className="toilet-list">
      {toilets.map((toilet, index) => (
        <ToiletCard key={toilet.id} toilet={toilet} index={index} />
      ))}
    </ul>
  );
}

export default ToiletList;
