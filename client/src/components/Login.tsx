import { Button, Form, Input } from "antd";
import { valueType } from "antd/es/statistic/utils";
import { ILoginProps } from "../interfaces/ILoginProps";

function Login({setIsLogin}:ILoginProps) {

  async function onFinish(values: valueType) {
    console.log(values, "values");
  }
  return (
    <>
      <div className="header">
        <h1>Welcome Chef</h1>
      </div>
      <div className="form--wrap">
        <Form onFinish={onFinish} className="antd--form">
          <Form.Item
           
            name="emailId"
            rules={[
              {
                required: true,
                message: "Kindly enter valid emailId.",
                type: "email",
              },
            ]}
          >
            <Input placeholder="Email" size="large" />
          </Form.Item>
          <Form.Item
          
            name="password"
            rules={[
              {
                required: true,
                message: "Kindly enter secure password.",
                pattern:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              },
            ]}
          >
            <Input.Password placeholder="Password" size="large" />
          </Form.Item>

          <Button
            className="submit--btn"
            type="primary"
            htmlType="submit"
            size="large"
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
