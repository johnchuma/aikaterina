import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useEffect, useState } from "react";
import SaleList from "../../lists/sale_list";
import { getProductStock } from "../../controllers/product_controller";
import { useNavigate, useParams } from "react-router-dom";
import ProductStockList from "../../lists/product_stock_list";
import { AiOutlineArrowLeft } from "react-icons/ai";


const StockHistoryPage = () => {
   const {uuid} = useParams()
   const navigate = useNavigate()
    return ( <div>
     
           <Stack direction='horizontal' className='d-flex justify-content-start'>
        <div className="btn border-0 p-0"  onClick={()=>navigate(-1)}>
        <AiOutlineArrowLeft />

        </div>
     
          <Heading className={"me-auto ms-3"} text={`Stock history`}/>
      
       </Stack>
       <br/>
          <ProductStockList uuid={uuid} />

    </div> );
}
 
export default StockHistoryPage;