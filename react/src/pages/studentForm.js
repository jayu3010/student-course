import React, { useEffect, useState } from 'react';
import {
  Button,

  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Table,

} from 'antd';
import axios from 'axios'
import './home.css'
import Fees from './fees'
import { useNavigate, useParams } from 'react-router-dom'
const { TextArea } = Input;

const StudentForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);

  const [editStudentDetails, setEditStudentDetails] = useState();
  const [selectedValues, setSelectedValues] = useState({
    end_date: '',
    start_date: '',
    branch: '',
    course: '',
    batch: '',
    status: '',
    city: '',
    state: '',
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
  const branchOptions = ['Bandra', 'Kandlivali', 'Andheri', 'Surat', 'Vadodara', 'Chennai'];
  const batchOptions = ['Morning', 'Noon', 'Evening'];
  const statusOptions = ['Active', 'Inactive'];
  // branch 
  // Bandra
  // Kandlivali
  // Andheri
  // Surat
  // Vadodara
  // Chennai

  // batch
  // Morning
  // Noon
  // Evening

  // status

  // Active
  // Inactive


  // cousre 
  // GRE
  // GMAT
  // SAT
  // IELTS
  

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
console.log('Form values:', values);
console.log('Selected values:', selectedValues);
console.log('Merged values:', mergedValues);
try {
    if(id){
     mergedValues = { ...values, ...selectedValues,id };

    const editResponse = await axios.put('http://localhost:3008/api/student/editstudent', mergedValues);
console.log("editResponse",editResponse)
    }else{

      const response = await axios.post('http://localhost:3008/api/student/addstudent', mergedValues);
      console.log("response", response, response?.data?.data?._id, response?.data?.data?.course)
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
  const getCourseDetails = async () => {
    // Merge the form values and selectedValues
    try {
      const response = await axios.get('http://localhost:3008/api/course/getcourse');
      console.log("response", response?.data?.data)
      if(response?.data?.code==200){
        setCourseData(response?.data?.data)
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

    getCourseDetails()
  }, [id])

  const fetchStudentDetailsById = async (id) => {
    const body = { id };
    try {
      const response = await axios.post('http://localhost:3008/api/student/getstudentbyid', body);
      if (response?.data?.code === 200) {
        console.log("response", response?.data?.data);
        setEditStudentDetails(response?.data?.data);
        form.setFieldsValue({
          fname: response?.data?.data?.fname,
          lname: response?.data?.data?.lname,
          address: response?.data?.data?.address,
          city: response?.data?.data?.city,
          dob: response?.data?.data?.dob,
          email: response?.data?.data?.email,
          end_date: response?.data?.data?.end_date,
          gender: response?.data?.data?.gender,
          state: response?.data?.data?.state,
          mobile_no: response?.data?.data?.mobile_no,
          pincode: response?.data?.data?.pincode,
        });
        
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
          <Select defaultValue={id ?editStudentDetails?.start_date:'10-Jun-23'} onChange={(value) => handleSelect(value, 'start_date')}>
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
          <Select size='large' defaultValue={id ?editStudentDetails?.end_date:'10-Jun-23'} onChange={(value) => handleSelect(value, 'end_date')}>
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
          <Select defaultValue={id ?editStudentDetails?.branch:'Bandra'} onChange={(value) => handleSelect(value, 'branch')}>
            <Select.Option value="Bandra">Bandra</Select.Option>
            <Select.Option value="Kandlivali">Kandlivali</Select.Option>
            <Select.Option value="Andheri">Andheri</Select.Option>
            <Select.Option value="Surat">Surat</Select.Option>
            <Select.Option value="Vadodara">Vadodara</Select.Option>
            <Select.Option value="Chennai">Chennai</Select.Option>

          </Select>
        )

      }
    },
    {
      title: 'Course',
      dataIndex: 'course_name',
      key: 'course_name',
      render: (_, record) => {
        console.log("courseDatacourseData",courseData[0]?.course_name)
        return (
          <Select defaultValue={courseData[0]?.course_name} onChange={(value) => handleSelect(value, 'course')}>

            {
              id ? <Select.Option value={editStudentDetails?.course?._id}>{editStudentDetails?.course?.course_name}</Select.Option>
                : courseData?.map((cItem) => {
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
          <Select defaultValue={id ?editStudentDetails?.batch:'Morning'} onChange={(value) => handleSelect(value, 'batch')}>
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
          <Select defaultValue={id ? editStudentDetails?.status:'Active'} onChange={(value) => handleSelect(value, 'status')}>
            <Select.Option value="Active">Active</Select.Option>
            <Select.Option value="InActive">Inactive</Select.Option>

          </Select>
        )

      }

    },
  ];
  if (loading) {
    return <h4>Loading</h4>
  }
  return (
    <div className='container'>
      <div className='student-info'>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          validateMessages={validateMessages}
          onFinish={onFinish}
          initialValues={{
            fname: editStudentDetails?.fname,
             lname: editStudentDetails?.lname,
            address: editStudentDetails?.address,
            city: editStudentDetails?.city,
            course: editStudentDetails?.course,
            email: editStudentDetails?.email,
            end_date: editStudentDetails?.end_date,
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
              <DatePicker />
            </Form.Item>
            <Form.Item name='mobile_no' label="Mobile No.">
              <InputNumber />
            </Form.Item>
            <Form.Item name='pincode' label="Pin Code">
              <InputNumber />
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