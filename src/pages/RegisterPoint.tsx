import { useState } from 'react';
import { MapComponent } from '../components/MapComponent';
import { PointForm } from '../components/PointForm';
import { usePoints } from "../context/PointsContext";
import {  Point } from '../fakeApi';
import { Toaster } from "react-hot-toast";
import { useNavigate } from 'react-router-dom';

export const RegisterPoint = () => {
  const {points, setPoints} = usePoints();
  const [tempPoint, setTempPoint] = useState<{ lat: number; lng: number } | null>(null);
  const navigate = useNavigate();

  const handleAddPoint = (point: Omit<Point, 'id'>) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints((prevPoints) => [...prevPoints, newPoint]);
    setTempPoint(null);
    navigate("/");
  };

  return (
    <div className="flex flex-row h-screen w-scree">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[50vw] h-[100vh]">
        <MapComponent points={points} tempPoint={tempPoint} />
      </div>
      <div className="w-[50vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Compras por Local</h1>
        <PointForm
          point={undefined}
          onSubmit={handleAddPoint}
          onTempChange={(lat, lng) => setTempPoint({ lat, lng })}
        />
      </div>
    </div>
  );
};
