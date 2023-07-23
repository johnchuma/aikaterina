import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup'
import Heading from '../widgets/heading';
import CustomButton from '../widgets/button';
import { registerUser } from '../controllers/user_controller';





const AddUser = ({ show, onHide }) => {

  const [loading, setLoading] = useState(false); // Add the loading state

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
    type: yup.string().required("Select user type"),
  });


  const handleSubmit = (values) => {
    setLoading(true)
    const data = {...values}
   registerUser(data).then((response)=>{
    setLoading(false)
    onHide()
   })
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Add system user'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ name: '', phone: '',type: '',email: '',password: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                  <Form.Group>
                      <Form.Label>User type</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        name='type'
                        value={values.type}
                        isInvalid={!!errors.type && touched.type}
                      >
                        <option>Select quantity type</option>
                        <option value="Admin">Admin</option>
                        <option value="Staff">Staff</option>
                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.type}</Form.Control.Feedback>
                    </Form.Group>
                  
                    <Form.Group>
                      <Form.Label>User name</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='name'
                        value={values.name}
                        isInvalid={!!errors.name && touched.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Phone number</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='phone'
                        value={values.phone}
                        isInvalid={!!errors.phone && touched.phone}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.phone}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>User email address</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='email'
                        type="email"
                        value={values.email}
                        isInvalid={!!errors.email && touched.email}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        type='password'
                        name='password'
                        value={values.password}
                        isInvalid={!!errors.password && touched.password}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                 
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Add user"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default AddUser;
