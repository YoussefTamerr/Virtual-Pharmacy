import { useEffect, useState } from "react";
import { Button, Radio, message, Card } from "antd";
import axios from "axios";
import DeliveryAddress from "./DeliveryAddress";

const CartView = () => {
  const [cartState, setCartState] = useState(null);
  const [methodState, setMethodState] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const paymentOptions = [
    {
      label: "Cash",
      value: "cod",
    },
    {
      label: "Credit Card",
      value: "cc",
    },
    {
      label: "Wallet",
      value: "wallet",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/cart`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCartState(data);
      }
    };
    setLoadingState(true);
    fetchData();
    setLoadingState(false);
  }, []);

  const handleIncrement = (index, currentCounter) => {
    const updatedCart = [...cartState];
    updatedCart[index].quantity += 1;
    fetch(`http://localhost:5000/cart`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        medicine_id: updatedCart[index].medicine_id._id,
        quantity: currentCounter + 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add medicine to cart");
        }
        setCartState(updatedCart);
        message.success("Successfully updated medicine");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to add medicine");
      });
  };

  const handleDecrement = (index, currentCounter) => {
    const updatedCart = [...cartState];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      fetch(`http://localhost:5000/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          medicine_id: updatedCart[index].medicine_id._id,
          quantity: currentCounter - 1,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add medicine to cart");
          }
          setCartState(updatedCart);
          message.success("Successfully updated medicine");
        })
        .catch((error) => {
          console.error(error);
          message.error("Failed to add medicine");
        });
    }
  };

  const handleRemove = (index) => {
    const updatedCart = [...cartState];
    fetch(`http://localhost:5000/cart/${updatedCart[index].medicine_id._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add medicine to cart");
        }
        updatedCart.splice(index, 1);
        setCartState(updatedCart);
        message.success("Successfully removed medicine");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to remove medicine");
      });
  };

  const handleCheckout = async () => {
    setLoadingState(true);
    try {
      if (methodState !== "cc") {
        const response = await fetch(`http://localhost:5000/order/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentMethod: methodState,
          }),
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setCartState(null);
          message.success("Order placed successfully");
        } else {
          message.error(data.message);
        }
      } else {
        const res = await axios.post(
          `http://localhost:5000/order/cc`,

          { paymentMethod: methodState },
          { withCredentials: true }
        );
        window.location = res.data.url;
        if (res.data.status === "success") {
          setCartState(null);
          message.success("Order placed successfully");
        }
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoadingState(false);
  };

  const handlePaymentMethod = (e) => {
    setMethodState(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "small",
      }}
    >
      {cartState?.map((medicine, index) => {
        return (
          <div key={medicine.medicine_id._id}>
            <Card
              headStyle={{
                border: "2px solid grey",
              }}
              bodyStyle={{
                border: "2px solid grey",
              }}
              style={{
                width: 300,
                marginTop: 16,
                gap: "small",
                display: "flex",
                flexDirection: "column",
              }}
              loading={loadingState}
              title={medicine.medicine_id.name}
            >
              <div>
                <strong>Price: {medicine.medicine_id.price + " $"}</strong>{" "}
                <br />
                <strong>Details: {medicine.medicine_id.details}</strong> <br />
                <strong>Quantity: {medicine.quantity} </strong> <br />
              </div>

              <br />
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  type="primary"
                  onClick={() => handleIncrement(index, medicine.quantity)}
                >
                  +
                </Button>
                <Button
                  type="primary"
                  onClick={() => handleDecrement(index, medicine.quantity)}
                >
                  -
                </Button>
                <Button
                  type="primary"
                  danger
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </Button>
              </div>
            </Card>
          </div>
        );
      })}
      <DeliveryAddress />
      <Radio.Group
        options={paymentOptions}
        onChange={handlePaymentMethod}
        value={methodState}
        optionType="button"
        buttonStyle="solid"
      />
      <Button
        disabled={methodState === ""}
        loading={loadingState}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
};
export default CartView;
