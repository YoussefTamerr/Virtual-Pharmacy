import { useEffect, useState } from "react";
import axios from "axios";
import { WalletFilled } from "@ant-design/icons";

const Wallet = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:10000/auth/me", {
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
      <div style={{ fontSize: "20px", color: "white" }}>
        <WalletFilled /> <span>${user?.wallet?.toFixed(0)}</span>
      </div>
    )
  );
};

export default Wallet;
