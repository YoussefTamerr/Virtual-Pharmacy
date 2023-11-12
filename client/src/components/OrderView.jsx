import { useState } from "react";
import { Button, Collapse } from 'antd';


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
  }

  return (
    <div>
      <Collapse
        flex-gap="small"
        style={{ width: '30%' }}
        size="large"
        items={[{ key: order._id, label: 'OrderID: '+order._id, 
        children: 
        <strong>
          {order.items.map((item) => (
            <strong>
              {item.medicine_id.name}, Quantity: {item.quantity}, Price: {item.medicine_id.price + ' $'} <br />
            </strong>
          ))}
          Status: {status} <br />
          Total Price: {order.total_price + ' USD'} <br />
          Address: {order.address.street_address+", "+order.address.city+", "+order.address.governate} <br />
          Payment method: {paymentMethodText} <br />
          {order.status === 'Confirmed'  && <Button type="primary" danger onClick={handleCancel}>Cancel Order</Button>}
        </strong> }]}
      />    
    </div>
  );
}

export default OrderView;
