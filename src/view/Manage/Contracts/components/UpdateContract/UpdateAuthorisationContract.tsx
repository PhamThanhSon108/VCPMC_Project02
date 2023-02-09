import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import { unwrapResult } from "@reduxjs/toolkit";
import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Spin,
  Typography,
  UploadProps,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContract } from "../../../../../modules/contract/contractStore";
import { updateContract } from "../../../../../modules/contract/repository";
import { images } from "../../../../../shared/assets/images";
import IconUpload from "../../../../../shared/assets/images/icons/IconUpload";
import { publicToast } from "../../../../../shared/components/Toast";
import { useAppDispatch, useAppSelector } from "../../../../../shared/hooks";
const dayjs = require("dayjs");

const dateFormat = "YYYY-MM-DD";
const formatContract = (contract: any) => {
  let currentContract = { ...contract, ...contract.authorisedPerson };
  let newContract: any = {};
  delete currentContract.authorisedPerson;
  for (let key in currentContract) {
    if (
      key === "birthday" ||
      key === "expirationDate" ||
      key === "effectiveDate" ||
      key === "issueDate"
    ) {
      newContract[key] = moment(currentContract[key].seconds * 1000);
    } else {
      newContract[key] = currentContract[key];
    }
  }
  return newContract;
};
export interface authorisationContract {
  id: string;
  contractNumber: string;
  contractName: string;
  effectiveDate: string;
  expirationDate: string;
  file: File;
  proprietaryRight: string[];
  authorisedPerson: {
    name: string;
    gender: string;
    unit: "personnal" | "organization";
    birthday: string;
    phone: string;
    citizenship: string;
    identificationNumber: string;
    issueDate: string;
    placeOfIssue: string;
    taxCode: string;
    residence: string;
    email: string;
    numberedAccount: string;
    password: string;
  };
}

