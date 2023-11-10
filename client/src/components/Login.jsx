import { Form, Input, Button, message, Select, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState("patient");

  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/${userRole}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        navigate("/home");
      } else {
        const data = await response.json();
        message.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Space>
        <h2>Login as a{userRole == "admin" && "n"}</h2>
        <Select
          defaultValue="patient"
          size="middle"
          style={{ width: 110 }}
          onChange={(value) => setUserRole(value)}
          options={[
            { value: "patient", label: "Patient" },
            { value: "pharmacist", label: "Pharmacist" },
            { value: "admin", label: "Admin" },
          ]}
        />
      </Space>
      <Form
        name="normal_login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        style={{
          width: "40%",
        }}
        size="large"
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: "Please input your Username!" },
            { min: 3, message: "Username must be at least 3 characters." },
            { max: 20, message: "Username must be at most 30 characters." },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Username must contain only letters & numbers.",
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "Password must be at least 6 characters." },
            {
              pattern: /^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/,
              message: "Password must contain only letters & numbers.",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
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
            className="login-form-button"
            loading={loading}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
      {userRole != "admin" && (
        <Button
          type="link"
          onClick={() => {
            navigate("/signup/" + userRole);
          }}
        >
          Don&apos;t have an account? Sign up here.
        </Button>
      )}
      {/* <Flex justify="center" align="center" vertical gap={2}>
        {userRole != "patient" && <a href="/login/patient">Login as patient</a>}
        {userRole != "admin" && <a href="/login/admin">Login as admin</a>}
        {userRole != "pharmacist" && (
          <a href="/login/pharmacist">Login as pharmacist</a>
        )}
      </Flex> */}
    </>
  );
};

export default Login;