import { Form, Input, Button, message } from "antd";

function AdminForm() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const response = await fetch(`http://localhost:5000/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });
    const data = await response.json();
    if (response.ok) {
      message.success("Admin created successfully");
      form.resetFields();
    } else {
      message.error(data.message);
    }
  };

  return (
    <>
      <h1>Add A New Admin</h1>
      <Form
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
        style={{
          width: "40%",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Please input a username",
            },
            {
              min: 3,
              max: 30,
              message: "Username must be between 3 and 30 characters",
            },
            {
              pattern: /^[a-zA-Z0-9]+$/,
              message: "Username must be alphanumeric",
            },
          ]}
        >
          <Input placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input a password!",
            },
            {
              min: 6,
              message: "Password must be at least 6 characters",
            },
            {
              pattern: /^(?=.*[0-9]).+$/,
              message: "Password must include at least one number",
            },
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="primary" htmlType="submit">
            Create Admin
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default AdminForm;
