import React, { useEffect, useState } from "react";
import MyTable from "../../components/dashboard/MyTable";

const AllUsers = () => {
  const [allUser, setAllUser] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setAllUser(data);
      setLoading(false);
    }, 5000);
  }, []);
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Age", accessor: "age" },
    { Header: "Role", accessor: "role" },
  ];

  const data = [
    { name: "John Doe", age: 28, role: "Developer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
    { name: "Jane Doe", age: 24, role: "Designer" },
  ];

  const handleDelete = (item) => {
    console.log(`Delete:`, item);
  };

  const handleEdit = (item) => {
    console.log(`Edit: ${item}`);
  };

  return (
    <MyTable
      columns={columns}
      loading={loading}
      data={allUser}
      onDelete={handleDelete}
      onEdit={handleEdit}
    />
  );
};

export default AllUsers;
