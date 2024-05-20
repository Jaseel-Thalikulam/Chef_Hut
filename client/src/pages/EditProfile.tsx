import { Button, Form, Input } from "antd";
import "../styles/editProfile.css";
import { valueType } from "antd/es/statistic/utils";
import { useEffect } from "react";

function EditProfile() {
  const onFinish = (values:valueType) => {
    console.log(values, "values");
  };
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      FullName: "Jaseel",
      ContactNumber: "9746697961",
      Bio: "Ceo of ChefHut",
      Country: "India",
      State: "Kerala",
      PostalCode:"167898"
      
      
      
    })
  },[])
  return (
    <>
      <div className="main--container">
        <div className="heading--container">
          <h2 className="content--heading">Edit profile</h2>
        </div>
        <div className="edit--profile--container">
          <Form
            form={form}
            className="antd--form--edit--profile"
            onFinish={onFinish}
            autoComplete="off"
          >
            <div className="edit--profile--left--container">
              <h3 className="content--heading">Personal Information</h3>
              <label>Full name<span className="required">*</span></label>
              <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your Full Name!',
                },
                {
                  pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                  message: 'Full Name should contain at least 3 alphabets and spaces are allowed',
                },
                ]}
                name="FullName">
                <Input type="text" placeholder="Full Name" size="large" />
              </Form.Item>
              <label>Contact Number<span className="required">*</span></label>
              <Form.Item
                
              rules={[
                {
                  required: true,
                  message: 'Please input your Contact Number!',
                },
                {
                  pattern: /^[0-9]{10}$/,
                  message: 'Contact Number should be 10 digits',
                },
                ]}
                name="ContactNumber">
                <Input
                  maxLength={10}
                
                  type="text" placeholder="Contact Number" size="large" />
              </Form.Item>
              <label>Bio</label>
              <Form.Item name="Bio">
                <Input.TextArea
                  allowClear
                  maxLength={50}
                  placeholder="Bio"
                  showCount
                  size="large"
                />
              </Form.Item>
            </div>
            <div className="edit--profile--right--container">
              <h3 className="content--heading">Address</h3>
              <label>Country<span className="required">*</span></label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: 'Please input your Country!',
                  },
                  {
                    pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                    message: 'Country should contain at least 3 alphabets and spaces are allowed',
                  },
                ]}
                name="Country">
                <Input type="text" placeholder="Country" size="large" />
              </Form.Item>
              <label>State<span className="required">*</span></label>
              <Form.Item
              rules={[
                {
                  required: true,
                  message: 'Please input your State!',
                },
                {
                  pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                  message: 'State should contain at least 3 alphabets and spaces are allowed',
                },
              ]}  name="State">
                <Input type="text" placeholder="State" size="large" />
              </Form.Item>
              <label>Postal Code<span className="required">*</span></label>
              <Form.Item
                name="PostalCode"
                rules={[
                  {
                    required: true,
                    message: "Please input your Postal Code!",
                  },
                  {
                    pattern: /^[0-9]{6}$/,
                    message: "Postal Code should be 6 digits",
                  },
                ]}
              >
                <Input
                  maxLength={6}
                  placeholder="Postal Code"
                  showCount
                  size="large"
                />
              </Form.Item>
              <div className="edit-profile-submit-btn">
                <Button htmlType="submit">Submit</Button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
