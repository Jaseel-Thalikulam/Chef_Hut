import { ILoginProps } from "../interfaces/ILoginProps";
import { Button, Form, Input } from "antd";
import { useEffect, useState } from "react";

import OTPVerificationForm from "./OTPVerificationForm";
import Uploader from "./Uploader";
import { registerUser } from "../api/user";
import { IUserRegisterValues } from "../interfaces/IUserRegisterValues";
import { showErrorMessage } from "../helpers/helpers";


function Register({ setIsLogin }: ILoginProps) {

  const [isRegistered, setisRegistered] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [email, setEmail] = useState("");

  async function onFinish(values: IUserRegisterValues) {
    try {
      if (!avatarUrl || !values) return;
      await registerUser({ ...values, avatarUrl });
      setEmail(values.emailId)
      setisRegistered(true)
      
      return
    } catch (err:any) {

      showErrorMessage(err)
   }


    
    
  }

  useEffect(() => {
   
 },[isRegistered])

  return (
    <>
      <div className="heading content">
        <h1>{isRegistered ? "Enter OTP" : "Register Chef"}</h1>
      </div>

      <div className="form--wrap content">
        {isRegistered ? (
          <OTPVerificationForm email={email}/>
        ) : (
          <Form onFinish={onFinish} className="antd--form">
            <label>
              Name<span className="required">*</span>
            </label>
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Name is required",
                },
                {
                  pattern: /^(?:\s*[A-Za-z]\s*){3,}$/,
                  message: "Invalid name format.",
                },
              ]}
            >
              <Input placeholder="Full Name" size="large" />
            </Form.Item>
            <label>
              EmailID<span className="required">*</span>
            </label>
            <Form.Item
              name="emailId"
              rules={[
                {
                  required: true,
                  message: "Email is required.",
                  type: "email",
                },
                {
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format.",
                },
              ]}
            >
              <Input type="email" placeholder="Email" size="large" />
            </Form.Item>

            <label>
              Contact Number<span className="required">*</span>
            </label>
            <Form.Item
              name="contactNumber"
              rules={[
                {
                  required: true,
                  message: "Contact Number is required.",
                },
                {
                  pattern: new RegExp(/^[0-9\b]+$/),
                  message: "Kindly enter a valid contact number.",
                },
              ]}
            >
              <Input maxLength={10} placeholder="Contact Number" size="large" />
            </Form.Item>

              <Uploader setAvatarUrl={setAvatarUrl} showLabel={true} />

            <Button
              className="submit--btn"
              type="primary"
              htmlType="submit"
              size="large"
            
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
