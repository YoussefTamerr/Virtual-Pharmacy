import { useState, useEffect } from "react";
import OrderView from "./OrderView";
import { Collapse } from "antd";
import Spinner from "./Spinner";
import moment from "moment";

function OrderList() {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/order`, {
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
          label: (
            <div>
              {"Order ID: " + order._id}
              <br />
              {"Date: " + moment(order.createdAt).format("YYYY-MM-DD")}
            </div>
          ),
          children: <OrderView key={order._id} order={order} />,
        }));

  return (
    <>
      {orders == null ? (
        <Spinner />
      ) : (
        <>
          <h1>Orders</h1>
          {orders.length === 0 && (
            <p style={{ fontSize: "20px" }}>No orders found</p>
          )}
          <Collapse
            items={items}
            style={{
              marginBottom: "30px",
              width: "35%",
              textAlign: "center",
            }}
          />
        </>
      )}
    </>
  );
}

export default OrderList;
