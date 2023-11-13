import { useState, useEffect } from "react";
import OrderView from "./OrderView";
import { Collapse } from "antd";
import Spinner from "./Spinner";

function OrderList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/order`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    };
    fetchData();
  }, []);

  const items =
    orders == null
      ? []
      : orders.map((order) => ({
          key: order._id,
          label: "Order " + order._id,
          children: <OrderView key={order._id} order={order} />,
        }));

  return (
    <div>
      <h2>Orders</h2>
      {orders == null ? <Spinner /> : <Collapse items={items} />}
    </div>
  );
}

export default OrderList;
