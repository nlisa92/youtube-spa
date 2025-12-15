import { Row, Col, Card, Typography } from "antd";

const { Text } = Typography;

export default function VideoGrid({ videos, navigate, formatViews }) {
  return (
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
                style={{ borderRadius: 10 }}
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
              description={
                <Text style={{ color: "#c7caff" }}>
                  👁{" "}
                  {video.viewCount ? formatViews(Number(video.viewCount)) : "—"}{" "}
                  просмотров
                </Text>
              }
            />
          </Card>
        </Col>
      ))}
    </Row>
  );
}
