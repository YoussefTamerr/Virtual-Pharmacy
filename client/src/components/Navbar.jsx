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
  ExperimentOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(0);

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
      {
        label: <NavLink to="/patient/prescriptions">Prescriptions</NavLink>,
        icon: <ExperimentOutlined />,
        key: "prescriptions",
      },
    ];
  } else if (location.pathname.startsWith("/pharmacist")) {
    useEffect(() => {
      async function handleNotification() {
        let count = 0;
        const response = await fetch("http://localhost:5000/medicine", {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json();
        if (response.ok) {
          data.forEach((medicine) => {
            if (medicine.availableQuantity === 0) {
              count++;
            }
          });
          setNotifications(count);
        }
      }
      handleNotification();
    }, []);
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
        label: <NavLink to="/pharmacist/notifications">Notifications: {notifications}</NavLink>,
        icon: <NotificationOutlined />,
        key: "notifications",
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
