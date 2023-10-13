import React from "react";
import { Input ,Form,Select} from "antd";
import swal from "sweetalert";
const { TextArea } = Input;
const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  console.log('Change:', e.target.value);
};

const AddComic: React.FC = () => {
  return (
    <>
      <div className="flex mt-3">
        <div className="ml-8 mr-5 ">Title :</div>
        <div className="contents">
          <div className="ml-12  w-80 ">
            <Input placeholder="Tile Comic...." />
          </div>
        </div>
      </div>

      <div className="flex mt-3">
        <div className="contents">
          <div className="mx-8  w-80 ">
            <Form>
              <Form.Item label="Select">
                <Select className="ml-14 ">
                  <Select.Option value="demo">Action</Select.Option>
                  <Select.Option value="demo">Magic</Select.Option>
                  <Select.Option value="demo">Harem</Select.Option>
                  <Select.Option value="demo">Harem</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>

      <div className="flex ">
        <div className="ml-8 ">Description :</div>
        <div className="contents">
          <div className="ml-4 mr-8 w-80">
            {" "}
            <TextArea
              style={{ height: 120, resize: "none" }}
              onChange={onChange}
              placeholder="Description Comic...."
            />
          </div>
        </div>
      </div>

      <div className="flex mt-3">
        <div className="ml-8 mr-5">URL :</div>
        <div className="contents">
          <div className="ml-12  w-80">
            <Input placeholder="Link Comic...." />
          </div>
        </div>
      </div>

      <div className="flex mt-3">
        <div className="ml-8 mr-3">Price :</div>
        <div className="contents">
          <div className="ml-12  w-70">
            <Input placeholder="Price Comic...." />
          </div>
        </div>
        <div className="flex-1 ml-3">Baht.</div>
      </div>

      <div className="flex mt-3">
        <div className="ml-8 mr-2">Image : </div>
        <div className="contents">
          <div className="ml-10  w-80">
            <input
              type="file"
              className="file-input file-input-bordered file-input-md w-full max-w-xs"
            />
          </div>
        </div>
      </div>

      <div className="card-actions ml-12 mt-3">
        <button
          className="btn  btn-outline btn-success  w-full max-w-xs"
          onClick={onPick}
        >
          Add Products
        </button>
      </div>
    </>
  );
};
const onPick = () => {
  swal("Thank you!", `คุณเพิ่มหนังสือการ์ตูนสำเร็จแล้ว.`, "success");
};
export default AddComic;
