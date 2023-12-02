import { Form, Input, Button, message } from "antd";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function ForgotPassword() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const body = { ...values, role: location.pathname.split("/")[2] };
    const response = await fetch(`http://localhost:10000/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });
    const data = await response.json();
    if (response.ok) {
      message.success(data.message);
      form.resetFields();
    } else {
      message.error(data.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <h3>Please Enter the Email You Registered With</h3>
      <Form
        form={form}
        onFinish={handleSubmit}
        scrollToFirstError
        style={{
          width: "40%",
        }}
      >
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
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

export default ForgotPassword;
