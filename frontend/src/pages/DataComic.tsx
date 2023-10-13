import React from 'react'
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import TabAdmin from '../components/TabAdmin';
import { NavLink } from "react-router-dom";
import { Space, Table, Tag , Button} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import swal from 'sweetalert';

function DeleteData(){
  swal ("Delete", "ลบข้อมูลสำเร็จ", "error")
}

interface DataType {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  price: number;
  image: string;
}
const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <Space direction="horizontal">
        <NavLink to="/AddProduct">
          <Button>Edit</Button>
          
        </NavLink>
        
        <Button type="primary" danger onClick={DeleteData} >Delete</Button>
        
      </Space>
    ),
  },
];

const data: DataType[] = [
  {
    id: "1",
    title: "spiderman",
    category: "action",
    description:
      "สไปเดอร์-แมน เป็นตัวการ์ตูนยอดมนุษย์สัญชาติอเมริกัน สร้างโดย สแตน ลี และ สตีฟ ดิตโก ของสังกัดมาร์เวลคอมิกส์ ปรากฏตัวเป็นครั้งแรกในอแมซซิงแฟนตาซี ฉบับที่ 15 ในปัจจุบันนี้ ",
    url: 'www.dfmkdkf.com',
    price: 100.2,
    image:'isjdhsis',
  },
  {
    id: "2",
    title: "batman",
    category: "action",
    description:
      "แบทแมน เป็นซูเปอร์ฮีโรปรากฏตัวในหนังสือการ์ตูนอเมริกันตีพิมพ์โดยดีซีคอมิกส์ ตัวละครสร้างโดยศิลปิน บ็อบ เคนและนักเขียน บิล ฟิงเกอร์ และปรากฏตัวครั้งแรกในหนังสือการ์ตูน",
    url: 'www.dsdsdsddd.com',
    price: 100.3,
    image:'asdrgthmjky',
  },
  
  
];
const DataComic: React.FC = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="flex justify-start w-100 bg-base-200">
        <div className='bg-base-200 w-100 h-screen'>
        <TabAdmin />
        </div>
        <div className="bg-base-200 w-100 items-center h-screen">
          <div className="text-center text-4xl pt-8 text-black">Comics</div>
          <div className="card w-11/12 bg-base-100 shadow-lg m-auto my-10">
            <div className="mx-3 mt-5">
              <Table columns={columns} dataSource={data} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataComic;
