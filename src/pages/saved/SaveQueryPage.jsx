import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import QueryForm from "../../components/QueryForm";
import { updateQuery } from "../../store/slices/savedQueriesSlice";
import { message } from "antd";

export default function EditQueryPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryData = useSelector((state) =>
    state.savedQueries.list.find((q) => String(q.id) === String(id))
  );

  if (!queryData) {
    return <div style={{ color: "#fff", padding: 24 }}>Запрос не найден</div>;
  }

  const handleSubmit = (values) => {
    const normalized = {
      ...values,
      id: queryData.id,
      maxResults: values.maxResults ? Number(values.maxResults) : undefined
    };

    dispatch(updateQuery(normalized));
    message.success("Изменения сохранены");
    navigate("/home/saved");
  };

  return (
    <QueryForm
      initialValues={queryData}
      onSubmit={handleSubmit}
      isEdit={true}
    />
  );
}
