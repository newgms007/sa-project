import React, { useState, useEffect } from "react";
import { Input, Form, Select, message, Button } from "antd";
import { Link } from "react-router-dom";
import { MembersInterface } from "../../interfaces/IMember";
import { GendersInterface } from "../../interfaces/IGender";
import { CreateMember, GetGenders } from "../../services/https";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const { Option } = Select;

const arrayBufferToHex = (arrayBuffer: any) => {
  const view = new DataView(arrayBuffer);
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

const Register = () => {

  const navigate = useNavigate();
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();


  const onFinish = async (values: MembersInterface) => {
    const concatenatedString = `${values.Username}${values.Password}`;
    const hashedPassword = await sha256(concatenatedString);
    values.HashedPassword = hashedPassword;

    let res = await CreateMember(values);

    if (res.status) {
      swal("Register", "สมัครสมาชิกเสร็จสิ้น", "success");
      setTimeout(function () {
        navigate("/Login");
      }, 2000);

    } else {
      swal("Register", "สมัครสมาชิกไม่สำเร็จ", "error");
      console.log(res);
    }
  };

  const getGendet = async () => {
    let res = await GetGenders();
    if (res) {
      setGenders(res);
    }
  };

  useEffect(() => {
    getGendet();
  }, []);

  return (
    <div>
      {contextHolder}
          <section className="h-screen grid place-items-center bg-base-200">
            <Form  onFinish={onFinish}
              // method="POST"
              className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
            >
              <h4 className="text-center text-3xl font-bold">Register</h4>
              <div className="mt-4">
                <Form.Item
                  // label="Username"
                  name="Username"
                  rules={[{ required: true, message: "กรุณากรอกยูสเซอร์ !" }]}>
                  <Input placeholder="Username..." />
                </Form.Item>
              </div>
              <div className="mt-4">
                <Form.Item name="GenderID" rules={[{ required: true, message: "กรุณาระบุเพศ !", }]}>
                  <Select allowClear>
                    {genders.map((item) => (
                      <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
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
                  rules={[{ required: true, message: "กรุณากรอกพาสเวิร์ด !" }]}>
                  <Input placeholder="Password..." />
                </Form.Item>
              </div>

              <div className="mt-4">
                <Button type="primary" htmlType="submit" className="btn btn-secondary btn-block" >
                  Register
                </Button>
              </div>
              <p className="text-center">
                Already a member?
                <Link
                  to="/login"
                  className="ml-2 link link-hover link-secondary capitalize"
                >
                  login
                </Link>
              </p>
            </Form>
          </section>
    </div>
  );
};


export default Register;
