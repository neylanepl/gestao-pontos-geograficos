import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapComponent } from '../components/MapComponent';
import { PointForm } from '../components/PointForm';
import { Point } from '../mockes/fakeApi';
import { usePoints } from "../context/PointsContext";
import { toast } from "react-hot-toast";


export const EditPoint = () => {
    const { id } = useParams();
    const {points, setPoints, setLastEditedPoint} = usePoints();
    const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);
    const [tempPoint, setTempPoint] = useState<{ lat: number; lng: number } | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const foundPoint = points.find((p) => p.id.toString() === id);
        setSelectedPoint(foundPoint || null);

        if (foundPoint) {
          setTempPoint({ lat: foundPoint.lat, lng: foundPoint.lng });
        }
    }, [id, points]);

    const handleMapClick = (lat: number, lng: number) => {
      setTempPoint({ lat, lng });
      setSelectedPoint((prev) => 
        prev ? { ...prev, lat, lng } : null
      );
    };

    const handleUpdatePoint = (updatedPoint: Omit<Point, 'id'>) => {
        const newPoint = { ...updatedPoint, id: selectedPoint?.id || "" };
        setPoints((prevPoints) =>
            prevPoints.map((p) =>
            p.id === selectedPoint?.id ? newPoint : p
        ));
        setLastEditedPoint(newPoint);
        toast.success("Ponto atualizado com sucesso!");
        setSelectedPoint(null);
        setTempPoint(null);
        navigate("/");
    };

  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="w-[65vw] h-[100vh]">
        <MapComponent points={points} tempPoint={tempPoint} onMapClick={handleMapClick}/>
      </div>
      <div className="w-[35vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Editar Ponto Cadastrado</h1>
        <PointForm point={selectedPoint ?? undefined} onSubmit={handleUpdatePoint} onTempChange={(lat, lng) => setTempPoint({ lat, lng })}
        />
      </div>
    </div>
  );
};
