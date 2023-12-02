import { useEffect, useState } from "react";
import { Button, Radio, message, Card } from "antd";
import axios from "axios";
import DeliveryAddress from "./DeliveryAddress";
import Spinner from "./Spinner";

const CartView = () => {
  const [cartState, setCartState] = useState(null);
  const [methodState, setMethodState] = useState("");
  const [loadingState, setLoadingState] = useState(false);
  const numberOfColumns =
    cartState && cartState.length <= 1 ? "1fr" : "repeat(2, 1fr)";

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
      try {
        setLoadingState(true);
        const response = await fetch(`http://localhost:10000/cart`, {
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setCartState(data);
        } else {
          setCartState([]);
        }
      } catch (error) {
        console.error(error);
        setCartState([]);
      } finally {
        setLoadingState(false);
      }
    };
    fetchData();
  }, []);

  const handleIncrement = (index, currentCounter) => {
    const updatedCart = [...cartState];
    updatedCart[index].quantity += 1;
    fetch(`http://localhost:10000/cart`, {
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
      fetch(`http://localhost:10000/cart`, {
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
    setLoadingState(true);
    fetch(`http://localhost:10000/cart/${updatedCart[index].medicine_id._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to remove medicine to cart");
        }
        updatedCart.splice(index, 1);
        setCartState(updatedCart);
        message.success("Successfully removed medicine");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to remove medicine");
      })
      .finally(() => {
        setLoadingState(false);
      });
  };

  const handleCheckout = async () => {
    setLoadingState(true);
    try {
      if (methodState !== "cc") {
        const response = await fetch(`http://localhost:10000/order/`, {
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
          setCartState([]);
          message.success("Order placed successfully");
        } else {
          message.error(data.message);
        }
      } else {
        const res = await axios.post(
          `http://localhost:10000/order/cc`,

          { paymentMethod: methodState },
          { withCredentials: true }
        );
        window.location = res.data.url;
        if (res.data.status === "success") {
          setCartState([]);
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
    <>
      {cartState == null ? (
        <Spinner />
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "small",
            }}
          >
            <h1>Cart</h1>
            <DeliveryAddress />
          </div>
          {cartState?.length === 0 && (
            <p style={{ fontSize: "20px" }}>Cart is empty</p>
          )}
          {cartState?.length !== 0 && (
            <div
              style={{
                border: "1px solid grey",
                borderRadius: "10px",
                height: "300px",
                minWidth: "300px",
                overflow: "auto",
                display: "grid",
                gridTemplateColumns: numberOfColumns,
                gap: "10px",
                padding: "10px",
              }}
            >
              {cartState?.map((medicine, index) => {
                return (
                  <div key={medicine.medicine_id._id}>
                    <Card
                      style={{
                        width: 300,
                        marginTop: 16,
                        gap: "small",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                      }}
                      loading={loadingState}
                      title={medicine.medicine_id.name}
                    >
                      <div>
                        <strong>Price: ${medicine.medicine_id.price}</strong>{" "}
                        <br />
                        <strong>
                          Details: {medicine.medicine_id.details}
                        </strong>{" "}
                        <br />
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
                          onClick={() =>
                            handleIncrement(index, medicine.quantity)
                          }
                        >
                          +
                        </Button>
                        <Button
                          type="primary"
                          onClick={() =>
                            handleDecrement(index, medicine.quantity)
                          }
                        >
                          -
                        </Button>
                        <Button
                          type="primary"
                          loading={loadingState}
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
            </div>
          )}
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
        </>
      )}
    </>
  );
};
export default CartView;
