import { Button, Select, Table } from 'antd';
import React, { useState } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Report = () => {
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState({
    branch: '',
    status: '',
  });

  const [generateReport, setGenerateReport] = useState([]);

  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'student_name',
      key: 'student_name',
    
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
    },
    {
      title: 'Fee Amount',
      dataIndex: 'fees_amt',
      key: 'fees_amt',
    
    },
    {
      title: 'Paid Amt',
      dataIndex: 'paid_amt',
      key: 'paid_amt',
    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
    },
    ];
    

  // Function to generate the report
  const generateReportData = async () => {
    try {
      const response = await axios.post('https://student-course-ru57.vercel.app/api/student/genrate-report', selectedValues);
      console.log("response", response?.data?.data);

      if (response?.data?.code === 200) {
        setGenerateReport(response?.data?.data);
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  // Function to handle selection changes in Select components
  const handleSelect = (value, name) => {
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Go to Home</Button>

      <div><h2>STUDENT FEES REPORT</h2></div>
      <div className='form-group'>
        <div className='form-title'>
          Select Branch
          <Select onChange={(value) => handleSelect(value, 'branch')}>
            <Select.Option value="Bandra">Bandra</Select.Option>
            <Select.Option value="Kandlivali">Kandlivali</Select.Option>
            <Select.Option value="Andheri">Andheri</Select.Option>
            <Select.Option value="Surat">Surat</Select.Option>
            <Select.Option value="Vadodara">Vadodara</Select.Option>
            <Select.Option value="Chennai">Chennai</Select.Option>
          </Select>
        </div>
        <div className='form-title'>
          Select Status
          <Select onChange={(value) => handleSelect(value, 'status')}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="Inactive">Inactive</Select.Option>
          </Select>
        </div>
        <div className='form-title'>
          <Button onClick={generateReportData}>GENERATE REPORT</Button>
        </div>
      </div>
      <div>
        <Table pagination={false} dataSource={generateReport} columns={columns} />
      </div>
    </div>
  );
}

export default Report;
