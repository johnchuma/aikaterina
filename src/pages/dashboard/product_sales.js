import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useEffect, useState } from "react";
import SaleList from "../../lists/sale_list";
import { getProductSales, getProductStock } from "../../controllers/product_controller";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ProductSalesListt, { ProductSalesList } from "../../lists/product_sales_list";


const ProductSales = () => {
   const {uuid} = useParams()
    const [sales, setSales] = useState([]);
    useEffect(() => {
       getProductSales(uuid).then((data)=>setSales(data))
    }, []);
    const navigate = useNavigate()
    return ( <div>
     
           <Stack direction='horizontal' className='d-flex justify-content-start'>
        <div className="btn border-0 p-0"  onClick={()=>navigate(-1)}>
        <AiOutlineArrowLeft />

        </div>
     
          <Heading className={"me-auto ms-3"} text={`Product sales`}/>
      
       </Stack>
       <br/>
          <ProductSalesList uuid={uuid} />

    </div> );
}
 
export default ProductSales;