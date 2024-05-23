import { Button, Form, Input } from "antd";
import "../styles/editProfile.css";
import { useEffect, useState } from "react";
import { getProfileData, updateProfile } from "../api/user";
import { IUser } from "../interfaces/IUser";
import { showErrorMessage, showSuccessMessage } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const navigate = useNavigate()
  const onFinish =async (values: IUser) => {
   
    try {
      
      const res = await updateProfile(values)
      showSuccessMessage(res)
      navigate('/profile')
    } catch (err) {
      showErrorMessage(err)
    }
  };
  const [form] = Form.useForm();
  const [user, setUser] = useState<Partial<IUser>>({});
  useEffect(() => {
    (async function getData() {
      const res = await getProfileData();
      setUser(res?.data.user);
    })();
  }, [form]);

  useEffect(() => {
    form.setFieldsValue({
      name: user?.name,
      contactNumber: user?.contactNumber,
      bio: user?.bio,
      country: user?.address?.country,
      state: user?.address?.state,
      postalCode: user?.address?.postalCode,
    });
  }, [user]);
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
             
              <label>
                Full name<span className="required">*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Full Name!",
                  },
                  {
                    pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                    message:
                      "Full Name should contain at least 3 alphabets and spaces are allowed",
                  },
                ]}
                name="name"
              >
                <Input type="text" placeholder="Full Name" size="large" />
              </Form.Item>
              <label>
                Contact Number<span className="required">*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Contact Number!",
                  },
                  {
                    pattern: /^[0-9]{10}$/,
                    message: "Contact Number should be 10 digits",
                  },
                ]}
                name="contactNumber"
              >
                <Input
                  maxLength={10}
                  type="text"
                  placeholder="Contact Number"
                  size="large"
                />
              </Form.Item>
              <label>Bio</label>
              <Form.Item name="bio">
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
              <label>
                Country<span className="required">*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your Country!",
                  },
                  {
                    pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                    message:
                      "Country should contain at least 3 alphabets and spaces are allowed",
                  },
                ]}
                name="country"
              >
                <Input type="text" placeholder="Country" size="large" />
              </Form.Item>
              <label>
                State<span className="required">*</span>
              </label>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input your State!",
                  },
                  {
                    pattern: /^(?=(.*[A-Za-z]){3,})[A-Za-z\s]*$/,
                    message:
                      "State should contain at least 3 alphabets and spaces are allowed",
                  },
                ]}
                name="state"
              >
                <Input type="text" placeholder="State" size="large" />
              </Form.Item>
              <label>
                Postal Code<span className="required">*</span>
              </label>
              <Form.Item
                name="postalCode"
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
