import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup'
import Heading from '../widgets/heading';
import CustomButton from '../widgets/button';
import { createProduct } from '../controllers/product_controller';




const CreateProduct = ({ show, onHide }) => {

  const [loading, setLoading] = useState(false); // Add the loading state

  const { Formik } = formik;
  const schema = yup.object().shape({
    name: yup.string().required(),
    quantity_type: yup.string().required("Select quantity type"),
  });


  const handleSubmit = (values) => {
    setLoading(true)
    const data = {name:values.name,quantityType:values.quantity_type}
   createProduct(data).then((response)=>{
    onHide()
    setLoading(false)
   })
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'New product'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ name: '', quantity_type: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Product name</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='name'
                        value={values.name}
                        isInvalid={!!errors.name && touched.name}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.name}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Quantity type</Form.Label>
                      <Form.Select
                        onChange={handleChange}
                        name='quantity_type'
                        value={values.quantity_type}
                        isInvalid={!!errors.quantity_type && touched.quantity_type}
                      >
                        <option>Select quantity type</option>
                        <option value="PKT">PKT</option>
                        <option value="BTL">BTL</option>
                        <option value="BAR">BAR</option>
                        <option value="AMP">AMP</option>
                        <option value="AMPL">AMPL</option>
                        <option value="VIAL">VIAL</option>




                      </Form.Select>
                      <Form.Control.Feedback type='invalid'>{errors.quantity_type}</Form.Control.Feedback>
                    </Form.Group>
                  
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Add product"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default CreateProduct;
