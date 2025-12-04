import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Typography, Row, Col, Spin, Button } from "antd";
import {
  LikeOutlined,
  DislikeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import youtubeAPI from "../../api/youtube";

const { Title, Text, Paragraph } = Typography;

export default function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [video, setVideo] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVideo() {
      try {
        setLoading(true);

        const { data: videoData } = await youtubeAPI.get("/videos", {
          params: {
            part: "snippet,statistics",
            id,
          },
        });

        setVideo(videoData.items[0]);

        const { data: relatedData } = await youtubeAPI.get("/search", {
          params: {
            part: "snippet",
            relatedToVideoId: id,
            type: "video",
            maxResults: 10,
          },
        });

        setRelated(relatedData.items);
      } catch (e) {
        console.error("Error loading video:", e);
      } finally {
        setLoading(false);
      }
    }

    loadVideo();
  }, [id]);

  if (loading || !video) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 40,
          color: "#fff",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  const v = video.snippet;
  const stats = video.statistics;

  return (
    <div
      style={{
        padding: 24,
        minHeight: "100vh",
        margin: "0 auto",
        background: "radial-gradient(circle at top, #0d0034, #000)",
        color: "#fff",
      }}
    >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        onClick={() => navigate(-1)}
        style={{
          marginBottom: 20,
          fontSize: 16,
          color: "#b8c0ff",
          fontWeight: 500,
        }}
      >
        Назад
      </Button>

      <Row gutter={32}>
        <Col span={16}>
          <div
            style={{
              width: "100%",
              height: 480,
              marginBottom: 20,
              borderRadius: 12,
              overflow: "hidden",
              boxShadow: "0 0 15px rgba(70,90,255,0.35)",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={v.title}
              frameBorder="0"
              allowFullScreen
            ></iframe>
          </div>

          <Title
            level={3}
            style={{
              color: "#eef0ff",
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {v.title}
          </Title>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <Text style={{ color: "#d3d6ff", lineHeight: 1.6 }}>
              Канал:{" "}
              <strong style={{ color: "#ffffff" }}>{v.channelTitle}</strong>
              <br />
              Дата публикации: {new Date(v.publishedAt).toLocaleDateString()}
              <br />
              Просмотры: {Number(stats.viewCount).toLocaleString()}
            </Text>

            <div style={{ display: "flex", gap: 12 }}>
              <Button
                icon={<LikeOutlined />}
                style={{
                  background: "rgba(80,100,255,0.15)",
                  border: "1px solid #7b8dff",
                  color: "#e8eaff",
                  fontWeight: 500,
                }}
              >
                {stats.likeCount}
              </Button>

              <Button
                icon={<DislikeOutlined />}
                style={{
                  background: "rgba(90,90,150,0.15)",
                  border: "1px solid #6770c9",
                  color: "#d7dbff",
                  fontWeight: 500,
                }}
              >
                Не нравится
              </Button>
            </div>
          </div>

          <Card
            style={{
              background: "rgba(25,25,55,0.7)",
              border: "1px solid #4349c7",
              borderRadius: 12,
            }}
          >
            <Paragraph
              style={{
                color: "#e5e7ff",
                whiteSpace: "pre-line",
                lineHeight: 1.6,
              }}
            >
              {v.description}
            </Paragraph>
          </Card>
        </Col>

        <Col span={8}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {related.map((item) => (
              <Card
                key={item.id.videoId}
                hoverable
                style={{
                  display: "flex",
                  cursor: "pointer",
                  background: "rgba(30,30,60,0.7)",
                  border: "1px solid #5358dd",
                  borderRadius: 10,
                }}
                onClick={() => navigate(`/watch/${item.id.videoId}`)}
              >
                <img
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                  width={150}
                  style={{ borderRadius: 6, marginRight: 12 }}
                />

                <div>
                  <Text strong style={{ color: "#ffffff" }}>
                    {item.snippet.title}
                  </Text>
                  <br />
                  <Text style={{ color: "#d0d2ff" }}>
                    {item.snippet.channelTitle}
                  </Text>
                </div>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
}
