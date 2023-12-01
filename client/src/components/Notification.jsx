import { useEffect, useState } from 'react';
import { List, Table } from 'antd';
import Spinner from './Spinner';

const Notification = () => {

    const [meds, setMeds] = useState(null);

    // useEffect(() => {
    //     const socket = io('http://localhost:5000', { transports: ['websocket'] });
      
    //     socket.on("outOfStockMedicines", (data) => {
    //       // setMeds(data && data.map(item => item.name));
    //       setMeds(data);
    //     });
      
    //     return () => {
    //       if (socket.readyState === 1) {
    //           socket.close();
    //       }
    //   }
    //   }, []);
    useEffect(() => {
      async function handleNotification() {
        let count = [];
        const response = await fetch("http://localhost:5000/medicine", {
          method: "GET",
          credentials: "include",
        })
        const data = await response.json();
        if (response.ok) {
          data.forEach((medicine) => {
            if (medicine.availableQuantity === 0) {
              medicine.name += " is out of stock";
              count.push(medicine);
            }
          });
          setMeds(count);
        }
      }
      handleNotification();
    }, []);

    const columns = [
      {
        title: 'Out Of Stock Medicines',
        dataIndex: 'name',
        key: 'name',
      },
    ]

  return (
    <>
      <h1 style={{
        marginTop: '70px',
      }}>Notifications</h1>
      {meds ? (
        <Table dataSource={meds} columns={columns} style={{
          width: '50%',
          marginTop: '180px',
          marginBottom: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
          backgroundColor: '#f5f5f5',
        }} />
      ) : (
        <Spinner />
      )}
      
    </>
  );
};

export default Notification;
