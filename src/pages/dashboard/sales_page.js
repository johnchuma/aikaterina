import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useState } from "react";
import SaleList from "../../lists/sale_list";


const StockPage = () => {
 

    return ( <div>
     
           <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto"} text={`Total sales`}/>
      
       </Stack>
       <br/>
          <SaleList />

    </div> );
}
 
export default StockPage;