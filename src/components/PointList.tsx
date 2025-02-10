import { Point } from '../mockes/fakeApi';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

interface PointListProps {
  points: Point[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onSelect: (point: Point) => void;
}

export const PointList = ({ points, onEdit, onDelete, onSelect }: PointListProps) => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      {points.length === 0 ? (
        <p className="text-center">Nenhum ponto encontrado.</p>
      ) : (
      <ul className="space-y-4">
        {points.map((point) => (
          <li key={point.id} 
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow w-full max-w-full cursor-pointer"
          onClick={() => onSelect(point)}>
            <strong className="text-lg font-medium text-gray-900 break-words">{point.name}</strong>
            <p className="text-sm text-gray-700 mt-1 break-words">{point.description}</p>
            <p className="text-sm text-gray-700 mt-1">Valor: R$ {point.value}</p>
            <p className="text-sm text-gray-700 mt-1 break-words">Badges: {point.badges.join(', ')}</p>
            <div className="mt-4 space-x-2 flex justify-end">
              <button
                onClick={() => onEdit(point.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-1 cursor-pointer"
              >
                <PencilIcon className="w-5 h-5" /> Editar
              </button>
              <button
                onClick={(e) => {e.stopPropagation(); onDelete(point.id)}}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-1 cursor-pointer"
              >
                <TrashIcon className="w-5 h-5" /> Excluir
              </button>
            </div>
          </li>
        ))}
      </ul>
      )}
    </div>
  );
};