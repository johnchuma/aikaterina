import React, { useRef, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, Image, Navbar, Offcanvas, Overlay, Row, Stack } from 'react-bootstrap'
import { menuItems } from '../utils/arrays'
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import { getUser, logout } from '../utils/local_storage';
import { dangerColor, lightPrimaryColor, primaryColor } from '../utils/colors';
import SubHeading from '../widgets/subheading';
import Small from '../widgets/small';
import Heading from '../widgets/heading';
import { FaUser } from 'react-icons/fa';

const DashboardLayout = () => {
    const [currentItem, setcurrentItem] = useState("dashboard");
    const navigate = useNavigate();
    const user =getUser();
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const location = useLocation();
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div style={{ height:"100vh",position:"relative",backgroundColor:lightPrimaryColor }}>
    <Overlay target={target.current} show={show} placement="bottom">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              position: 'relative',
              backgroundColor: dangerColor,
              padding: '2px 10px',
              marginTop:"20px",
              marginRight:"10px",
              color: 'white',
              borderRadius: 3,
              ...props.style,
            }}
            onClick={()=>{
                logout();
                navigate("/login")
            }}
          >
            <Heading className={"btn  border-0 text-white p-2 "} fontSize={"1.2vw"} text={"Logout"}/>
          </div>
        )}
      </Overlay>
        <Navbar fixed='top' style={{ backgroundColor:"white" }}>
            <Container fluid>

            <Navbar.Brand onClick={()=>navigate("/")} className='me-auto' style={{ color:primaryColor,fontWeight:600 }}>
                <Stack direction='horizontal' className='me-auto'>
                {/* <Image  className='me-2' style={{ width:50,height:50 }} src='/logo.png' fluid/> */}
                <div>
                   <Heading fontWeight={700} fontSize={"1.6vw"} color={primaryColor} className={"ms-3"}  text={"Alkaterine pharmacy"}/>

                </div>

                </Stack>
               
            </Navbar.Brand>
         
            
      <div ref={target} className='ms-4 btn text-start'  onClick={()=>setShow(!show)}>
        <Stack direction='horizontal'>
        <FaUser color='#00000040'/>

 <div className='ms-3'>
            <SubHeading  text={user.name}/>
                        {/* <Small  text={user.email}/> */}
            </div>
        </Stack>
       
          </div>
      <Offcanvas  show={showMenu} onHide={()=>setShowMenu(false)} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="px-4">
         {menuItems.map((item)=>item.authorized.includes(user.role)&&<SubHeading className={"mb-2"} onClick={()=>{
            navigate(item.path)
            setShowMenu(false)
         }} text={item.name}/>)}
         <hr/>
         <SubHeading onClick={()=>{
           logout();
           navigate("/login")
         }} color={primaryColor} className={" border-0 mb-2"}  text={"Logout"}/>
          
        </Offcanvas.Body>
      </Offcanvas>
      <div onClick={()=>setShowMenu(true)} className="ms-auto btn d-block d-md-none">
                <AiOutlineMenu className=""/>
            </div>
     
            
            </Container>
           
        </Navbar>
        <div  style={{ backgroundColor:lightPrimaryColor,marginTop:60 }}>
            
        <Row >
            <Col md={3} className='d-none d-md-block' style={{ backgroundColor:primaryColor,height:"100vh", position:"fixed", overflowY:"scroll" }}>
                <Container className='mt-5'>
                {menuItems.map((item)=>{
                    return item.authorized.includes(user.type)&&(
                    <Stack>
                    <Button  onClick={()=>
                        {
                            setcurrentItem(item.path);
                            navigate(item.path)
                        }
                        } style={{ backgroundColor: location.pathname.includes(`/${item.path}`) ===true ?"#4A0B7C":"transparent" }} className='mb-1 border-0'>
                        <Stack direction='horizontal'>
                    {item.icon}
                    <div className='ms-3'>
                    {item.name}
                    </div>
                        </Stack>
                        </Button>
                    </Stack>
                    )
                    })}
                  
                </Container> 
            </Col>
            <Col md={9}   style={{ backgroundColor:lightPrimaryColor,position:"absolute",right:0, }}>
               <Container className='py-4 px-2'>
               <Outlet/>

               </Container>

                    

            </Col>

        </Row>
        </div>
        
        </div>
    
    )
}

export default DashboardLayout
