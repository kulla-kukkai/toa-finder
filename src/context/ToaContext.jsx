import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { fetchNearbyToilets } from '../utils/overpass';

export const STATUS = {
  IDLE: 'idle',
  LOCATING: 'locating',
  SEARCHING: 'searching',
  SUCCESS: 'success',
  ERROR: 'error',
};

const ToaContext = createContext(null);

/**
 * Wraps the app and owns all of the "find me a toilet" state: the user's
 * coordinates, the search status, the results, and any friendly error text.
 * Any component can read this via `useToa()` instead of receiving it as props.
 */
export function ToaProvider({ children }) {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [coords, setCoords] = useState(null);
  const [toilets, setToilets] = useState([]);
  const [message, setMessage] = useState('');

  const locate = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus(STATUS.ERROR);
      setMessage("This browser can't share your location. Try a different one.");
      return;
    }

    setStatus(STATUS.LOCATING);
    setMessage('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ lat: latitude, lon: longitude });
        setStatus(STATUS.SEARCHING);

        try {
          const results = await fetchNearbyToilets(latitude, longitude);
          setToilets(results);
          setStatus(STATUS.SUCCESS);
          setMessage(
            results.length === 0
              ? 'No mapped toilets nearby yet. City centres tend to have better coverage than suburbs.'
              : ''
          );
        } catch {
          setStatus(STATUS.ERROR);
          setMessage("Couldn't reach the map data. Check your connection and try again.");
        }
      },
      (geoError) => {
        setStatus(STATUS.ERROR);
        setMessage(
          geoError.code === geoError.PERMISSION_DENIED
            ? 'Location access was blocked. Allow it in your browser settings, then try again.'
            : "Couldn't get a location fix. Try again in a moment."
        );
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  const value = useMemo(
    () => ({ status, coords, toilets, message, locate }),
    [status, coords, toilets, message, locate]
  );

  return <ToaContext.Provider value={value}>{children}</ToaContext.Provider>;
}

export function useToa() {
  const ctx = useContext(ToaContext);
  if (!ctx) {
    throw new Error('useToa must be called from inside a <ToaProvider>');
  }
  return ctx;
}