export default function UpdateAuthorisationContract() {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const contract: authorisationContract | any = useAppSelector(
    (state) => state.contract.contract
  );
  const loading = useAppSelector(
    (state) => state.contract.loadingFetchContract
  );

  const fetchContractAsyn = async () => {
    try {
      const contract = await dispatch(fetchContract({ id }));
      unwrapResult(contract);
      form.setFieldsValue(contract);
    } catch (error) {}
  };
  const [file, setFile] = useState<File | null | any>(null);
  const handleSubmitForm = (data: any) => {
    if (id) {
      updateContract({
        id: id,
        contract: Object.assign(data, { file: file }),
        type: "authorisation",
      }).then(() => {
        publicToast({ type: "success", message: "Cập nhật thành công" });
        fetchContractAsyn();
      });
    }
  };

  const fetchContractDetail = async () => {
    try {
      const contractAction = await dispatch(fetchContract({ id }));
      const contract = unwrapResult(contractAction);
      form.setFieldsValue(formatContract(contract));
    } catch (error: any) {
      publicToast({ type: "error", message: error?.message });
    }
  };
  useEffect(() => {
    if (id && id !== contract?.id) {
      fetchContractDetail();
    } else {
      form.setFieldsValue(formatContract(contract));
    }
  }, [id]);

  return (
    <>
      {loading ? <Spin /> : null}
      <div
        className="page create-contract"
        style={{ marginRight: "35px", paddingRight: "35px" }}
      >
        <Row className="page__title">
          <Typography.Title>Thêm hợp đồng ủy quyền mới</Typography.Title>
        </Row>

        <Form
          name="createAuthorisationContract"
          layout="horizontal"
          requiredMark={false}
          form={form}
          id="createAuthorisationContract"
          onFinish={handleSubmitForm}
        >
          <Row className="page__body playlist-add">
            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item
                label={
                  <>
                    <span>Số hợp đồng:</span> <span className="red">*</span>
                  </>
                }
                name="contractNumber"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Tên hợp đồng:</span> <span className="red">*</span>
                  </>
                }
                name="contractName"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Ngày hiệu lực:</span> <span className="red">*</span>
                  </>
                }
                name="effectiveDate"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <DatePicker format={dateFormat} />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Ngày hết hạn</span> <span className="red">*</span>
                  </>
                }
                name="expirationDate"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>

            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item
                label={
                  <>
                    <span>Đính kèm tệp</span>
                  </>
                }
                rules={[]}
              >
                <label className="upload" htmlFor="upload-doc">
                  <span>{images.icon.upload}</span>
                  <span>Tải tệp</span>
                </label>

                <input
                  id="upload-doc"
                  type={"file"}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      setFile(e.target.files[0]);
                    }
                  }}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    display: contract?.fileURL && !file ? "none" : "",
                  }}
                />

                {!file && contract?.fileId ? (
                  <a href={contract?.fileURL} target="_blank" download="docx">
                    {contract?.contractName}.doc
                  </a>
                ) : null}
              </Form.Item>
            </Col>

            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item name="" rules={[]}>
                <div className="infor-contract-authorisation">
                  <div className="orange bold">
                    <span>Mức nhuận bút</span>
                  </div>
                  <div>
                    <span className="bold">Quyền tác giả</span>
                    <span>0%</span>
                  </div>
                  <div>
                    <span className="bold">Mức nhuận bút</span>
                  </div>
                  <div>
                    <span>Quyền của người biểu diễn</span>
                    <span>50%</span>
                  </div>
                  <div>
                    <span>Quyền của nhà sản xuất</span>
                    <span>50%</span>
                  </div>
                  <div>
                    <span>(bản ghi/video)</span>
                  </div>
                </div>
              </Form.Item>
            </Col>

            <Divider />
          </Row>

          <Row className="page__title">
            <Typography.Title>Thông tin pháp nhân ủy quyền</Typography.Title>
          </Row>
          <Row className="page__body playlist-add">
            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item
                label={
                  <>
                    <span>Pháp nhân ủy quyền</span>
                  </>
                }
                name="unit"
                rules={[]}
              >
                <Radio.Group defaultValue={1}>
                  <Radio value={1} className="white-font-color">
                    Cá nhân
                  </Radio>
                  <Radio className="white-font-color" value={2}>
                    Tổ chức
                  </Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Tên người ủy quyền</span>{" "}
                    <span className="red">*</span>
                  </>
                }
                name="name"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Ngày sinh</span> <span className="red">*</span>
                  </>
                }
                name="birthday"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <DatePicker className="sort" />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Giới tính</span> <span className="red">*</span>
                  </>
                }
                name="gender"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <Radio.Group defaultValue={"male"}>
                  <Radio className="white-font-color" value={"male"}>
                    Nam
                  </Radio>
                  <Radio className="white-font-color" value={"female"}>
                    Nữ
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Quốc tịch:</span> <span className="red">*</span>
                  </>
                }
                name="citizenship"
                rules={[{ required: true, message: "Tình trạng là bắt buộc" }]}
              >
                <Select
                  options={[
                    {
                      value: "vn",

                      label: "Việt Nam",
                    },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Số điện thoại</span> <span className="red">*</span>
                  </>
                }
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>

            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item
                label={
                  <>
                    <span>CMND/CCCD</span> <span className="red">*</span>
                  </>
                }
                name="identificationNumber"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} className="sort" />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Ngày cấp</span> <span className="red">*</span>
                  </>
                }
                name="issueDate"
                rules={[
                  {
                    required: true,
                    message: "Trường này bao gồm thông tin bắt buộc",
                  },
                ]}
              >
                <DatePicker className="sort" />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Nơi cấp</span> <span className="red">*</span>
                  </>
                }
                name="placeOfIssue"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Mã số thuế</span>
                  </>
                }
                name="taxCode"
                rules={[]}
              >
                <Input maxLength={100} />
              </Form.Item>

              <Form.Item
                label={
                  <>
                    <span>Nơi cứ trú</span>
                  </>
                }
                name="residence"
                rules={[]}
              >
                <TextArea autoSize={{ minRows: 4, maxRows: 8 }} />
              </Form.Item>
            </Col>

            <Col span={8} style={{ paddingRight: "25px" }}>
              <Form.Item
                label={
                  <>
                    <span>Email</span> <span className="red">*</span>
                  </>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                validateTrigger={["onSubmit", "onBlur"]}
                label={
                  <>
                    <span>Mật khẩu</span> <span className="red">*</span>
                  </>
                }
                name="password"
                rules={[
                  { required: true, message: "Bạn chưa nhập mật khẩu" },
                  {
                    min: 6,
                    message: "Mật khẩu có độ dài tối thiểu là 6 ký tự",
                  },
                ]}
              >
                <Input.Password
                  placeholder="Nhập mật khẩu"
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Tên đăng nhập:</span> <span className="red">*</span>
                  </>
                }
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Thông tin trường này là bắt buộc",
                  },
                ]}
              >
                <Input maxLength={100} disabled />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Số tài khoản</span>
                  </>
                }
                name="numberedAccount"
                rules={[]}
              >
                <Input maxLength={100} />
              </Form.Item>
              <Form.Item
                label={
                  <>
                    <span>Ngân hàng</span>
                  </>
                }
                name="bank"
                rules={[]}
              >
                <Input maxLength={100} />
              </Form.Item>
            </Col>
            <div className="note">
              <span>*</span>
              <span>Là những trường thông tin bắt buộc</span>
            </div>
            <Col span={24} className="page__body-table">
              <div
                className="btn-wrap"
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  width: "100%",
                  marginTop: "20px",
                }}
              >
                <Button className="cancel">Hủy bỏ</Button>
                <Button
                  loading={loading}
                  className="confirm"
                  htmlType="submit"
                  form="createAuthorisationContract"
                >
                  Tạo
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
}
