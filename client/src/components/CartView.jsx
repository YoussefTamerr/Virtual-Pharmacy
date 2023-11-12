//first use useefect to fetch cart
// add 3 buttons +, - , remove
//track quantity with a state
//send the quantity tot eh update cart with quantity-1
// update quantity state when quiantity changes
//update cart state when remove or quantity changes
//const [state, setState]
import MedicineView from "./MedicineView";
import { useEffect, useState } from "react";
import { Button, Radio, message } from "antd";
const CartView = () => {

  const [cartState, setCartState] = useState(null);
  const [methodState, setMethodState] = useState("");
  const [loadingState, setLoadingState] = useState(false);

  const paymentOptions = [
    {
      label: 'Cash',
      value: 'cod',
    },
    {
      label: 'Credit Card',
      value: 'cc',
    },
    {
      label: 'Wallet',
      value: 'wallet',
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
    fetchData();
  }, []);

  const handleCheckout = async () => {
    setLoadingState(true);
    try {
        if(methodState !== "cc") {
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
            console.log(data);
            message.success("Order placed successfully");
          }
          else {
            message.error(data.message);
          }
        }
        else{
          await fetch(`http://localhost:5000/order/cc`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethod: methodState,
            }),
            credentials: "include",
          })
          .then(res => {
            if (res.ok) return res.json()
            return res.json().then(json => Promise.reject(json))
          })
          .then(({ url }) => {
            window.location = url
          })
          .catch(e => {
            console.error(e.message)
          })
      }
    } catch (error) {
      console.error(error.message);
    }
    setLoadingState(false);
  };

  const handlePaymentMethod = (e) => {
    console.log(e.target.value);
    setMethodState(e.target.value);
  }


  return (
    <div>
      {cartState?.map((medicine) => (
        <MedicineView
          key={medicine.medicine_id._id}
          medicine={medicine.medicine_id}
        />
      ))}
       <Radio.Group
        options={paymentOptions}
        onChange={handlePaymentMethod}
        value={methodState}
        optionType="button"
        buttonStyle="solid"
      />
      <Button disabled={methodState === ""} loading={loadingState} onClick={handleCheckout}>Checkout</Button>
    </div>
  );
};
export default CartView;
