import { ILoginProps } from "../interfaces/ILoginProps";
import { Button, Form, Input, Tooltip } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { useEffect, useState } from "react";
import OTPVerificationForm from "./OTPVerificationForm";
import gsap from "gsap";

function Register({ setIsLogin }: ILoginProps) {
  async function onFinish(values: valueType) {
    console.log(values, "values");
    setIsVerifing(false)
    setisRegistered(true)
  }
  const [isVerifying, setIsVerifing] = useState(false);
const [isRegistered,setisRegistered]=useState(false)
 

  useEffect(() => {
    

  }, [isRegistered]);

  return (
    <>
      
      <div className="header content">
        <h1>{isRegistered?"Enter OTP":"Register Chef"}</h1>
      </div>

      <div className="form--wrap content">

        
       {isRegistered?  <OTPVerificationForm/>: <Form onFinish={onFinish} className="antd--form">
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
            <Input
              className="custom-search"
              type="email"
              placeholder="Email"
              size="large"
            />
          </Form.Item>
         

          <Tooltip title="Password must have a minimum length of 8, should contain at least one special character, one uppercase letter, and one lowercase letter." placement="bottom">
          <Form.Item
            name="password"
            rules={[
              {
                required: false,
                message: "Kindly enter secure password.",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />

          </Form.Item>
          </Tooltip>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: false,
                message: "Kindly confirm password.",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              },
            ]}
          >
            <Input placeholder="Confirm Password" size="large" />
          </Form.Item>

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
}
        {/* <OTPVerificationForm/> */}

      </div>
    </>
  );
}

export default Register;
