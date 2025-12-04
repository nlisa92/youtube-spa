import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Input,
  Card,
  Row,
  Col,
  Typography,
  Button,
  message,
  Modal,
  Form,
  Select,
} from "antd";
import {
  AppstoreOutlined,
  UnorderedListOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addQuery } from "../../store/slices/savedQueriesSlice";
import youtubeAPI from "../../api/youtube";

const { Title, Text } = Typography;
const { Search } = Input;

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (location.state?.savedQuery) {
      const q = location.state.savedQuery;

      const queryString =
        typeof q.query === "string" ? q.query : JSON.stringify(q.query);

      setQuery(queryString);
      runSearch(queryString, q.order, q.maxResults);
    }
  }, [location.state]);

  useEffect(() => {
    form.setFieldsValue({ query });
  }, [query]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const { data } = await youtubeAPI.get("/search", {
        params: { q: query, maxResults: 12 },
      });

      setVideos(data.items || []);
    } catch (err) {
      message.error("Ошибка поиска");
    } finally {
      setLoading(false);
    }
  };

  const runSearch = async (q, order, maxResults) => {
    setLoading(true);

    try {
      const params = {
        q,
        maxResults: Number(maxResults) || 12,
      };

      if (order) params.order = order;

      const { data } = await youtubeAPI.get("/search", { params });

      setVideos(data.items || []);
    } catch {
      message.error("Ошибка при выполнении сохранённого запрос");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Title
        level={2}
        style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#e8eaff",
          fontWeight: 600,
        }}
      >
        Поиск видео 🚀
      </Title>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <Search
          placeholder="search"
          enterButton="Найти"
          size="large"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onSearch={handleSearch}
          loading={loading}
          style={{ maxWidth: 500, width: "100%" }}
          suffix={
            <HeartOutlined
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              style={{
                color: "#ff4d6d",
                fontSize: 22,
                cursor: "pointer",
                padding: "0 6px",
                transition: "0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.2)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          }
        />

        <Button
          icon={<UnorderedListOutlined />}
          type={viewMode === "list" ? "primary" : "default"}
          onClick={() => setViewMode("list")}
        />

        <Button
          icon={<AppstoreOutlined />}
          type={viewMode === "grid" ? "primary" : "default"}
          onClick={() => setViewMode("grid")}
        />
      </div>

      {videos.length > 0 && (
        <Text
          style={{
            display: "block",
            textAlign: "center",
            color: "#d3d6ff",
            marginBottom: 24,
          }}
        >
          Видео по запросу «{query}»
        </Text>
      )}

      {viewMode === "grid" ? (
        <Row gutter={[16, 16]}>
          {videos.map((video) => (
            <Col key={video.id.videoId} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate(`/watch/${video.id.videoId}`)}
                cover={
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    style={{ borderRadius: 10, width: "100%", height: "100%" }}
                  />
                }
                style={{
                  borderRadius: 12,
                  background: "rgba(25,25,55,0.7)",
                  border: "1px solid #4349c7",
                }}
              >
                <Card.Meta
                  title={
                    <Text style={{ color: "#fff", fontWeight: 600 }}>
                      {video.snippet.title}
                    </Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {videos.map((video) => (
            <Card
              key={video.id.videoId}
              hoverable
              onClick={() => navigate(`/watch/${video.id.videoId}`)}
              style={{
                display: "flex",
                borderRadius: 12,
                background: "rgba(25,25,55,0.7)",
                border: "1px solid #4349c7",
                overflow: "hidden",
              }}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                width={200}
                style={{ marginRight: 16 }}
              />

              <Card.Meta
                title={
                  <Text style={{ color: "#fff", fontWeight: 600 }}>
                    {video.snippet.title}
                  </Text>
                }
                description={
                  <Text style={{ color: "#c7caff" }}>
                    {video.snippet.description}
                  </Text>
                }
              />
            </Card>
          ))}
        </div>
      )}

      <Modal
        title="Сохранить запрос"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => form.submit()}
        okText="Сохранить"
        cancelText="Отмена"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            name: "",
            order: "",
            maxResults: 12,
            query: query, // 🔥 фиксируем изначально
          }}
          onFinish={(values) => {
            dispatch(addQuery(values));
            setIsModalOpen(false);
            message.success("Запрос сохранён!");
          }}
        >
          <Form.Item
            label="Название"
            name="name"
            rules={[{ required: true, message: "Введите название" }]}
          >
            <Input placeholder="Введите название запроса" />
          </Form.Item>

          <Form.Item label="Запрос" name="query">
            <Input disabled />
          </Form.Item>

          <Form.Item label="Сортировка" name="order">
            <Select
              options={[
                { value: "", label: "Без сортировки" },
                { value: "date", label: "Дата" },
                { value: "rating", label: "Рейтинг" },
                { value: "viewCount", label: "Просмотры" },
              ]}
            />
          </Form.Item>

          <Form.Item label="Максимум видео" name="maxResults">
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
