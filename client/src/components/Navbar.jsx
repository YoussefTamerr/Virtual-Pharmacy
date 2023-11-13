import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  PlusCircleOutlined,
  UserAddOutlined,
  MedicineBoxOutlined,
  SolutionOutlined,
  LogoutOutlined,
  KeyOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch("http://localhost:5000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      navigate("/login");
    }
  };

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
        label: <NavLink to="/patient/cart">Cart</NavLink>,
        icon: <ShoppingCartOutlined />,
        key: "cart",
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
    {
      label: <NavLink onClick={handleLogout}>Logout</NavLink>,
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
      defaultSelectedKeys={["" + location.pathname.split("/")[2]]}
    />
  );
};

export default Navbar;
