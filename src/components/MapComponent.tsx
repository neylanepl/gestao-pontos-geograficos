import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvent } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Point } from '../fakeApi';
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/solid";
import { Tooltip } from "react-leaflet";

const defaultIcon = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const tempIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

const CustomZoomControl = () => {
    const map = useMap();
    useEffect(() => {
      const zoomControl = L.control.zoom({ position: "bottomright" });
      zoomControl.addTo(map);
      return () => {
        zoomControl.remove();
      };
    }, [map]);
    return null;
};

const MapAutoCenter = ({ lat, lng }: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
      if (lat && lng) {
        map.setView([lat, lng], 13);
      }
    }, [lat, lng, map]);
    return null;
};

const MapClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
    useMapEvent("click", (e) => {
        onMapClick(e.latlng.lat, e.latlng.lng);
    });
    return null;
};

interface MapComponentProps {
    points: Point[];
    tempPoint?: {lat: number, lng: number} | null;
    isSelect?: boolean;
    onMapClick?: (lat: number, lng: number) => void;
}

export const MapComponent = ({ points, tempPoint, isSelect, onMapClick }: MapComponentProps) => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-full rounded-lg shadow-md overflow-hidden">
            <div className="absolute top-4 right-4 z-[1000]">
                <button
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center gap-1"
                    onClick={() => navigate("/register")}
                >
                <PlusIcon className="w-5 h-5" /> Cadastrar Ponto
                </button>
            </div>
            <MapContainer center={[-15.77972, -47.92972]} zoom={13} style={{ height: '100%', width: '100%' }} className="rounded-lg" zoomControl={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <CustomZoomControl />
                {onMapClick && <MapClickHandler onMapClick={onMapClick} />}
                {tempPoint && <MapAutoCenter lat={tempPoint.lat} lng={tempPoint.lng} />}
                {points.map((point) => (
                    <Marker key={point.id} position={[point.lat, point.lng]} icon={defaultIcon} eventHandlers={{mouseover: (e) => e.target.openPopup(), mouseout: (e) => e.target.closePopup(),}}>   
                         <Tooltip direction="top" offset={[0, -40]} permanent>
                            <strong className="text-md font-semibold text-gray-800">{point.name}</strong>
                        </Tooltip>
                        <Popup offset={[0, -20]} className="w-64 p-4 bg-white rounded-lg shadow-lg">
                            <strong className="text-lg font-semibold text-gray-800 break-words">{point.name}</strong>
                            <p className="text-sm text-gray-600 mt-2 break-words">{point.description}</p>
                            <p className="text-sm text-gray-600 mt-1">Valor: R$ {point.value}</p>
                            <p className="text-sm text-gray-600 mt-1 break-words">Badges: {point.badges.join(', ')}</p>
                        </Popup>
                    </Marker>
                ))}
                {tempPoint && !isSelect && (
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
