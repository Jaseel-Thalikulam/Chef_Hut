import { Button, Form, Input } from "antd";
import { ILoginProps } from "../interfaces/ILoginProps";
import { useEffect, useState } from "react";
import {
  showErrorMessage,
  showSuccessMessage,
} from "../helpers/helpers";
import { sendOTP, verifyOTP } from "../api/user";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserAuthenticated } from "../redux/userSlice";

function Login({ setIsLogin }: ILoginProps) {
  const [email, setEmail] = useState('');
  const [seconds, setSeconds] = useState(0);
const navigate = useNavigate()
const dispatch = useDispatch()
  async function onFinish({ otp }: { otp: string }) {
    try {
      
      const res = await verifyOTP({ otp, email })
      dispatch(setUserAuthenticated())

      showSuccessMessage(res)
      navigate('/profile')
    } catch (err) {
      console.log(err)

      showErrorMessage(err)
    }
  }

  const onSendBtnClick = async (email: string) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (pattern.test(email)) {
      setEmail(email)
      sendOTP({ email, setSeconds });
    }
  };

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
      return () => clearTimeout(timerId);
    }
  }, [seconds]);

  return (
    <>
      <div className="heading">
        <h1>Welcome Chef</h1>
      </div>
      <div className="form--wrap">
        <Form onFinish={onFinish} className="antd--form">
          <label>
            EmailId<span className="required">*</span>
          </label>
          <Form.Item name="emailId">
            <Input.Search
              disabled={seconds>0}
              enterButton={seconds>0 ? seconds + "s" : "Send OTP"}
              placeholder="Email"
              size="large"
              onSearch={(value) => onSendBtnClick(value)}
            />
          </Form.Item>
          <label>
            OTP<span className="required">*</span>
          </label>
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
            <Input.OTP size="large" disabled={!(seconds>0)} />
          </Form.Item>

          <Button
            className="submit--btn"
            type="primary"
            htmlType="submit"
            size="large"
            disabled={!(seconds>0)}
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
