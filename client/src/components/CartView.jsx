//first use useefect to fetch cart
// add 3 buttons +, - , remove
//track quantity with a state
//send the quantity tot eh update cart with quantity-1
// update quantity state when quiantity changes
//update cart state when remove or quantity changes
//const [state, setState]
import MedicineView from "./MedicineView";
import { useEffect, useState } from "react";
const CartView = () => {
  const [cartState, setCartState] = useState(null);
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
  return (
    <div>
      {cartState?.map((medicine) => (
        <MedicineView
          key={medicine.medicine_id._id}
          medicine={medicine.medicine_id}
        />
      ))}
    </div>
  );
};
export default CartView;
