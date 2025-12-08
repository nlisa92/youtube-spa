import { useEffect } from "react";
import { Form, Input, Select, InputNumber, Button } from "antd";

const SORT_OPTIONS = [
  "date",
  "rating",
  "relevance",
  "title",
  "videoCount",
  "viewCount",
];

export default function QueryForm({ initialValues, onSubmit, isEdit }) {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onSubmit}
    >
      <Form.Item label="Запрос" name="query">
        <Input disabled={isEdit} />
      </Form.Item>

      <Form.Item
        label="Название"
        name="name"
        rules={[{ required: true, message: "Введите название" }]}
      >
        <Input placeholder="Например: Мой поиск котов" />
      </Form.Item>

      <Form.Item label="Сортировать по" name="order">
        <Select placeholder="Не выбрано (по умолчанию)">
          {SORT_OPTIONS.map((option) => (
            <Select.Option key={option} value={option}>
              {option}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Максимальное количество"
        name="maxResults"
        rules={[{ type: "number", min: 1, max: 50 }]}
      >
        <InputNumber placeholder="1–50" style={{ width: "100%" }} />
      </Form.Item>

      <Button type="primary" htmlType="submit" block>
        {isEdit ? "Сохранить изменения" : "Сохранить запрос"}
      </Button>
    </Form>
  );
}
