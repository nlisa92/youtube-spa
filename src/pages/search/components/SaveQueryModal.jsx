import { Modal, Form, Input, Select } from "antd";

export default function SaveQueryModal({
  open,
  close,
  form,
  query,
  dispatch,
  addQuery,
  message,
}) {
  return (
    <Modal
      title="Сохранить запрос"
      open={open}
      onCancel={close}
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
          query,
        }}
        onFinish={(values) => {
          dispatch(addQuery(values));
          close();
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
  );
}
