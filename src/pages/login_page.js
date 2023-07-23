import React, { useState } from 'react';
import { Card, Form, Button, Col, Row, Stack, Image, ToastContainer, Toast } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from '../utils/colors';
import CustomButton from '../widgets/button';
import Paragraph from '../widgets/paragraph';
import Heading from '../widgets/heading';
import { login } from '../controllers/user_controller';
import { getUser } from '../utils/local_storage';


const LoginPage = () => {
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });
  const [waiting, setwaiting] = useState(false);
  const [showError, setshowError] = useState(false);
  const [errorMessage, seterrorMessage] = useState("");


const navigate = useNavigate()
  const handleSubmit = (values) => {
    const data = {email:values.email,password:values.password};
    setwaiting(true)
    
    login(data).then((response)=>{
        setwaiting(false)
        if(response){
          if(response.status === true){
            const user = getUser()
            if(user.type === "Admin"){
              navigate("/home")
            }
            else{
              navigate("/stock")
            }
        }
          else{
          setshowError(true)
          seterrorMessage(response.message)
          }
        }else{
          setshowError(true)
          seterrorMessage("Internal server error")
        }
        

  })


  };

  return (
    <div>
      <ToastContainer className='px-3 py-3' position='top-end' >
        <Toast show={showError} autohide  onClose={()=>setshowError(false)} >
          <Toast.Header style={{ color:primaryColor }}>
             <div className='me-auto' style={{ fontWeight:500 }}>Failed to login</div>
          </Toast.Header>
          <Toast.Body>
            {errorMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
      <div className='d-flex justify-content-center align-items-center' 
        style={{ height: '100vh', width: '100%' }}>
        <Row className='w-100'>
        <Col md={8}>
        <Image fluid src='background.jpg'/>
        </Col>
        <Col className=' d-flex justify-content-center align-items-center'>
          <div className='w-100 p-3'>
          <Heading className={"text-start py-2"} text={"Login to Aikaterina"}/>
          <Paragraph text={"Enter your credentials to continue"}/>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form className='mt-4' noValidate onSubmit={handleSubmit}>
                <Form.Group controlId='email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={touched.email && !!errors.email}/>
                  <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='mt-2' controlId='password'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                </Form.Group>
                <CustomButton loading={waiting} className={"w-100 mt-4"} text={'Login'}/>
              
              </Form>
            )}
          </Formik>
          </div>
         
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default LoginPage;
