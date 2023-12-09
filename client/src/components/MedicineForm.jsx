import { useState } from "react";
import { Form, Input, Button, message, Upload, Checkbox } from "antd";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";

function MedicineForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const onFinish = async (formData) => {
    setLoading(true);
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("availableQuantity", formData.availableQuantity);
    formDataToSend.append("details", formData.details);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("sales", 0);
    formDataToSend.append("image", formData.image[0].originFileObj);
    formDataToSend.append("medType", isChecked ? "prescription" : "countertop");
    try {
      const response = await fetch(`http://localhost:10000/medicine`, {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        message.success(data.message);
        form.resetFields();
      } else {
        message.error(data.message);
        console.error(data);
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
    const isImage =
      file.type === "image/png" ||
      file.type === "image/jpeg" ||
      file.type === "image/jpg";
    if (!isImage) {
      message.error("You can only upload PNG, JPEG, or JPG files!");
    }
    if (isImage) {
      form.setFieldsValue({
        [field]: [file],
      });
    }
    return false;
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <h1>Add Medicine</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        style={{ width: "40%" }}
      >
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the medicine",
            },
          ]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="price"
          rules={[
            {
              required: true,
              message: "Please input the price of the medicine",
            },
          ]}
        >
          <Input type="number" placeholder="Price" />
        </Form.Item>
        <Form.Item
          name="availableQuantity"
          rules={[
            {
              required: true,
              message: "Please input the available quantity of the medicine",
            },
          ]}
        >
          <Input type="number" placeholder="Available Quantity" />
        </Form.Item>
        <Form.Item
          name="details"
          rules={[
            {
              required: true,
              message: "Please input the details of the medicine",
            },
          ]}
        >
          <Input.TextArea placeholder="Details" />
        </Form.Item>
        <Form.Item
          name="category"
          rules={[
            {
              required: true,
              message: "Please input the category of the medicine",
            },
          ]}
        >
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item name="medType">
          <Checkbox checked={isChecked} onChange={handleCheckboxChange}>
            Prescription Medicine
          </Checkbox>
        </Form.Item>
        <Form.Item
          name="image"
          label="Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => getFile(e, "image")}
          rules={[
            {
              required: true,
              message: "Please upload a medicine image",
            },
          ]}
        >
          <Upload
            name="image"
            listType="picture"
            beforeUpload={(file) => handleBeforeUpload(file, "image")}
            accept=".jpg,.jpeg,.png"
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            icon={<PlusOutlined />}
            loading={loading}
          >
            Add Medicine
          </Button>
        </Form.Item>
      </Form>
      
    </>
  );
}

export default MedicineForm;
