import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup'
import Heading from '../widgets/heading';
import CustomButton from '../widgets/button';
import { createStock } from '../controllers/stock_controller';




const AddStock = ({ show, onHide,uuid }) => {

  const [loading, setLoading] = useState(false); // Add the loading state

  const { Formik } = formik;
  const schema = yup.object().shape({
    amount: yup.string().required(),
    buyingPrice: yup.string().required(),
    sellingPrice: yup.string().required(),
    expireDate: yup.string().required()
  });


  const handleSubmit = (values) => {
    setLoading(true)
    const data = {...values}
   createStock(data,uuid).then((response)=>{
    onHide()
    setLoading(false)
   })
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'Add product stock'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>

        <Modal.Body>
          <Formik initialValues={{ amount: '',sellingPrice:"",buyingPrice:"",expireDate:""}} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Stock amount</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='amount'
                        value={values.amount}
                        isInvalid={!!errors.amount && touched.amount}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Stock buyingPrice</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='buyingPrice'
                        value={values.buyingPrice}
                        isInvalid={!!errors.buyingPrice && touched.buyingPrice}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.buyingPrice}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Stock sellingPrice</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='sellingPrice'
                        value={values.sellingPrice}
                        isInvalid={!!errors.sellingPrice && touched.sellingPrice}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.sellingPrice}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label>Stock expireDate</Form.Label>
                      <Form.Control
                        type='date'
                        onChange={handleChange}
                        name='expireDate'
                        value={values.expireDate}
                        isInvalid={!!errors.expireDate && touched.expireDate}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.expireDate}</Form.Control.Feedback>
                    </Form.Group>
                   
                  
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Add stock"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default AddStock;
