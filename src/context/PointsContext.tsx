import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchPoints, Point } from "../mockes/fakeApi";

interface PointsContextType {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  isLoading: boolean;
  lastAddedPoint: Point | null;
  setLastAddedPoint: (point: Point | null) => void;
  lastEditedPoint: Point | null;
  setLastEditedPoint: (point: Point | null) => void;
}

const PointsContext = createContext<PointsContextType>({
  points: [],
  setPoints: () => {},
  isLoading: true,
  lastAddedPoint: null,
  setLastAddedPoint: () => {},
  lastEditedPoint: null,
  setLastEditedPoint: () => {},
});

interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider = ({ children }: PointsProviderProps) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastAddedPoint, setLastAddedPoint] = useState<Point | null>(null);
  const [lastEditedPoint, setLastEditedPoint] = useState<Point | null>(null);

  useEffect(() => {
    if (points.length === 0) {
      fetchPoints().then((data) => {setPoints(data); setIsLoading(false);});
    }
  }, []);

  return <PointsContext.Provider value={{ points, setPoints, isLoading, lastAddedPoint, setLastAddedPoint, lastEditedPoint, setLastEditedPoint }}>{children}</PointsContext.Provider>;
};

export const usePoints = () => useContext(PointsContext);
