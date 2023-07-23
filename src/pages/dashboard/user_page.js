import { Stack } from "react-bootstrap";
import CustomButton from "../../widgets/button";
import Heading from "../../widgets/heading";
import { getUser } from "../../utils/local_storage";
import { useState } from "react";
import ProductList from "../../lists/product_list";
import StockList from "../../lists/stock_list";
import UserList from "../../lists/user_list";
import AddUser from "../../models/add_user";

const UserPage = () => {
    const user = getUser()
const [showAddUser, setShowAddUser] = useState(false);
    return ( <div>
     <AddUser show={showAddUser} onHide={()=>setShowAddUser(false)}/>
           <Stack direction='horizontal' className='d-flex justify-content-between'>
          <Heading className={"me-auto"} text={`System users`}/>
          {user.type == "Admin" && <div>
          <CustomButton onClick={()=>setShowAddUser(true)} text={"Add user"}/>
            </div>}
          </Stack>
          <br/>
          <UserList refresh={showAddUser} />
    </div> );
}
 
export default UserPage;