import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Select, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import Service from '../service';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Function to delete a student by ID
  const handleDelete = async (studentId) => {
    try {
      if (!studentId) {
        console.log("Invalid student ID:", studentId);
        return;
      }
      const response = await Service.makeAPICall({
        methodName: Service.deleteMethod,
        api_url: Service.deletestudent,
        body: { id: studentId },

      });
      // local url:-http://localhost:3008/api/student/delete-student

      console.log("response", response);
      if (response?.data?.code === 200) {
        getStudents(); // Refresh the student list after successful deletion
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };
  const handleStatusSelect = async (value, id) => {

    var mergedValues = { id: id, status: value };
    try {
      const response = await Service.makeAPICall({
        methodName: Service.putMethod,
        api_url: Service.updatestatus,
        body: mergedValues,

      });
      if (response.data.code === 200) {
        getStudents()
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };
  const columns = [
    {
      title: 'First Name',
      dataIndex: 'fname',
      key: 'fname',
      // render: (text) => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => {

      return <>{record?.branch?.branch_name}</>
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {

        return (
          <Select value={record?.status} onChange={(value) => handleStatusSelect(value, record._id)}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="InActive">InActive</Select.Option>
          </Select>)
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => navigate(`/edit-student/${record?._id}`)}>Edit</Button>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record?._id)}>
            <Button>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Function to fetch the list of students
  const getStudents = async () => {
    try {
      const response = await Service.makeAPICall({
        methodName: Service.getMethod,
        api_url: Service.getStudent,
      });
      setLoading(false)
      setStudents(response?.data?.data);
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  useEffect(() => {
    getStudents(); // Fetch students on component mount

  }, []);
if(loading){
  return <h3>Loading Please Wait</h3>
}
  return (
    <div>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
      <Button onClick={() => navigate("/add-student")}>
        Add Student
      </Button>
      <Table columns={columns} dataSource={students} />
    </div>
  );
};

export default StudentList;
