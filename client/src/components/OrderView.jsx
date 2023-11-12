import { useState } from "react";
import { Button } from "antd";

function OrderView({ order }) {
  const [status, setStatus] = useState(order.status);

  let paymentMethodText = "";
  if (order.paymentMethod === "cod") {
    paymentMethodText = "Cash";
  } else if (order.paymentMethod === "cc") {
    paymentMethodText = "Credit Card";
  } else if (order.paymentMethod === "wallet") {
    paymentMethodText = "Wallet";
  } else {
    paymentMethodText = order.paymentMethod;
  }

  const handleCancel = async () => {
    const response = await fetch(`http://localhost:5000/order/${order._id}`, {
      method: "PATCH",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setStatus("Cancelled");
    }
  };

  return (
    <strong>
      Items:
      {order.items.map((item) => (
        <p key={item._id}>
          {item.medicine_id.name}, Quantity: {item.quantity}, Price:
          {item.medicine_id.price}
          {item.price}
        </p>
      ))}
      Status: {status} <br />
      Total Price: {order.total_price + " USD"} <br />
      Address:{" "}
      {order.address.street_address +
        ", " +
        order.address.city +
        ", " +
        order.address.governate}{" "}
      <br />
      Payment method: {paymentMethodText} <br />
      <br />
      {order.status === "Confirmed" && (
        <Button type="primary" danger onClick={handleCancel}>
          Cancel Order
        </Button>
      )}
    </strong>
  );
}

export default OrderView;
