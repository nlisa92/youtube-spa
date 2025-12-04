import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteQuery, updateQuery } from "../../store/slices/savedQueriesSlice";
import { Card, Button, Typography, Modal, message } from "antd";
import QueryForm from "../../components/QueryForm";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function SavedQueries() {
  const queries = useSelector((state) => state.savedQueries.list);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editableQuery, setEditableQuery] = useState(null);

  const runQuery = (query) => {
    navigate("/home", {
      state: { savedQuery: query },
    });
  };

  const openEditModal = (query) => {
    setEditableQuery(query);
    setEditModalOpen(true);
  };

  const handleEditSubmit = (values) => {
    dispatch(updateQuery({ ...values, id: editableQuery.id }));
    message.success("Изменения сохранены");
    setEditModalOpen(false);
  };

  const handleDelete = (q) => {
    Modal.confirm({
      title: "Удалить запрос?",
      content: q.name,
      okText: "Удалить",
      cancelText: "Отмена",
      okButtonProps: { danger: true },
      onOk: () => dispatch(deleteQuery(q.id)),
    });
  };

  return (
    <div style={{ padding: 24, color: "#fff" }}>
      <Title style={{ color: "#fff" }}>Сохранённые запросы</Title>

      {queries.map((q) => (
        <Card
          key={q.id}
          style={{
            marginBottom: 16,
            background: "rgba(30,30,60,0.7)",
            border: "1px solid #5358dd",
          }}
        >
          <h3 style={{ color: "#fff" }}>{q.name}</h3>

          <p style={{ color: "#bbb", whiteSpace: "pre-wrap" }}>
            {typeof q.query === "string"
              ? q.query
              : JSON.stringify(q.query, null, 2)}
          </p>

          <Button
            onClick={() => runQuery(q)}
            type="primary"
            style={{ marginRight: 8 }}
          >
            Выполнить
          </Button>

          <Button
            onClick={() => openEditModal(q)}
            style={{ marginRight: 8 }}
          >
            Редактировать
          </Button>

          <Button danger onClick={() => handleDelete(q)}>
            Удалить
          </Button>
        </Card>
      ))}

      <Modal
        title="Редактировать запрос"
        open={editModalOpen}
        onCancel={() => setEditModalOpen(false)}
        footer={null}
        destroyOnHidden
      >
        {editableQuery && (
          <QueryForm
            initialValues={editableQuery}
            onSubmit={handleEditSubmit}
            isEdit={true}
          />
        )}
      </Modal>
    </div>
  );
}
