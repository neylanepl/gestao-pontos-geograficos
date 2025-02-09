import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RegisterPoint} from "./pages/RegisterPoint";
import {ListPoints} from "./pages/ListPoints";
import {EditPoint} from "./pages/EditPoint";
import { PointsProvider } from "./context/PointsContext";

export const App = () => {
  return (
    <PointsProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ListPoints />} />
          <Route path="/register" element={<RegisterPoint />} />
          <Route path="/edit/:id" element={<EditPoint />} />
        </Routes>
      </Router>
    </PointsProvider>
  );
};
