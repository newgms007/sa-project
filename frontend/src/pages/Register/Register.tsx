import React, { useState, useEffect } from "react";
import { Input, Form, Select, message, InputNumber, Upload } from "antd";
import { Link } from "react-router-dom";
import { MembersInterface } from "../../interfaces/IMember";
import { GendersInterface } from "../../interfaces/IGender";
import { CreateMember, GetMembers, GetGenders } from "../../services/https";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const { Option } = Select;

function MemberCreate() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const [members, setMembers] = useState<MembersInterface[]>([]);


  const onFinish = async (values: MembersInterface) => {
    console.log(values);
    let res = await CreateMember(values);
    if (res.status) {
      swal("Register", "สมัครสมาชิกเสร็จสิ้น", "success");
      setTimeout(function () {
        navigate("/Home");
      }, 2000);
    } else {
      swal("Register", "สมัครสมาชิกไม่สำเร็จ", "error");
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

}




const Register = () => {

  const navigate = useNavigate();
  const [genders, setGenders] = useState<GendersInterface[]>([]);
  const onFinish = async (values: MembersInterface) => {
    console.log(values);
    let res = await CreateMember(values);
    if (res.status) {
      swal("Register", "สมัครสมาชิกเสร็จสิ้น", "success");
      setTimeout(function () {
        navigate("/Home");
      }, 2000);
    } else {
      swal("Register", "สมัครสมาชิกไม่สำเร็จ", "error");
    }
  };

  return (
    <Form onFinish={onFinish}>

      <section className="h-screen grid place-items-center bg-base-200">
        <form
          // method="POST"
          className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        >
          <h4 className="text-center text-3xl font-bold">Register</h4>
          <div className="mt-4">
            <Form.Item name="Username"
              label="Username"
              rules={[{ required: true, message: "กรุณากรอกยูสเซอร์ !" }]}>
              <Input placeholder="Username..." />
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item name="GenderID" label="เพศ" rules={[{ required: true, message: "กรุณาระบุเพศ !", }]}>
              <Select allowClear>
                {genders.map((item) => (
                  <Option value={item.ID} key={item.Name}>{item.Name}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item
              name="Email"
              label="Email"
              rules={[{ required: true, message: "กรุณากรอกอีเมลล์ !" }]}>
              <Input placeholder="Email..." />
            </Form.Item>
          </div>
          <div className="mt-4">
            <Form.Item
              name="Password"
              label="Password"
              rules={[{ required: true, message: "กรุณากรอกพาสเวิร์ด !" }]}>
              <Input placeholder="Password..." />
            </Form.Item>
          </div>

          <div className="mt-4">
            <button type="button" className="btn btn-secondary btn-block" onClick={clickMe}>
              Register
            </button>
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
        </form>
      </section>
    </Form>
  );
};

function clickMe() {
  swal("Register", "สมัครสมาชิกเสร็จสิ้น", "success");

}

export default Register;
