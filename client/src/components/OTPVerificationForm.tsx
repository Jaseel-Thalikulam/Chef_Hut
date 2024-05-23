import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { sendOTP, verifyOTP } from "../api/user";
import { showErrorMessage, showSuccessMessage } from "../helpers/helpers";
import { useEffect, useState } from "react";
import { setUserAuthenticated } from "../redux/userSlice";
import { useDispatch } from "react-redux";
function OTPVerificationForm({ email }: { email: string }) {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [seconds, setSeconds] = useState(60);

  async function onFinish(values: { otp: string }) {
    try {
      const res = await verifyOTP({ ...values, email });
      dispatch(setUserAuthenticated())
      showSuccessMessage(res);
      navigate("/profile");
    } catch (err) {
      showErrorMessage(err);
    }
  }


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
      <Form onFinish={onFinish} className="antd--form">
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
          <Input.OTP size="large" />
        </Form.Item>

        <Button
          className="submit--btn"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Verify OTP
        </Button>
        <Button
          disabled={seconds>0}
          className="submit--btn"
          type="primary"
          htmlType="button"
          size="large"
          onClick={() => { sendOTP({email,setSeconds}) }}
        >
          Re-send OTP  {seconds>0?'in '+seconds+'s':null}
        </Button>
      </Form>
    </>
  );
}

export default OTPVerificationForm;
