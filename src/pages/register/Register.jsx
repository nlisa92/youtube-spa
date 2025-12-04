import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/slices/authSlice";
import { useNavigate } from "react-router";
import { Form, Input, Button, Typography, Card, Select, InputNumber, message } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    const result = await dispatch(registerUser(values));
    setLoading(false);

    if (result.meta.requestStatus === "fulfilled") {
      message.success("Регистрация прошла успешно!");
      navigate("/login");
    } else {
      message.error(result.payload || "Ошибка регистрации");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #0d0034, #000)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
        color: "#fff",
      }}
    >
      <Card
        style={{
          width: 450,
          padding: 24,
          background: "rgba(25,25,55,0.7)",
          border: "1px solid #4349c7",
          borderRadius: 14,
          boxShadow: "0 0 20px rgba(70,90,255,0.25)",
        }}
      >
        <Title
          level={3}
          style={{
            textAlign: "center",
            color: "#eef0ff",
            fontWeight: 600,
            marginBottom: 20,
          }}
        >
          Создать аккаунт
        </Title>

        <Form form={form} layout="vertical" onFinish={handleRegister}>
          <Form.Item
            label={<span style={{ color: "#d3d6ff" }}>Имя пользователя</span>}
            name="username"
            rules={[{ required: true, message: "Введите имя пользователя" }]}
          >
            <Input
              size="large"
              placeholder="Введите имя пользователя"
              style={{
                background: "rgba(20,20,45,0.7)",
                border: "1px solid #5358dd",
                color: "#000",
                borderRadius: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#d3d6ff" }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Введите email" },
              { type: "email", message: "Неверный email" },
            ]}
          >
            <Input
              size="large"
              placeholder="Введите email"
              style={{
                border: "1px solid #5358dd",
                color: "#000",
                borderRadius: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#d3d6ff" }}>Пароль</span>}
            name="password"
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              size="large"
              placeholder="Введите пароль"
              style={{
                border: "1px solid #5358dd",
                color: "#000",
                borderRadius: 10,
              }}
            />
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#d3d6ff" }}>Пол</span>}
            name="gender"
            rules={[{ required: true, message: "Выберите пол" }]}
          >
            <Select
              placeholder="Выберите пол"
              size="large"
              style={{
                background: "rgba(20,20,45,0.7)",
                border: "1px solid #5358dd",
                color: "#000",
                borderRadius: 10,
              }}
            >
              <Option value="male">Мужской</Option>
              <Option value="female">Женский</Option>
              <Option value="other">Другой</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label={<span style={{ color: "#d3d6ff" }}>Возраст</span>}
            name="age"
            rules={[{ required: true, message: "Введите возраст" }]}
          >
            <InputNumber
              min={1}
              max={120}
              placeholder="Введите возраст"
              size="large"
              style={{
                width: "100%",
                border: "1px solid #5358dd",
                color: "#000",
                borderRadius: 10,
              }}
            />
          </Form.Item>

          {error && (
            <Text
              style={{
                display: "block",
                marginBottom: 12,
                color: "#ff6b6b",
                fontWeight: 500,
              }}
            >
              {error}
            </Text>
          )}

          <Form.Item>
            <Button
              htmlType="submit"
              size="large"
              block
              loading={loading || status === "loading"}
              style={{
                background: "rgba(70,90,255,0.25)",
                border: "1px solid #7b8dff",
                color: "#e8eaff",
                fontWeight: 500,
                borderRadius: 10,
              }}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: "center", marginTop: 12 }}>
          <Text style={{ color: "#d0d2ff" }}>
            Уже есть аккаунт?{" "}
            <span
              onClick={() => navigate("/login")}
              style={{
                color: "#eef0ff",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Войти
            </span>
          </Text>
        </div>
      </Card>
    </div>
  );
}
