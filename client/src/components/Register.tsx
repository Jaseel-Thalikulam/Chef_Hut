import { ILoginProps } from "../interfaces/ILoginProps";
import { Button, Form, Input } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { useEffect, useState } from "react";

import OTPVerificationForm from "./OTPVerificationForm";
import Uploader from "./Uploader";

function Register({ setIsLogin }: ILoginProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRegistered, setisRegistered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  async function onFinish(values: valueType) {
    console.log(values, "values");

    setIsVerifying(false);
    setisRegistered(true);
  }
  useEffect(() => {
    console.log(avatarUrl);
  }, [avatarUrl]);

  return (
    <>
      <div className="heading content">
        <h1>{isRegistered ? "Enter OTP" : "Register Chef"}</h1>
      </div>

      <div className="form--wrap content">
        {isRegistered ? (
          <OTPVerificationForm />
        ) : (
          <Form onFinish={onFinish} className="antd--form">
            <Form.Item
              name="name"
              rules={[
                {
                  required: false,
                  message: "Kindly enter valid name.",
                  type: "string",
                  pattern: /^(?:\s*[A-Za-z]\s*){3,}$/,
                },
              ]}
            >
              <label>
                Name<span className="required">*</span>
              </label>
              <Input placeholder="Full Name" size="large" />
            </Form.Item>
            <Form.Item
              name="emailId"
              rules={[
                {
                  required: false,
                  message: "Kindly enter valid emailId.",
                  type: "email",
                },
              ]}
            >
              <label>
                EmailID<span className="required">*</span>
              </label>
              <Input type="email" placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="contactNumber"
              rules={[
                {
                  required: false,
                  message: "Kindly enter valid contact number.",
                  pattern: new RegExp(/^[0-9\b]+$/),
                },
              ]}
            >
              <label>
                Contact Number<span className="required">*</span>
              </label>

              <Input placeholder="Contact Number" size="large" />
            </Form.Item>

            <Uploader setAvatarUrl={setAvatarUrl} />

            <Button
              className="submit--btn"
              type="primary"
              htmlType="submit"
              size="large"
              loading={isVerifying}
            >
              Send OTP
            </Button>
            <p>
              Already have an account?{" "}
              <span onClick={() => setIsLogin(true)}>Login</span>
            </p>
          </Form>
        )}
      </div>
    </>
  );
}

export default Register;
