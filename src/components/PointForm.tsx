import { useState, useEffect } from "react";
import { Point } from "../fakeApi";
import { toast } from "react-hot-toast";

interface PointFormProps {
  point?: Point;
  onSubmit: (point: Omit<Point, "id">) => void;
}

export const PointForm = ({ point, onSubmit }: PointFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState(0);
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [badges, setBadges] = useState("");

  useEffect(() => {
    if (point) {
      setName(point.name);
      setDescription(point.description);
      setValue(point.value);
      setLat(point.lat);
      setLng(point.lng);
      setBadges(point.badges.join(", "));
    } else {
      setName("");
      setDescription("");
      setValue(0);
      setLat(0);
      setLng(0);
      setBadges("");
    }
  }, [point]);

  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < -90 || value > 90) {
      toast.error("A latitude deve estar entre -90 e 90.");
      return;
    }
    setLat(value);
  };
  
  const handleLngChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value < -180 || value > 180) {
      toast.error("A longitude deve estar entre -180 e 180.");
      return;
    }
    setLng(value);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = Number(e.target.value);
  
    if (inputValue < 0) {
      toast.error("O valor não pode ser negativo!");
      return;
    }
  
    setValue(inputValue);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      onSubmit({
        name,
        description,
        value,
        lat,
        lng,
        badges: badges.split(",").map((b) => b.trim()),
      });
      
      toast.success("Ponto salvo com sucesso!");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição:*</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Valor:*</label>
        <input
          type="number"
          value={value}
          onChange={handleValueChange}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Latitude:*</label>
        <input
          type="number"
          value={lat}
          onChange={handleLatChange}
          required
          className={"mt-1 p-2 w-full border border-gray-300 rounded-md"}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Longitude:*</label>
        <input
          type="number"
          value={lng}
          onChange={handleLngChange}
          required
          className={"mt-1 p-2 w-full border border-gray-300 rounded-md"}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Badges (separados por vírgula):*</label>
        <input
          type="text"
          value={badges}
          onChange={(e) => setBadges(e.target.value)}
          required
          className="mt-1 p-2 w-full border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
      >
        Salvar
      </button>
    </form>
  );
};