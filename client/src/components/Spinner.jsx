import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

const Spinner = () => (
  <Spin
    indicator={
      <LoadingOutlined
        style={{ fontSize: 24, position: "fixed", top: "50%" }}
        spin
      />
    }
  />
);

export default Spinner;
