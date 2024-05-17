import { Button, Form, Input } from "antd";

function OTPVerificationForm() {
    async function onFinish() {
        
    }
  return (
      <>
          < Form onFinish={onFinish} className="antd--form">
              
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
            <Input.OTP
              className="custom-search"
              size="large"
              
            />
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
  )
}

export default OTPVerificationForm
