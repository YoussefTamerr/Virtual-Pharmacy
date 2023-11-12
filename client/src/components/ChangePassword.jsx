import { Form, Input, Button, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const body = { newPassword: values.password };

    if (location.pathname.startsWith("/change-password")) {
      const response = await fetch(
        `http://localhost:5000/auth${location.pathname}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.success("Password changed successfully");
        form.resetFields();
        navigate("/login");
      } else {
        message.error(data.message);
      }
    } else {
      const response = await fetch(
        `http://localhost:5000/auth/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(body),
        }
      );
      const data = await response.json();
      if (response.ok) {
        message.success("Password changed successfully");
        form.resetFields();
      } else {
        message.error(data.message);
      }
    }
  };

  return (
    <>
      <h1>Change Password</h1>
      <Form
        form={form}
        name="change_password"
        onFinish={onFinish}
        style={{ width: "40%" }}
      >
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
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
          hasFeedback
        >
          <Input.Password placeholder="New Password" />
        </Form.Item>

        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item style={{ display: "flex", justifyContent: "center" }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default ChangePassword;
