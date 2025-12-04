import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/slices/authSlice";
import { Button } from "antd";

import { HeartOutlined } from "@ant-design/icons";

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: 24,
        color: "#fff",
        background: "radial-gradient(circle at top, #0d0034, #000)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#d6d8ff",
            }}
          >
            YouTube SPA
          </div>

          <Button
            type="text"
            style={{ color: "#dfe1ff" }}
            onClick={() => navigate("/home")}
          >
            Поиск
          </Button>

          <Button
            type="text"
            icon={<HeartOutlined />}
            style={{ color: "#e0e2ff" }}
            onClick={() => navigate("/home/saved")}
          >
            Избранное
          </Button>
        </div>

        <Button
          type="primary"
          danger
          onClick={handleLogout}
          style={{
            background: "#ff3b55",
            border: "none",
            fontWeight: 500,
          }}
        >
          Выйти
        </Button>
      </div>

      <Outlet />
    </div>
  );
}
