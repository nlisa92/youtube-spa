import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import VideoPage from "./pages/videoPage/VideoPage";
import SaveQueryPage from "./pages/saved/SaveQueryPage";
import SavedQueries from "./pages/saved/SavedQueries";
import EditQueryPage from "./pages/saved/EditQueryPage";
import SearchPage from "./pages/search/SearchPage";

function ProtectedRoute({ children }) {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      >
        <Route index element={<SearchPage />} />
        <Route path="saved" element={<SavedQueries />} />
        <Route path="save-query" element={<SaveQueryPage />} />
        <Route path="edit-query/:id" element={<EditQueryPage />} />
      </Route>

      <Route
        path="/watch/:id"
        element={
          <ProtectedRoute>
            <VideoPage />
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
