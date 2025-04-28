import { MapContainer, TileLayer } from "react-leaflet";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ items }) {
  // Default center for India (New Delhi coordinates)
  const defaultCenter = [28.6139, 77.209];

  return (
    <MapContainer
      center={
        items.length > 0
          ? [items[0].latitude, items[0].longitude]
          : defaultCenter
      }
      zoom={items.length === 1 ? 13 : 8}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;
