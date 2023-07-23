import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useState } from "react";
import ProductList from "../../lists/product_list";
import StockList from "../../lists/stock_list";
import OutOfStockList from "../../lists/out_of_stock_list";

const OutOfStock = () => {
    const user = getUser()

    return ( <div>
     
           <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto"} text={`Out of stock products`}/>
      
       </Stack>
       <br/>
          <OutOfStockList />

    </div> );
}
 
export default OutOfStock;