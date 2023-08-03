import React, { useEffect, useState } from 'react';
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Table,

} from 'antd';
import axios from 'axios'
import './home.css'
import moment from 'moment'
import { useNavigate, useParams } from 'react-router-dom'
const { TextArea } = Input;

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [courseLoad, setCourseLoad] = useState(false);

  const [editStudentDetails, setEditStudentDetails] = useState();
  const [branchData, setBranchData] = useState([]);

  const [selectedValues, setSelectedValues] = useState({
    end_date: '10-Jun-23',
    start_date: '10-Jun-23',
    branch: '',
    course: '',
    batch: 'Morning',
    status: 'Active',
    city: 'Gujarat',
    state: 'Baroda',
  });
  const [courseData, setCourseData] = useState([]);

  // Validate error messages for form fields
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const handleSelect = (value, name) => {
    console.log(value, name)
    setSelectedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const onFinish = async (values) => {
    // Merge the form values and selectedValues
    var mergedValues = { ...values, ...selectedValues };
    // console.log('Form values:', values);
    console.log('Selected values:', mergedValues);
    try {
      if (id) {
        var editData = { id: id, ...values, ...selectedValues };
        // console.log(editData)
        // Editing existing student
        const editResponse = await axios.put('http://localhost:3008/api/student/editstudent', editData);
        // console.log("editResponse", editResponse);
        if (editResponse.data.code === 200) {
          navigate("/student-form")
        }
      } else {
        // Adding a new student
        const response = await axios.post('http://localhost:3008/api/student/addstudent', mergedValues);
        // console.log("response", response, response?.data?.data?._id, response?.data?.data?.course);
        if (response.data.code === 200) {
          navigate("/fees", {
            state: {
              student_id: response?.data?.data?._id,
              course_id: response?.data?.data?.course,
            },
          });
        }
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };

 

  useEffect(() => {
    setLoading(false)
    if (id) {
      setLoading(true)
      fetchStudentDetailsById(id)
    }
    fatchData()
    // getCourseDetails()
  }, [id])
  // const getCourseDetails = async () => {
  //   // Merge the form values and selectedValues
  //   try {
  //     // console.log("response", response?.data?.data)
  //     if (response?.data?.code === 200) {
  //       setCourseLoad(false)
  //     }

  //   } catch (error) {
  //     console.log('Course list error:', error);
  //   }
  // };
  const fatchData = async () => {
    try {
      const Corseresponse = await axios.get('http://localhost:3008/api/course/getcourse');
      setCourseData(Corseresponse?.data?.data);
  
      const response = await axios.get('http://localhost:3008/api/branch/getbranch');
      setBranchData(response?.data?.data);
  
      setSelectedValues((prevValues) => ({
        ...prevValues,
        course: Corseresponse?.data?.data[0]?._id,
        branch: response?.data?.data[0]?._id,
      }));
    } catch (error) {
      console.log('Branch list error:', error);
    }
  };
  

  console.log("selectedValues",selectedValues)
  const fetchStudentDetailsById = async (id) => {
    const body = { id };
    setCourseLoad(true)

    try {
      const response = await axios.post('http://localhost:3008/api/student/getstudentbyid', body);
      if (response?.data?.code === 200) {
        // console.log("response", response?.data?.data);
        setEditStudentDetails(response?.data?.data);
        setCourseLoad(false)
        setSelectedValues({
          branch: response?.data?.data?.branch,
          course: response?.data?.data?.course,
          batch: response?.data?.data?.batch,
          status: response?.data?.data?.status,
          city: response?.data?.data?.city,
          state: response?.data?.data?.state,
        })


        setLoading(false);
      }
    } catch (error) {
      console.log('Student list error:', error);
    }
  };
  const columns = [
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (_, record) => {
        return (
          <Select value={id ? editStudentDetails?.start_date : selectedValues?.start_date} onChange={(value) => handleSelect(value, 'start_date')}>
            <Select.Option value="10-Jun-23">10-Jun-23</Select.Option>
            <Select.Option value="10-Jun-23">10-Jun-23</Select.Option>

          </Select>
        )

      }
    },
    {
      title: 'End Date',
      dataIndex: 'end_date',
      key: 'end_date',
      render: (_, record) => {
        return (
          <Select size='large' value={id ? editStudentDetails?.end_date : selectedValues?.end_date} onChange={(value) => handleSelect(value, 'end_date')}>
            <Select.Option value="10-Jun-23">10-Jun-23</Select.Option>
            <Select.Option value="10-Jun-23">10-Jun-23</Select.Option>
          </Select>
        )

      }
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
      render: (_, record) => {
        return (
          <Select value={id ? editStudentDetails?.branch?.branch_name : selectedValues?.branch} onChange={(value) => handleSelect(value, 'branch')}>
            {
              branchData?.map((bItame) => {
                return (
                  <>
                    <Select.Option value={bItame?._id}>{bItame?.branch_name}</Select.Option>
                  </>
                )
              })
            }

          </Select>
        )

      }
    },
    {
      title: 'Course',
      dataIndex: 'course_name',
      key: 'course_name',
      render: (_, record) => {
        console.log("courseData[0]?._id", courseData[0]?._id)
        return (
          <Select value={id ? editStudentDetails?.course?.course_name : courseData[0]?._id} onChange={(value) => handleSelect(value, 'course')}>
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
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
      render: (_, record) => {
        return (
          <Select value={id ? editStudentDetails?.batch : selectedValues?.batch} onChange={(value) => handleSelect(value, 'batch')}>
            <Select.Option value="Morning">Morning</Select.Option>
            <Select.Option value="Noon">Noon</Select.Option>
            <Select.Option value="Evening">Evening</Select.Option>

          </Select>
        )

      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        return (
          <Select value={id ? editStudentDetails?.status : selectedValues?.status} onChange={(value) => handleSelect(value, 'status')}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="InActive">Inactive</Select.Option>

          </Select>
        )

      }

    },
  ];
  if (loading || courseLoad) {
    return <h4>Loading</h4>
  }
  
  return (
    <div className='container'>
      <div className='student-info'>
        <Button onClick={() => navigate("/student-form")}>Go to Home</Button>

        <Form
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 13 }}
          layout="horizontal"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={{
            fname: editStudentDetails?.fname,
            lname: editStudentDetails?.lname,
            address: editStudentDetails?.address,
            city: editStudentDetails?.city,
            email: editStudentDetails?.email,
            gender: editStudentDetails?.gender,
            state: editStudentDetails?.state,
            mobile_no: editStudentDetails?.mobile_no,
            pincode: editStudentDetails?.pincode
          }}
        >
          <div className='form-controller'>
            <Form.Item className='form-data' name='fname' label="First Name">
              <Input />
            </Form.Item>
            <Form.Item name='dob' label="DOB">
              {
                id ?
                <DatePicker defaultValue={moment(editStudentDetails?.dob)} />:

              <DatePicker />
              }
            </Form.Item>
            <Form.Item name='mobile_no' label="Mobile No.">
              <Input type='number' />
            </Form.Item>
            <Form.Item name='pincode' label="Pin Code">
            <Input type='number' />
            </Form.Item>
            <Form.Item name='city' label="City">
              <Select onChange={(value) => handleSelect(value, 'city')}>
                <Select.Option value="Ahemdabad">Ahemdabad</Select.Option>
                <Select.Option value="Baroda">Baroda</Select.Option>
                <Select.Option value="Surat">Surat</Select.Option>

              </Select>
            </Form.Item>
          </div>
          <div className='form-controller'>

            <Form.Item name='lname' label="Last Name">
              <Input />
            </Form.Item>
            <Form.Item name='gender' label="Gender">
              <Select>
                <Select.Option value="M">Male</Select.Option>

                <Select.Option value="F">Female</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item name='address' label="TextArea">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item
              name='email'
              label="Email Id"
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name='state' label="State">
              <Select onChange={(value) => handleSelect(value, 'state')}>
                <Select.Option value="Gujarat">Gujarat</Select.Option>
                <Select.Option value="TamilNadu">TamilNadu</Select.Option>
                <Select.Option value="Delhi">Delhi</Select.Option>

              </Select>
            </Form.Item>

          </div>


          <Form.Item

          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>

      <div className='course-info'>
        <Table pagination={false} dataSource={[{}]} columns={columns} size="middle" />
      </div>


    </div>
  )
}

export default StudentForm