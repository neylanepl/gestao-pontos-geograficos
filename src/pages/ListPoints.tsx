import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { usePoints } from "../context/PointsContext";
import { MapComponent } from '../components/MapComponent';
import { PointList } from '../components/PointList';
import { Point } from '../fakeApi';
import { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";

export const ListPoints = () => {
  const { points, setPoints, isLoading } = usePoints();
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(null);

  const handleSelectPoint = (point: Point) => {
    setSelectedPoint(point);
  };

  const handleEdit = (id: string) => {
    navigate(`/edit/${id}`);
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
        Swal.fire({
          title: "Excluído!",
          text: "O ponto foi removido.",
          icon: "success",
          confirmButtonColor: "#16a34a",
        });
      }
    });
  };

  return (
    <div className="flex flex-row h-screen w-scree">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-[50vw] h-[100vh]">
        <MapComponent points={points} tempPoint={selectedPoint} isSelect={true}/>
      </div>
      <div className="w-[50vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200 overflow-y-auto max-h-screen">
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4"
        onClick={() => navigate("/register")}
      >
        Cadastrar Ponto
      </button>
      {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-bounce w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="text-centers p-2 py-4">Carregando pontos...</div>
          </div>
          
      ) : (
        <PointList points={points} onEdit={handleEdit} onDelete={handleDeletePoint} onSelect={handleSelectPoint}/>
      )}
        
      </div>
    </div>
  );
};
