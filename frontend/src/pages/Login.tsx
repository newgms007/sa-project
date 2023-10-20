import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, message } from 'antd';
import { GetMemberByHash } from "../services/https";
import { MembersInterface } from "../interfaces/IMember";
import { useMember } from '../pages/context';
import swal from "sweetalert";

const arrayBufferToHex = (arrayBuffer: any) => {
  const view = new DataView(arrayBuffer); // Corrected line
  let hex = '';
  for (let i = 0; i < view.byteLength; i += 1) {
    const value = view.getUint8(i);
    hex += value.toString(16).padStart(2, '0');
  }
  return hex;
};

const sha256 = async (message: any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hashBuffer);
};

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useMember();

  const handleLogin = async (value: MembersInterface) => {
    const concatenatedString = `${value.Username}${value.Password}`;
    const hashedPassword = await sha256(concatenatedString);
    console.log(value)

    try {
      const member = await GetMemberByHash(hashedPassword);

      if (member) {
        login(member);
        message.success('Login successful');
        console.log(member)
        navigate('/Home');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinish = async (values: MembersInterface) => {
    setLoading(true);
    handleLogin(values);
    setLoading(false);
    console.log('Received values of form: ', values);
  };
  return (
    <section className="h-screen grid place-items-center bg-base-200">
      <Form
        // method="post"
        name="login-form"
        initialValues={{ remember: true }}
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        onFinish={onFinish}

      >
        <h4 className="text-center text-3xl font-bold">Login</h4>
        {/* Your form inputs should go here */}
        <div className="mt-4">
          <Form.Item
            // label="Email"
            name="Email"
            rules={[{ required: true, message: "กรุณากรอกอีเมลล์ !" }]}>
            <Input placeholder="Email..." />
          </Form.Item>
        </div>
        <div className="mt-4">
          <Form.Item
            // label="Password"
            name="Password"
            rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน !" }]}>
            <Input placeholder="Password..." />
          </Form.Item>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-block"
        >
          Login
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            to="/register"
            className="ml-2 link link-hover link-secondary capitalize"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
