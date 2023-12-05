import { useEffect, useState } from "react";
import axios from "axios";
import { WalletFilled } from "@ant-design/icons";

const Wallet = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:10000/currUser", {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data.currUser);
      }
    };
    try {
      fetch();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    user && (
      <div
        style={{ position: "fixed", top: "5%", right: "2%", fontSize: "20px" }}
      >
        <WalletFilled /> <span>${user?.wallet?.toFixed(0)}</span>
      </div>
    )
  );
};

export default Wallet;
