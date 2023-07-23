import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Modal, Stack, Image } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import * as formik from 'formik';
import * as yup from 'yup'
import Heading from '../widgets/heading';
import CustomButton from '../widgets/button';
import { getUser } from '../utils/local_storage';
import { createSale } from '../controllers/sale_controller';




const AddSale = ({ show, onHide, product }) => {

  
    const [loading, setLoading] = useState(false); // Add the loading state
    // Add the loading state
  
  const { Formik } = formik;
  const schema = yup.object().shape({
    amount: yup.string().required(),
  });


  const handleSubmit = (values) => {
    setLoading(true)
    const user = getUser()
    const data = {amount:values.amount,user_uuid:user.uuid,stock_uuid:product.uuid}
   createSale(data,product.Product.uuid).then((response)=>{
    onHide()
    setLoading(false)
   })
  };

  return (
    <Modal show={show} className='' size='md' onHide={onHide}>
      <Container>
        <Modal.Header>
          <Heading text={'New sale'} />
          <div onClick={onHide} className='btn border-0'>
            <AiOutlineClose size={25} />
          </div>
        </Modal.Header>
        <Modal.Body>
          <Formik initialValues={{ amount: '' }} onSubmit={handleSubmit} validationSchema={schema}>
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <Row>
                  <Col md={12}>
                    <Form.Group>
                      <Form.Label>Sold amount</Form.Label>
                      <Form.Control
                        onChange={handleChange}
                        name='amount'
                        value={values.amount}
                        isInvalid={!!errors.amount && touched.amount}/>
                      <Form.Control.Feedback type='invalid'>{errors.amount}</Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                <CustomButton className={"mt-3"} loading={loading} text={"Add sale"}/>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Container>
    </Modal>
  );
};

export default AddSale;
