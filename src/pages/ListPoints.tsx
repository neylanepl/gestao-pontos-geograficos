import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { usePoints } from "../context/PointsContext";
import { MapComponent } from '../components/MapComponent';
import { PointList } from '../components/PointList';
import { Point } from '../mockes/fakeApi';
import Swal from "sweetalert2";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const ListPoints = () => {
  const { points, setPoints, isLoading, lastAddedPoint, lastEditedPoint } = usePoints();
  const navigate = useNavigate();
  const [selectedPoint, setSelectedPoint] = useState<Point | null>(lastAddedPoint);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPoints, setFilteredPoints] = useState<Point[]>(points);

  useEffect(() => {
    if (lastEditedPoint) {
      setSelectedPoint(lastEditedPoint);
    } else if (lastAddedPoint) {
      setSelectedPoint(lastAddedPoint);
    }
  }, [lastEditedPoint, lastAddedPoint]);

  useEffect(() => {
    setFilteredPoints(points); 
  }, [points]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPoints(points);
    }
  }, [searchTerm, points]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredPoints(points);
    } else {
      setFilteredPoints(
        points.filter((point) =>
          point.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          point.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          point.badges.some((badge) => badge.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      );
    }
  };

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
      cancelButtonColor: "#6B7280",
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
      <div className="w-[65vw] h-[100vh]">
        <MapComponent points={filteredPoints} tempPoint={selectedPoint} isSelect={true}/>
      </div>
      <div className="w-[35vw] flex flex-col p-4 bg-gray-50 border-t border-gray-200 overflow-y-auto max-h-screen">
        <h1 className="text-2xl pr-6 pl-6 font-bold mb-4 text-center">Pontos Cadastrados</h1>
        <div className="relative pr-6 pl-6 flex items-center">
          <input type="text" placeholder="Buscar pontos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} 
            className="p-2 border border-gray-300 rounded-md w-full pr-10 bg-white"
          />
          <button onClick={handleSearch} className="absolute right-10 flex items-center justify-center cursor-pointer" title='Buscar'>
            <div className="group relative flex items-center">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            </div>
          </button>
        </div>
        {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="animate-bounce w-10 h-10 bg-blue-500 rounded-full"></div>
              <div className="text-centers p-2 py-4">Carregando pontos...</div>
            </div>
            
        ) : (
          <PointList points={filteredPoints} onEdit={handleEdit} onDelete={handleDeletePoint} onSelect={handleSelectPoint}/>
        )}
        
      </div>
    </div>
  );
};
