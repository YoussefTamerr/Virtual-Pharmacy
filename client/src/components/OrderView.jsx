import { useState } from "react";
import { Button, message, Card } from "antd";

function OrderView({ order }) {
  const [status, setStatus] = useState(order.status);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const response = await fetch(`http://localhost:5000/order/${order._id}`, {
      method: "PATCH",
      credentials: "include",
    });
    const data = await response.json();
    if (response.ok) {
      setStatus("Cancelled");
      message.success("Order cancelled successfully");
    } else {
      message.error(data);
    }
    setIsLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      alignItems: 'flex-start'
    }}>
      <div style={{
        border: "1px solid grey",
        borderRadius: "10px",
        height: '140px',
        width: '100%',
        overflow: 'auto',
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '10px',
        padding: '10px',
      }}>
        {order.items.map((item) => (
          <Card 
            key={item._id}
            style={{
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
              width: '40%',
            }}
          >
            <div>
              <strong>{item.medicine_id.name}</strong>
            </div>
            <div>
              <strong>Quantity:</strong> {item.quantity}
            </div>
            <div>
              <strong>Price:</strong> ${item.medicine_id.price}
            </div>
          </Card>
        ))}
      </div>
      <div>
        <strong>Status:</strong> {status}
      </div>
      <div>
        <strong>Total Price:</strong> ${order.total_price}
      </div>
      <div>
        <strong>Address:</strong> {order.address.street_address + ", " + order.address.city + ", " + order.address.governate}
      </div>
      <div>
        <strong>Payment method:</strong> {paymentMethodText}
      </div>
      <div style={{ alignSelf: 'center' }}>
        {status === "Confirmed" && (
          <Button
            type="primary"
            danger
            onClick={handleCancel}
            loading={isLoading}
          >
            Cancel Order
          </Button>
        )}
      </div>
    </div>

  );
}

export default OrderView;
