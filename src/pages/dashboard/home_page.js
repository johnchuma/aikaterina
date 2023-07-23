import { Card, Col, Row, Stack } from "react-bootstrap";
import SaleList from "../../lists/sale_list";
import Heading from "../../widgets/heading";
import SubHeading from "../../widgets/subheading";
import Paragraph from "../../widgets/paragraph";
import { primaryColor } from "../../utils/colors";
import { getTodaySales, totalTodaySales } from "../../controllers/sale_controller";
import { useEffect, useState } from "react";
import { exipiringProducts, outOfStocks } from "../../controllers/stock_controller";
import TodaySaleList from "../../lists/today_sale_list";

const HomePage = () => {
    const [todaySales, setTodaySales] = useState(0);
    const [outSales, setOutSales] = useState(0);
    const [expiringProducts, setExpiringProducts] = useState(0);

    useEffect(() => {
       totalTodaySales().then((data)=>setTodaySales(data))
       outOfStocks().then((data)=>setOutSales(data.length))
       exipiringProducts().then((data)=>setExpiringProducts(data.length))
    }, []);
    return ( <div>
        <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto mb-4"} text={`Dashboard`}/>
         
       </Stack>
        <Row className="mb-4">
            
             {[
                {name:"Today's sales",value:todaySales+"/="},
                {name:"Out of stock",value:outSales},
                {name:"Expiring products",value:expiringProducts},
           

             ].map((item)=>{
                return <Col md={4}>
                     <Card>
                    <Card.Body className="py-4">
                        <Heading text={item.value}/>
                        <Paragraph className={"mt-3"} text={item.name}/>
                    </Card.Body>
                </Card>
                </Col>
               
             })}   
        </Row>
 
      <TodaySaleList/>
    </div> );
}
 
export default HomePage;