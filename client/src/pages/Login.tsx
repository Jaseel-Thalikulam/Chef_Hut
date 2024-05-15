import { Button, Form, Input, Typography } from "antd";
import "../styles/Login.css";
import { valueType } from "antd/es/statistic/utils";

function Login() {
  async function onFinish(values: valueType) {
    console.log(values, "values");
  }
  return (
    <>
      <div className="container">
        <div className="left--container">
          <div className="img--container" />
        </div>
        <div className="right--container">
          <div className="right--content--container">
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
                  <Input placeholder="Password" size="large" />
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
                  Don't have an account? <span>Register Here</span>
                </p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
