import { Button, DatePicker, Input, Select, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment'
import Service from '../service';
const Fees = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selectedValues, setSelectedValues] = useState({
    paid_date: '',
    fees_amt: null,
    discount: null,
    net_amount: null,
    tax: null,
    total_due: null,
    paid_amt: null,
    balance: null,
    course: ''
  });
  const [courseName, setCourseName] = useState();
  const [studentDetails, setStudentDetails] = useState();
  const [laoding, setLaoding] = useState(true);

  const [courseData, setCourseData] = useState([]);
  const [studentId, setStudentId] = useState();



  // Fetch student details by course ID
  const getStudentByCourse = async (id) => {
    try {
      var body = {
        id: id,
      };
      const response = await Service.makeAPICall({
        methodName: Service.postMethod,
        api_url: Service.getcoursebyid,
        body:body
      });
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
    fatchData()
  }, []);
  const fatchData = async () => {
    try {
      const Courseresponse = await Service.makeAPICall({
        methodName: Service.getMethod,
        api_url: Service.getcourse,
      });
      setCourseData(Courseresponse?.data?.data);
      setLaoding(false)


      setSelectedValues((prevValues) => ({
        ...prevValues,
        course: Courseresponse?.data?.data[0]?._id,
      }));
    } catch (error) {
      console.log('Course list error:', error);
    }
  };

  useEffect(() => {
    // Calculate net_amount when fees_amt and discount change
    const calculateNetAmount = () => {
      const { fees_amt, discount } = selectedValues;
      if (fees_amt !== null && discount !== null) {
        const netAmount = fees_amt - discount;
        console.log("123456", netAmount)

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
        console.log("net_amount", net_amount)
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
  }, [selectedValues.fees_amt, selectedValues.balance, selectedValues.net_amount, selectedValues.discount, selectedValues.tax, selectedValues.paid_amt]);

  // Fetch student details
  const getStudent = async () => {
    try {
      const response = await Service.makeAPICall({
        methodName: Service.getMethod,
        api_url: Service.getStudent,
      });
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
            <DatePicker onChange={(value) => handleSelect(value, 'paid_date')} />

          </>
        )
      }
    },
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
      render: (_, record) => {
        // console.log("courseData[0]?._id", courseData[0]?._id)
        return (
          <Select value={selectedValues?.course} onChange={(value) => handleSelect(value, 'course')}>
            {
              courseData?.map((cItem) => {
                return (
                  <>
                    <Select.Option value={cItem?._id}>{cItem?.course_name}</Select.Option>
                  </>
                )

              }
              )
            }
          </Select>
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
    // console.log("mergedValues",mergedValues)
    try {
      const response = await Service.makeAPICall({
        methodName: Service.postMethod,
        api_url: Service.addfees,
        body: mergedValues
      });
      if (response.data.code === 200) {
        console.log("success");
        navigate('/');
      }
    } catch (error) {
      console.log('Student Add error:', error);
    }
  };

  // Function to handle selecting a student
  const handleSelectStudent = async (id) => {
    try {
      var body = {
        student_id: id,
      };
      setStudentId(id)
      const response = await Service.makeAPICall({
        methodName: Service.postMethod,
        api_url: Service.getfeesbystudent,
        body: body
      });
      setCourseName(response?.data?.data[0]?.course);
      setSelectedValues({
        course: response?.data?.data[0]?.course._id,
        paid_date: response?.data?.data[0]?.paid_date,
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
  const handleUpdate = async () => {
    const mergedValues = {
      student_id: studentId,
      course: courseName?._id,
      ...selectedValues,
    };
    // console.log("mergedValues",mergedValues)
    try {
      const response = await Service.makeAPICall({
        methodName: Service.putMethod,
        api_url: Service.updatefees,
        body: mergedValues
      });
      // console.log("response", response);
      if (response.data.code === 200) {
        console.log("success");
        navigate('/');
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  }
  if (laoding) {
    return <h3>Loading</h3>
  }

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
      {
        !state ?
          <Button onClick={handleUpdate}>Update Student Fees</Button> :
          <Button onClick={handleFees}>Submit Student Fees</Button>
      }
    </div>
  );
};

export default Fees;
