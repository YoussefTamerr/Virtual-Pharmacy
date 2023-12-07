import { useState, useEffect } from "react";
import { Select, Flex, Table, Input } from "antd";
import Spinner from "./Spinner";

const { Option } = Select;
const { Search } = Input;

function SalesReport() {
  const [medicines, setMedicines] = useState([]);
  const [month, setMonth] = useState(1);
  const [day, setDay] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch(
        `http://localhost:10000/order/?month=${month}` +
          (day !== 0 ? `&day=${day}` : ""),
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        const sales = [];
        data.forEach((order) => {
          if (order.status !== "Cancelled") {
            order.items.forEach((item) => {
              const medicine = sales.find(
                (medicine) => medicine.medicine_id === item.medicine_id._id
              );
              if (medicine) {
                medicine.units_sold += item.quantity;
              } else {
                sales.push({
                  medicine_id: item.medicine_id._id,
                  name: item.medicine_id.name,
                  units_sold: item.quantity,
                  price_per_unit: item.medicine_id.price,
                });
              }
            });
          }
        });
        setMedicines(sales);
      }
      setLoading(false);
    };
    fetchData();
  }, [month, day]);

  const handleMonthChange = (value) => {
    setMonth(value);
    setDay(0);
  };

  const handleDayChange = (value) => {
    setDay(value);
  };

  const handleSearch = (value) => {
    setQuery(value);
  };

  const filteredMedicines = medicines.filter(
    (medicine) => medicine.name.toLowerCase() === query.toLowerCase()
  );

  return (
    <>
      <h1>Sales</h1>
      <Flex gap={10}>
        <Search
          placeholder="Search by medicine name"
          allowClear
          onSearch={handleSearch}
          style={{ width: "20%", marginBottom: "20px", flexGrow: 1 }}
        />
        <Select
          value={month}
          style={{ width: 120, marginBottom: "20px" }}
          onChange={handleMonthChange}
        >
          <Option value={1}>January</Option>
          <Option value={2}>February</Option>
          <Option value={3}>March</Option>
          <Option value={4}>April</Option>
          <Option value={5}>May</Option>
          <Option value={6}>June</Option>
          <Option value={7}>July</Option>
          <Option value={8}>August</Option>
          <Option value={9}>September</Option>
          <Option value={10}>October</Option>
          <Option value={11}>November</Option>
          <Option value={12}>December</Option>
        </Select>
        <Select
          value={day}
          style={{ width: 65, marginBottom: "20px" }}
          onChange={handleDayChange}
        >
          <Option value={0}>All</Option>
          {Array.from({ length: 31 }, (_, index) => (
            <Option key={index + 1} value={index + 1}>
              {index + 1}
            </Option>
          ))}
        </Select>
      </Flex>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table
            pagination={false}
            overflowY="scroll"
            dataSource={query.trim() ? filteredMedicines : medicines}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                key: "name",
              },
              {
                title: "Units Sold",
                dataIndex: "units_sold",
                key: "units_sold",
              },
              {
                title: "Price Per Unit",
                dataIndex: "price_per_unit",
                key: "price_per_unit",
              },
              {
                title: "Total Sales",
                dataIndex: "total_sales",
                key: "total_sales",
                render: (_, record) =>
                  record.units_sold * record.price_per_unit,
              },
            ]}
            style={{
              marginBottom: "30px",
              width: "90%",
            }}
            footer={() => {
              const totalSales = medicines.reduce(
                (sum, medicine) =>
                  sum + medicine.units_sold * medicine.price_per_unit,
                0
              );
              return <div>Total Month Sales: {totalSales}</div>;
            }}
          />
        </>
      )}
    </>
  );
}

export default SalesReport;
