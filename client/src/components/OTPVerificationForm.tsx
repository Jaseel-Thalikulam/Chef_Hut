import { Button, Form, Input } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { useNavigate } from "react-router-dom";
function OTPVerificationForm() {
  const navigate = useNavigate();
  async function onFinish(values: valueType) {
    console.log(values);
     navigate('/profile')
  }
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
          <Input.OTP  size="large" />
        </Form.Item>

        <Button
          className="submit--btn"
          type="primary"
          htmlType="submit"
          size="large"
        >
          Verify Email
        </Button>
      </Form>
    </>
  );
}

export default OTPVerificationForm;
