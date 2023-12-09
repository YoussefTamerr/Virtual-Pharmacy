import { Menu } from "antd";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LogoutOutlined,
  ShoppingCartOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

const AppHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(0);

  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io("http://localhost:8900");

    const handleOutOfStockNotification = (receivedMedicine) => {
      setNotifications(receivedMedicine.medicineNames.length);
    };

    socketRef.current.on("outOfStockNotification", handleOutOfStockNotification);

    return () => {
      if (socketRef.current) {
        socketRef.current.off("outOfStockNotification", handleOutOfStockNotification);
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]); 

  // useEffect(() => {
  //   async function handleNotification() {
  //     let count = 0;
  //     const response = await fetch("http://localhost:10000/medicine", {
  //       method: "GET",
  //       credentials: "include",
  //     });
  //     const data = await response.json();
  //     if (response.ok) {
  //       data.forEach((medicine) => {
  //         if (medicine.availableQuantity === 0) {
  //           count++;
  //         }
  //       });
  //       setNotifications(count);
  //     }
  //   }
  //   if (location.pathname.startsWith("/pharmacist")) {
  //     handleNotification();
  //   }
  // }, [location.pathname]);

  const handleLogout = async () => {
    const response = await fetch("http://localhost:10000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      navigate("/login");
    }
  };

  let items;

  if (location.pathname.startsWith("/admin")) {
    items = [];
  } else if (location.pathname.startsWith("/patient")) {
    items = [
      {
        label: <NavLink to="/patient/cart">Cart</NavLink>,
        icon: <ShoppingCartOutlined />,
        key: "cart",
      },
    ];
  } else if (location.pathname.startsWith("/pharmacist")) {
    items = [
      {
        label: (
          <NavLink to="/pharmacist/notifications">
            Notifications: {notifications}
          </NavLink>
        ),
        icon: <NotificationOutlined />,
        key: "notifications",
      },
    ];
  }

  items = items.concat([
    {
      label: <NavLink onClick={handleLogout}>Logout</NavLink>,
      icon: <LogoutOutlined />,
      key: "logout",
    },
  ]);

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      style={{ border: "none" }}
      items={items}
      selectedKeys={["" + location.pathname.split("/")[2]]}
      forceSubMenuRender={true}
      disabledOverflow={true}
    />
  );
};

export default AppHeader;
