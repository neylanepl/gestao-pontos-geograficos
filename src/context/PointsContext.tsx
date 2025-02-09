import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { fetchPoints, Point } from "../fakeApi";

interface PointsContextType {
  points: Point[];
  setPoints: React.Dispatch<React.SetStateAction<Point[]>>;
  isLoading: boolean;
}

const PointsContext = createContext<PointsContextType>({
  points: [],
  setPoints: () => {},
  isLoading: true,
});


interface PointsProviderProps {
  children: ReactNode;
}

export const PointsProvider = ({ children }: PointsProviderProps) => {
  const [points, setPoints] = useState<Point[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (points.length === 0) {
      fetchPoints().then((data) => {setPoints(data); setIsLoading(false);});
    }
  }, []);

  return <PointsContext.Provider value={{ points, setPoints, isLoading }}>{children}</PointsContext.Provider>;
};

export const usePoints = () => useContext(PointsContext);
