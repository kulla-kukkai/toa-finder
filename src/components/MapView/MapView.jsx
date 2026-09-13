import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useToa } from '../../context/ToaContext';
import './MapView.css';

const userIcon = L.divIcon({
  className: 'map-marker map-marker--user',
  html: '<span>you</span>',
  iconSize: [44, 44],
});

const toiletIcon = L.divIcon({
  className: 'map-marker map-marker--toilet',
  html: '<span>🚽</span>',
  iconSize: [34, 34],
});

function MapView() {
  const { coords, toilets } = useToa();

  if (!coords) return null;

  return (
    <div className="map-view">
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={15}
        scrollWheelZoom={false}
        className="map-view__container"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coords.lat, coords.lon]} icon={userIcon}>
          <Popup>You're here</Popup>
        </Marker>
        {toilets.map((toilet) => (
          <Marker key={toilet.id} position={[toilet.lat, toilet.lon]} icon={toiletIcon}>
            <Popup>{toilet.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default MapView;
