import { Flex } from "antd";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Flex
      style={{ minHeight: "100vh" }}
      justify="center"
      align="center"
      vertical
    >
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
