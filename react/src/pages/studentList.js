import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Select, Space, Table } from 'antd';
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
      // local url:-http://localhost:3008/api/student/delete-student
      const response = await axios.delete('https://student-course-ru57.vercel.app/api/student/delete-student', { data: { id: studentId } });

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
      const response = await axios.put('https://student-course-ru57.vercel.app/api/student/update-status', mergedValues);
      console.log("response", response, response?.data?.data?._id, response?.data?.data?.course);
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
      const response = await axios.get('https://student-course-ru57.vercel.app/api/student/getStudent');
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
