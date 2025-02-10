import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {RegisterPoint} from "./pages/RegisterPoint";
import {ListPoints} from "./pages/ListPoints";
import {EditPoint} from "./pages/EditPoint";
import { PointsProvider } from "./context/PointsContext";
import { Toaster } from "react-hot-toast";

export const App = () => {
  return (
    <PointsProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<ListPoints />} />
          <Route path="/register" element={<RegisterPoint />} />
          <Route path="/edit/:id" element={<EditPoint />} />
        </Routes>
      </Router>
    </PointsProvider>
  );
};
