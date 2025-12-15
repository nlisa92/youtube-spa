import { Card, Typography } from "antd";

const { Text } = Typography;

export default function VideoList({ videos, navigate, formatViews }) {
  return (
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
              <>
                <Text style={{ color: "#c7caff" }}>
                  {video.snippet.description}
                </Text>
                <br />
                <Text style={{ color: "#9fa2ff" }}>
                  👁{" "}
                  {video.viewCount ? formatViews(Number(video.viewCount)) : "—"}{" "}
                  просмотров
                </Text>
              </>
            }
          />
        </Card>
      ))}
    </div>
  );
}
