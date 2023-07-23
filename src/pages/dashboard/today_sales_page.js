import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useState } from "react";
import SaleList from "../../lists/sale_list";
import TodaySaleList from "../../lists/today_sale_list";


const TodaySalesPage = () => {
 

    return ( <div>
     
           <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto"} text={`Today's sales`}/>
      
       </Stack>
       <br/>
          <TodaySaleList />

    </div> );
}
 
export default TodaySalesPage;