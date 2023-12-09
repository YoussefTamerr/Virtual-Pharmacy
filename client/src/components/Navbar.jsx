import { Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import {
  UserOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  KeyOutlined,
  ExperimentOutlined,
} from "@ant-design/icons";
import backIcon from "../../assets/icons/back.svg";
import "../../assets/styles/backButton.css"

const BackIcon = () => <img className="backButton" style={{
  width: "40px",
  height: "40px",
  cursor: "pointer",
}} onClick={
  () => window.history.back()
} src={backIcon} alt="back" />;

const Navbar = () => {
  const location = useLocation();

  let items;

  

  if (location.pathname.startsWith("/admin")) {
    items = [
      {
        label: <NavLink to="/admin/add">Add Admin</NavLink>,
        icon: <UserAddOutlined />,
        key: "add",
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
      {
        label: <NavLink to="/admin/medicines">View Medicines</NavLink>,
        icon: <MedicineBoxOutlined />,
        key: "medicines",
      },
    ];
  } else if (location.pathname.startsWith("/patient")) {
    items = [
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
      {
        label: <NavLink to="/patient/prescriptions">Prescriptions</NavLink>,
        icon: <ExperimentOutlined />,
        key: "prescriptions",
      },
      {
        label: <NavLink to="/patient/chat">Chat</NavLink>,
        icon: <ExperimentOutlined />,
        key: "chat",
      },
    ];
  } else if (location.pathname.startsWith("/pharmacist")) {
    items = [
      {
        label: <NavLink to="/pharmacist/add">Add Medicine</NavLink>,
        icon: <PlusCircleOutlined />,
        key: "add",
      },
      {
        label: <NavLink to="/pharmacist/medicines">Medicines</NavLink>,
        icon: <MedicineBoxOutlined />,
        key: "medicines",
      },
      {
        label: <NavLink to="/pharmacist/sales">Sales Report</NavLink>,
        icon: <SolutionOutlined />,
        key: "sales",
      },
      {
        label: <NavLink to="/pharmacist/chat">Chat</NavLink>,
        icon: <ExperimentOutlined />,
        key: "chat",
      },
    ];
  }

  items = items.concat([
    {
      label: (
        <NavLink to={location.pathname.split("/")[1] + "/change-password"}>
          Change Password
        </NavLink>
      ),
      icon: <KeyOutlined />,
      key: "reset",
    },
  ]);

  return (
    <div style={{
      minHeight: "100%",
      padding: "5px",
      backgroundColor: "#fafafa",
    }}>
      <BackIcon />
      <Menu
      mode="inline"
      style={{
        minHeight: "100%",
        padding: "5px",
        backgroundColor: "#fafafa",
      }}
      items={items}
      selectedKeys={["" + location.pathname.split("/")[2]]}
      forceSubMenuRender={true}
    />
  </div>
  );
};

export default Navbar;
