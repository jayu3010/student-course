import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentList = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  // Function to delete a student by ID
  const handleDelete = async (studentId) => {
    try {
      if (!studentId) {
        console.log("Invalid student ID:", studentId);
        return;
      }
      console.log("studentId", studentId)
      const response = await axios.delete('http://localhost:3008/api/student/delete-student', { data: { id: studentId } });

      console.log("response", response);
      if (response?.data?.code === 200) {
        getStudents(); // Refresh the student list after successful deletion
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Last Name',
      dataIndex: 'lname',
      key: 'lname',
      render: (text) => <a>{text}</a>,
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
      const response = await axios.get('http://localhost:3008/api/student/getStudent');
      console.log("response", response?.data?.data);
      setStudents(response?.data?.data);
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  useEffect(() => {
    getStudents(); // Fetch students on component mount

  }, []);

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
