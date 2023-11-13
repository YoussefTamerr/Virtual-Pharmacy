import { useState } from "react";
import {
  Form,
  Input,
  Button,
  DatePicker,
  InputNumber,
  Upload,
  message,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  CalendarOutlined,
  DollarOutlined,
  TeamOutlined,
  BookOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PharmacistSignup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (formData) => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append(
      "dateOfBirth",
      formData.dateOfBirth.format("YYYY-MM-DD")
    );
    formDataToSend.append("hourlyRate", formData.hourlyRate);
    formDataToSend.append("affiliation", formData.affiliation);
    formDataToSend.append(
      "educationalBackground",
      formData.educationalBackground
    );
    formDataToSend.append("nationalId", formData.nationalId[0].originFileObj);
    formDataToSend.append(
      "workingLicense",
      formData.workingLicense[0].originFileObj
    );
    formDataToSend.append(
      "pharmacyDegree",
      formData.pharmacyDegree[0].originFileObj
    );
    try {
      const response = await fetch(`http://localhost:5000/pharmacist`, {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        message.success("Request submitted successfully");
        form.resetFields();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  const getFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const handleBeforeUpload = (file, field) => {
    const isPdf = file.type === "application/pdf";
    if (!isPdf) {
      message.error("You can only upload PDF files!");
    }
    if (isPdf) {
      form.setFieldsValue({
        [field]: [file],
      });
    }
    return false;
  };

  return (
    <>
      <h1>Pharmacist Registration Form</h1>
      <Form
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        encType="multipart/form-data"
        style={{
          width: "40%",
        }}
      >
        <Form.Item
          name="username"
          rules={[
            { min: 3, message: "Username must be at least 3 characters." },
            { max: 20, message: "Username must be at most 30 characters." },
            {
              pattern: /^[a-zA-Z0-9_]+$/,
              message: "Username must contain only letters & numbers.",
            },
            { required: true, message: "Please input your username!" },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 6, message: "Password must be at least 6 characters." },
            {
              pattern:
                /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]{6,}$/,
              message:
                "Password must contain only letters and at least one number.",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="dateOfBirth"
          rules={[
            { required: true, message: "Please select your date of birth!" },
          ]}
        >
          <DatePicker
            prefix={<CalendarOutlined />}
            placeholder="Date of Birth"
          />
        </Form.Item>
        <Form.Item
          name="hourlyRate"
          rules={[
            { required: true, message: "Please input your hourly rate!" },
            {
              type: "number",
              min: 0,
              message: "Hourly rate must be positive.",
            },
          ]}
        >
          <InputNumber
            prefix={<DollarOutlined />}
            placeholder="Hourly Rate"
            style={{ width: "50%" }}
          />
        </Form.Item>
        <Form.Item
          name="affiliation"
          rules={[
            { required: true, message: "Please input your affiliation!" },
          ]}
        >
          <Input prefix={<TeamOutlined />} placeholder="Affiliation" />
        </Form.Item>
        <Form.Item
          name="educationalBackground"
          rules={[
            {
              required: true,
              message: "Please input your educational background!",
            },
          ]}
        >
          <Input
            prefix={<BookOutlined />}
            placeholder="Educational Background"
          />
        </Form.Item>
        <Form.Item
          name="nationalId"
          label="National ID"
          valuePropName="fileList"
          getValueFromEvent={(e) => getFile(e, "nationalId")}
          rules={[
            {
              required: true,
              message: "Please upload your national ID!",
            },
          ]}
        >
          <Upload
            name="nationalId"
            listType="picture"
            beforeUpload={(file) => handleBeforeUpload(file, "nationalId")}
            accept=".pdf"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="workingLicense"
          label="Working License"
          valuePropName="fileList"
          getValueFromEvent={(e) => getFile(e, "workingLicense")}
          rules={[
            {
              required: true,
              message: "Please upload your working license!",
            },
          ]}
        >
          <Upload
            name="workingLicense"
            listType="picture"
            beforeUpload={(file) => handleBeforeUpload(file, "workingLicense")}
            accept=".pdf"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item
          name="pharmacyDegree"
          label="Pharmacy Degree"
          valuePropName="fileList"
          getValueFromEvent={(e) => getFile(e, "pharmacyDegree")}
          rules={[
            {
              required: true,
              message: "Please upload your pharmacy degree!",
            },
          ]}
        >
          <Upload
            name="pharmacyDegree"
            listType="picture"
            beforeUpload={(file) => handleBeforeUpload(file, "pharmacyDegree")}
            accept=".pdf"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
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
          navigate("/signup/patient");
        }}
      >
        Want to register as a Patient? Click Here.
      </Button>
    </>
  );
};

export default PharmacistSignup;
