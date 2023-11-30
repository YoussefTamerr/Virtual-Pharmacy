import { useEffect, useState } from 'react';
import { List } from 'antd';
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
              count.push(medicine);
            }
          });
          setMeds(count);
        }
      }
      handleNotification();
    }, []);

  return (
    <>
      <h1>Notifications</h1>
      {meds ? (
        <List
          size="large"
          header={<h2>Out Of Stock Medicines</h2>}
          bordered
          dataSource={meds}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<h3>{item.name} is out of stock</h3>}
              />
            </List.Item>
          )}
          locale={ {emptyText: "No Out Of Stock Medicines"} }
          
        />
      ) : (
        <Spinner />
      )}
      
    </>
  );
};

export default Notification;
