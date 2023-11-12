
import { useState, useEffect } from 'react';
import OrderView from './OrderView';

function OrderList() {

  const [orders, setOrders] = useState([]);

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

  return (
    <div>
      <h2>Orders</h2>
      {orders.map((order) => (
        <OrderView key={order._id} order={order} />
      ))}
    </div>
  );
}

export default OrderList;