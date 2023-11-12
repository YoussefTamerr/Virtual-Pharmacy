//first use useefect to fetch cart
// add 3 buttons +, - , remove
//track quantity with a state
//send the quantity tot eh update cart with quantity-1
// update quantity state when quiantity changes
//update cart state when remove or quantity changes
//const [state, setState]
import MedicineView from "./MedicineView";
import { useEffect, useState } from "react";
import { message } from "antd";
const CartView = () => {
  const [cartState, setCartState] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/cart`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setCartState(data);
      }
    };
    fetchData();
  }, []);

  const handleIncrement = (index, currentCounter) => {
    const updatedCart = [...cartState];
    updatedCart[index].quantity += 1;
    console.log(currentCounter + 1);
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
    fetch(`http://localhost:10000/cart/${updatedCart[index].medicine_id._id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
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

  return (
    <div>
      {cartState?.map((medicine, index) => {
        console.log(medicine);
        return (
          <div key={medicine.medicine_id._id}>
            <MedicineView medicine={medicine.medicine_id} />
            <div>
              Quantity: {medicine.quantity}
              <button onClick={() => handleIncrement(index, medicine.quantity)}>
                +
              </button>
              <button onClick={() => handleDecrement(index, medicine.quantity)}>
                -
              </button>
              <button onClick={() => handleRemove(index)}>Remove</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default CartView;