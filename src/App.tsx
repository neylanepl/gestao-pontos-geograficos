import { useState, useEffect } from 'react';
import { MapComponent } from './components/MapComponent';
import { PointForm } from './components/PointForm';
import { PointList } from './components/PointList';
import { fetchPoints, Point } from './fakeApi';
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export const App = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  useEffect(() => {
    fetchPoints().then((data) => setPoints(data));
  }, []);

  const handleAddPoint = (point: Omit<Point, 'id'>) => {
    const newPoint = { ...point, id: Math.random().toString() };
    setPoints([...points, newPoint]);
  };

  const handleEditPoint = (point: Point) => {
    console.log(point)
    setSelectedPoint(point);
  };

  const handleUpdatePoint = (updatedPoint: Omit<Point, 'id'>) => {
    setPoints(points.map((p) => (p.id === selectedPoint?.id ? { ...updatedPoint, id: p.id } : p)));
    setSelectedPoint(null);
  };

  const handleDeletePoint = (id: string) => {
    Swal.fire({
      title: "Tem certeza?",
      text: "Essa ação não pode ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setPoints(points.filter((p) => p.id !== id));
        Swal.fire("Excluído!", "O ponto foi removido.", "success");
      }
    });
  };

  const handleMapClick = (lat: number, lng: number) => {
    if (selectedPoint) {
      setSelectedPoint({ ...selectedPoint, lat, lng });
    }
  };

  return (
    <div className="flex flex-row h-screen w-scree">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[50vw] h-[100vh]">
        <MapComponent points={points} onMapClick={handleMapClick} />
      </div>
      <div className="w-[50vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200">
        <h1 className="text-2xl font-bold mb-4 text-center">Compras por Local</h1>
        <PointForm
          point={selectedPoint ?? undefined}
          onSubmit={selectedPoint ? handleUpdatePoint : handleAddPoint}
        />
      </div>
      <div className="w-[50vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200">
        <PointList points={points} onEdit={handleEditPoint} onDelete={handleDeletePoint} />
      </div>
    </div>
  );
};
