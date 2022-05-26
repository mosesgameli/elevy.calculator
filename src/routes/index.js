import { Navigate, Route, Routes } from "react-router-dom";
import { Home, Recents, RecentsDetail, Review } from "views";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/recents" element={<Recents />} />
      <Route path="/recents/:id" element={<RecentsDetail />} />
      <Route path="/reviews" element={<Review />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default AppRoutes;
