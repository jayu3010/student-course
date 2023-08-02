import { Button, DatePicker, Input, Select, Table } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Fees = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState({
    date: null,
    fees_amt: null,
    discount: null,
    net_amount: null,
    tax: null,
    total_due: null,
    paid_amt: null,
    balance: null,
  });
  const [courseName, setCourseName] = useState();
  const [studentDetails, setStudentDetails] = useState();



  // Fetch student details by course ID
  const getStudentByCourse = async (id) => {
    var body = {
      id: id,
    };
    try {
      const response = await axios.post('http://localhost:3008/api/course/getcoursebyid', body);
      console.log("response", response?.data?.data);
      setCourseName(response?.data?.data);
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  useEffect(() => {
    if (state) {
      getStudentByCourse(state?.course_id);
    }
    getStudent();
  }, []);

  useEffect(() => {
    // Calculate net_amount when fees_amt and discount change
    const calculateNetAmount = () => {
      const { fees_amt, discount } = selectedValues;
      if (fees_amt !== null && discount !== null) {
        const netAmount = fees_amt - discount;
        setSelectedValues((prevValues) => ({
          ...prevValues,
          net_amount: String(netAmount),
        }));
      }
    };
  
    // Calculate total_due when net_amount and tax change
    const calculateTotalDue = () => {
      const { net_amount, tax } = selectedValues;
      if (net_amount !== null && tax !== null) {
        const totalDue = Number(net_amount) + (Number(net_amount) * (parseFloat(tax) / 100));
        setSelectedValues((prevValues) => ({
          ...prevValues,
          total_due: String(totalDue),
        }));
      }
    };
  
    // Calculate balance when total_due and paid_amt change
    const calculateBalance = () => {
      const { total_due, paid_amt } = selectedValues;
      if (total_due !== null && paid_amt !== null) {
        const balance = Number(total_due) - Number(paid_amt);
        setSelectedValues((prevValues) => ({
          ...prevValues,
          balance: String(balance),
        }));
      }
    };
  
    calculateNetAmount();
    calculateTotalDue();
    calculateBalance();
  }, [selectedValues.fees_amt, selectedValues.discount, selectedValues.tax, selectedValues.paid_amt]);

  // Fetch student details
  const getStudent = async () => {
    try {
      const response = await axios.get('http://localhost:3008/api/student/getStudent');
      console.log("response", response?.data?.data);
      setStudentDetails(response?.data?.data);
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

  const columns = [
    {
      title: 'Paid Date',
      dataIndex: 'paid_date',
      key: 'paid_date',
      render: (_, record) => {
        return (
          <>
            <DatePicker onChange={(value) => handleSelect(value, 'date')} />

          </>
        )
      }
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (_, record) => {
        return (
          <Input name="course" value={courseName?.course_name} />

        )

      }
    },
    {
      title: 'Fee Amount',
      dataIndex: 'fees_amt',
      key: 'fees_amt',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.fees_amt} onChange={(e) => handleSelect(e.target.value, 'fees_amt')} />
        )
      }
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.discount} onChange={(e) => handleSelect(e.target.value, 'discount')} />
        )
      }

    },
    {
      title: 'Net Amount',
      dataIndex: 'net_amount',
      key: 'net_amount',

      render: (_, record) => {
        return (
          <Input value={selectedValues?.net_amount} onChange={(e) => handleSelect(e.target.value, 'net_amount')} />
        )
      }
    },
    {
      title: 'Tax',
      dataIndex: 'tax',
      key: 'tax',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.tax} onChange={(e) => handleSelect(e.target.value, 'tax')} />
        )
      }

    },
    {
      title: 'Total Due',
      dataIndex: 'total_due',
      key: 'total_due',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.total_due} onChange={(e) => handleSelect(e.target.value, 'total_due')} />
        )
      }

    },
    {
      title: 'Paid Amt',
      dataIndex: 'paid_amt',
      key: 'paid_amt',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.paid_amt} onChange={(e) => handleSelect(e.target.value, 'paid_amt')} />
        )
      }

    },
    {
      title: 'Balance',
      dataIndex: 'balance',
      key: 'balance',
      render: (_, record) => {
        return (
          <Input value={selectedValues?.balance} onChange={(e) => handleSelect(e.target.value, 'balance')} />
        )
      }

    },
  ];

  // Function to handle submitting fees
  const handleFees = async () => {
    const mergedValues = {
      student_id: state?.student_id,
      course: courseName?._id,
      ...selectedValues,
    };

    try {
      const response = await axios.post('http://localhost:3008/api/fees/addfees', mergedValues);
      console.log("response", response);
      if (response.data.code === 200) {
        console.log("success");
        // navigate('/');
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  // Function to handle selecting a student
  const handleSelectStudent = async (id) => {
    var body = {
      student_id: id,
    };
    try {
      const response = await axios.post('http://localhost:3008/api/fees/getfeesbystudent', body);
      console.log("response?.data?.data", response?.data?.data[0])
      setCourseName(response?.data?.data[0]?.course);

      setSelectedValues({
        date: null,
        fees_amt: response?.data?.data[0]?.fees_amt,
        discount: response?.data?.data[0]?.discount,
        net_amount: response?.data?.data[0]?.net_amt,
        tax: response?.data?.data[0]?.tax,
        total_due: response?.data?.data[0]?.total_due,
        paid_amt: response?.data?.data[0]?.paid_amt,
        balance: response?.data?.data[0]?.balance,
      })
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

  return (
    <div>
      <Button onClick={() => navigate("/")}>Go to Home</Button>
      <h3>Student Fees</h3>
      {
        !state ? <Select onChange={(value) => handleSelectStudent(value)}>
          {
            studentDetails?.map((sitem) => {
              return (
                <Select.Option value={sitem._id}>{sitem?.fname}</Select.Option>
              )
            })
          }
        </Select> : ""
      }
      <Table pagination={false} dataSource={[{}]} columns={columns} />
      <Button onClick={handleFees}>Submit Student Fees</Button>
    </div>
  );
};

export default Fees;
