import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Point } from '../fakeApi';


const defaultIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});


const tempIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const MapAutoCenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
  
    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 13);
      }
    }, [lat, lng, map]);
  
    return null;
};

interface MapComponentProps {
    points: Point[];
    tempPoint?: {lat: number, lng: number} | null;
}

export const MapComponent = ({ points, tempPoint }: MapComponentProps) => {
    return (
        <div className="w-full h-full rounded-lg shadow-md overflow-hidden">
            <MapContainer
                center={[-15.77972, -47.92972]}
                zoom={13}
                style={{ height: '100%', width: '100%' }}
                className="rounded-lg"
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {tempPoint && <MapAutoCenter lat={tempPoint.lat} lng={tempPoint.lng} />}
             
                {points.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={defaultIcon}>
                        <Popup className="w-64 p-4 bg-white rounded-lg shadow-lg">
                            <strong className="text-lg font-semibold text-gray-800">{point.name}</strong>
                            <p className="text-sm text-gray-600 mt-2">{point.description}</p>
                            <p className="text-sm text-gray-600 mt-1">Valor: R$ {point.value}</p>
                            <p className="text-sm text-gray-600 mt-1">Badges: {point.badges.join(', ')}</p>
                        </Popup>
                    </Marker>
                ))}

                {tempPoint && (
                    <Marker position={[tempPoint.lat, tempPoint.lng]} icon={tempIcon}>
                        <Popup>
                        <p>Prévia do ponto (não salvo)</p>
                        </Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};
