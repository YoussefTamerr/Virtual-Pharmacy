import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Select, DatePicker, message } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  ContactsOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const PatientSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/patient/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        navigate("/login");
      } else {
        const data = await response.json();
        message.error(data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <h1>Patient Signup</h1>
      <Form
        form={form}
        name="signup"
        onFinish={onFinish}
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
              message: "Please input your username!",
            },
            { min: 3, message: "Username must be at least 3 characters." },
            { max: 20, message: "Username must be at most 30 characters." },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Username must contain only letters & numbers.",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not a valid email!",
            },
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            { min: 6, message: "Password must be at least 6 characters." },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/,
              message:
                "Password must contain only letters and at least one number.",
            },
          ]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <Form.Item
          name="birthdate"
          rules={[
            {
              required: true,
              message: "Please select your date of birth!",
            },
          ]}
        >
          <DatePicker placeholder="Date of Birth" />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[
            {
              required: true,
              message: "Please select your gender!",
            },
          ]}
        >
          <Select placeholder="Select Gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="mobileNumber"
          rules={[
            {
              required: true,
              message: "Please input your mobile number!",
            },
          ]}
        >
          <Input prefix={<PhoneOutlined />} placeholder="Mobile Number" />
        </Form.Item>

        <Form.Item
          name={"emergencyName"}
          rules={[
            {
              required: true,
              message: "Please input the emergency contact's full name!",
            },
          ]}
        >
          <Input
            prefix={<ContactsOutlined />}
            placeholder="Emergency Contact Full Name"
          />
        </Form.Item>

        <Form.Item
          name={"emergencyPhoneNumber"}
          rules={[
            {
              required: true,
              message: "Please input the emergency contact's mobile number!",
            },
          ]}
        >
          <Input
            prefix={<PhoneOutlined />}
            placeholder="Emergency Contact Mobile Number"
          />
        </Form.Item>

        <Form.Item
          name={"emergencyRelation"}
          rules={[
            {
              required: true,
              message: "Please input the emergency contact's relation to you!",
            },
          ]}
        >
          <Input
            prefix={<ContactsOutlined />}
            placeholder="Emergency Contact Relation"
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
            Sign Up
          </Button>
        </Form.Item>
      </Form>
      <Button
        type="link"
        onClick={() => {
          navigate("/login");
        }}
      >
        Already have an account? Log in here.
      </Button>
      <Button
        type="link"
        onClick={() => {
          navigate("/signup/pharmacist");
        }}
      >
        Want to register as a Pharmacist? Click Here.
      </Button>
    </>
  );
};

export default PatientSignup;
