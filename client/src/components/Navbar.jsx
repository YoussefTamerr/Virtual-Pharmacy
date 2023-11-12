import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  LogoutOutlined,
  KeyOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();

  let items;

  if (location.pathname.startsWith("/admin")) {
    items = [
      {
        label: <NavLink to="/admin/add">Add Admin</NavLink>,
        icon: <UserAddOutlined />,
        key: "home",
      },
      {
        label: <NavLink to="/admin/patients">View Patients</NavLink>,
        icon: <UserOutlined />,
        key: "patients",
      },
      {
        label: <NavLink to="/admin/pharmacists">View Pharmacists</NavLink>,
        icon: <UserOutlined />,
        key: "pharmacists",
      },
    ];
  } else if (location.pathname.startsWith("/patient")) {
    items = [
      {
        label: <NavLink to="/patient/home">Home</NavLink>,
        icon: <SolutionOutlined />,
        key: "home",
      },
      {
        label: <NavLink to="/patient/medicines">Medicines</NavLink>,
        icon: <MedicineBoxOutlined />,
        key: "medicines",
      },
      {
        label: <NavLink to="/patient/orders">Orders</NavLink>,
        icon: <SolutionOutlined />,
        key: "orders",
      },
    ];
  } else if (location.pathname.startsWith("/pharmacist")) {
    items = [
      {
        label: <NavLink to="/pharmacist/add">Home</NavLink>,
        icon: <PlusCircleOutlined />,
        key: "home",
      },
      {
        label: <NavLink to="/pharmacist/medicines">Medicines</NavLink>,
        icon: <MedicineBoxOutlined />,
        key: "medicines",
      },
    ];
  }

  items = items.concat([
    {
      label: <NavLink to="/password">Change Password</NavLink>,
      icon: <KeyOutlined />,
      key: "reset",
    },
    {
      label: <NavLink to="/logout">Logout</NavLink>,
      icon: <LogoutOutlined />,
      key: "logout",
    },
  ]);

  return (
    <Menu
      mode="inline"
      theme="dark"
      style={{ border: "none" }}
      items={items}
      defaultSelectedKeys={["home"]}
    />
  );
};

export default Navbar;
