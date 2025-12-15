import { Input, Button, Space } from "antd";
import {
  HeartOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

const { Search } = Input;

export default function SearchHeader({
  query,
  setQuery,
  loading,
  onSearch,
  openSaveModal,
  viewMode,
  setViewMode,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 8,
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
        onSearch={onSearch}
        loading={loading}
        style={{ maxWidth: 500, width: "100%" }}
        suffix={
          <HeartOutlined
            onClick={(e) => {
              e.stopPropagation();
              openSaveModal();
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
      <Space>
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
      </Space>
    </div>
  );
}
