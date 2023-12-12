import { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import Spinner from "./Spinner";
import { io } from "socket.io-client";

const Notification = () => {
  const [medicine, setMedicine] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.disconnect();
    }

    socketRef.current = io("http://localhost:8900");

    const handleOutOfStockNotification = (receivedMedicine) => {
      console.log(receivedMedicine);
      receivedMedicine.medicineNames.forEach((medicine) => {
        medicine.name += " is out of stock";
      });
      setMedicine(receivedMedicine);
    };

    socketRef.current.on(
      "outOfStockNotification",
      handleOutOfStockNotification
    );

    return () => {
      if (socketRef.current) {
        socketRef.current.off(
          "outOfStockNotification",
          handleOutOfStockNotification
        );
        socketRef.current.disconnect();
      }
    };
  }, [socketRef]);

  const columns = [
    {
      title: "Out Of Stock Medicines",
      dataIndex: "name",
      key: "name",
    },
  ];

  return (
    <>
      <h1
        style={{
          marginTop: "70px",
        }}
      >
        Notifications
      </h1>
      {medicine ? (
        <Table
          dataSource={medicine.medicineNames}
          columns={columns}
          style={{
            width: "50%",
            marginTop: "180px",
            marginBottom: "auto",
            marginLeft: "auto",
            marginRight: "auto",
            boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
            backgroundColor: "#f5f5f5",
          }}
        />
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Notification;
