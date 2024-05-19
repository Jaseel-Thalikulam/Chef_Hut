import { Button, Form, Input } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { ILoginProps } from "../interfaces/ILoginProps";
import { useState } from "react";

function Login({ setIsLogin }: ILoginProps) {
  const [isOtpSent, setOtpSend] = useState(false);
  const [seconds, setSeconds] = useState(60);
  async function onFinish(values: valueType) {
    console.log(values, "values");
  }

  const SendOTP = async (value: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (pattern.test(value)) {
      console.log(value);
      setOtpSend(true);
      let timer = 60;
      const intervalId = setInterval(() => {
        timer--;
        setSeconds(timer);
        if (timer === 0) {
          setOtpSend(false);
          clearInterval(intervalId);
        }
      }, 1000);
    }
  };
  return (
    <>
      <div className="heading">
        <h1>Welcome Chef</h1>
      </div>
      <div className="form--wrap">
        <Form onFinish={onFinish} className="antd--form">
          <Form.Item name="emailId">
            <label>
              EmailId<span className="required">*</span>
            </label>
            <Input.Search
              disabled={isOtpSent}
              enterButton={isOtpSent ? seconds + "s" : "Send OTP"}
              placeholder="Email"
              size="large"
              onSearch={(value) => SendOTP(value)}
            />
          </Form.Item>

          {/* <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^\d{6}$/),
                message: "Kindly enter valid OTP.",
   
              },
            ]}
          >
          <label>OTP<span className="required">*</span></label>

            <Input.OTP disabled={!isOtpSent} size="large" />
          </Form.Item> */}

          <Form.Item
            name="otp"
            rules={[
              {
                required: true,
                pattern: new RegExp(/^\d{6}$/),
                message: "Kindly enter valid OTP.",
              },
            ]}
          >
            <Input.OTP size="large" disabled={!isOtpSent} />
          </Form.Item>

          <Button
            className="submit--btn"
            type="primary"
            htmlType="submit"
            size="large"
            disabled={!isOtpSent}
          >
            Submit
          </Button>
          <p>
            Don't have an account?{" "}
            <span onClick={() => setIsLogin(false)}>Register</span>
          </p>
        </Form>
      </div>
    </>
  );
}

export default Login;
