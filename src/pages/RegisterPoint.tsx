import { useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { PointForm } from '../components/PointForm';
import { usePoints } from "../context/PointsContext";
import {  Point } from '../fakeApi';
import { useNavigate } from 'react-router-dom';

export const RegisterPoint = () => {
  const {points, setPoints, setLastAddedPoint} = usePoints();
  const [tempPoint, setTempPoint] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: 0,
    lat: 0,
    lng: 0,
    badges: [],
  });

  const handleMapClick = (lat: number, lng: number) => {
    setTempPoint({ lat, lng });
    setFormData((prev) => ({ ...prev, lat, lng }));
  };

  const handleAddPoint = (point: Omit<Point, 'id'>) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints((prevPoints) => [...prevPoints, newPoint]);
    setLastAddedPoint(newPoint);
    setTempPoint(null);
    navigate("/");
  };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="w-[65vw] h-[100vh]">
        <MapComponent points={points} tempPoint={tempPoint} onMapClick={handleMapClick} />
      </div>
      <div className="w-[35vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Cadastrar Compras por Local</h1>
        <PointForm point={formData} onSubmit={handleAddPoint} onTempChange={(lat, lng) => setTempPoint({ lat, lng })} isRegister={true}/>
      </div>
    </div>
  );
};
