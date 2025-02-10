import { useState, useEffect } from "react";
import { Point } from "../fakeApi";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface PointFormProps {
  point?: Omit<Point, "id">;
  onSubmit: (point: Omit<Point, "id">) => void;
  onTempChange: (lat: number, lng: number) => void;
  isRegister?: boolean;
}

export const PointForm = ({ point, onSubmit, onTempChange, isRegister = false }: PointFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: 0,
    lat: 0,
    lng: 0,
    badges: "",
  });

  useEffect(() => {
    if (point) {
      setFormData({
        name: point.name,
        description: point.description,
        value: point.value,
        lat: point.lat,
        lng: point.lng,
        badges: point.badges.join(", "),
      });
    }
  }, [point]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < -90 || value > 90) {
      toast.error("A latitude deve estar entre -90 e 90.");
      return;
    }
    handleInputChange("lat", value);
    onTempChange(value, formData.lng);
  };
  
  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < -180 || value > 180) {
      toast.error("A longitude deve estar entre -180 e 180.");
      return;
    }
    handleInputChange("lng", value);
    onTempChange(formData.lat, value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
    if (inputValue < 0) {
      toast.error("O valor não pode ser negativo!");
      return;
    }
    handleInputChange("value", inputValue)
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      onSubmit({ ...formData, badges: formData.badges.split(",").map((b) => b.trim()) });
      if (isRegister) {
        toast.success("Ponto salvo com sucesso!");
        setFormData({ name: "", description: "", value: 0, lat: 0, lng: 0, badges: "" });
      }
    } catch (error) {
      toast.error("Erro ao salvar o ponto.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg w-100 mx-auto">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome:*</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição:*</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Valor:*</label>
        <input
          type="number"
          value={formData.value}
          onChange={handleValueChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Latitude:*</label>
        <input
          type="number"
          value={formData.lat}
          onChange={handleLatChange}
          required
          className={"mt-1 p-2 w-full border border-gray-300 rounded-md"}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Longitude:*</label>
        <input
          type="number"
          value={formData.lng}
          onChange={handleLngChange}
          required
          className={"mt-1 p-2 w-full border border-gray-300 rounded-md"}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Badges (separados por vírgula):*</label>
        <input
          type="text"
          value={formData.badges}
          onChange={(e) => handleInputChange("badges", e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white px-16 py-2 rounded-md hover:bg-gray-600 cursor-pointer"
        >
          Voltar
        </button>
        <button
          type="submit"
          className={"bg-green-600 text-white px-16 py-2 rounded-md hover:bg-green-700 cursor-pointer"}
        >
          Salvar
        </button>
      </div>
    </form>
  );
};