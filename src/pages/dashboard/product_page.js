import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useState } from "react";
import CreateProduct from "../../models/create_product";
import ProductList from "../../lists/product_list";

const ProductPage = () => {
    const user = getUser()
    const [showCreateProduct, setShowCreateProduct] = useState(false);
    return ( <div>
        <CreateProduct show={showCreateProduct} onHide={()=>setShowCreateProduct(false)}/>
           <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto"} text={`Product list`}/>
          {user.type == "Admin" && <div>
          <CustomButton onClick={()=>setShowCreateProduct(true)} text={"New product"}/>
            </div>}
       </Stack>
       <br/>
       <ProductList refresh={showCreateProduct}/>

    </div> );
}
 
export default ProductPage;