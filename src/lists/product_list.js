import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Offcanvas, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/tile_ago";
import Heading from "../widgets/heading";
import { getProducts, updateProduct } from "../controllers/product_controller";
import { primaryColor, secondaryColor } from "../utils/colors";
import AddStock from "../models/add_stock";
import Paragraph from "../widgets/paragraph";
import { AiFillCloseCircle } from "react-icons/ai";
import CustomButton from "../widgets/button";
import UpdateProduct from "../models/update_product";

export const ProductList = ({ refresh, uuid }) => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 10; // Number of products to display per page

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, [refresh,showAddStockModal,showUpdateModal]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = Products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Filter products by name based on search input
  const filteredProducts = Products.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
const [showOffcanvans, setshowOffcanvans] = useState(false);

  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      <Offcanvas placement="end" show={showOffcanvans} onHide={()=>setshowOffcanvans(false)}>
        <Stack direction="horizontal" className="d-flex justify-content-end">
          <div className="btn p-3" onClick={()=>setshowOffcanvans(false)}>
          <AiFillCloseCircle size={30} color={primaryColor}/>

          </div>
        </Stack>
          {selectedProduct&&
            <Container className="py-5">
            <Heading text={"Product actions"}/>
            <Paragraph className={"mt-2"} text={selectedProduct.name}/>
             <hr/>
            <CustomButton text={"Add stock"} color={secondaryColor} onClick={() => {
              setshowOffcanvans(false)
                      setShowAddStockModal(true);
                    }} />
            <CustomButton text={"Update product details"} color={secondaryColor} onClick={() => {
              setshowOffcanvans(false)

                      setshowUpdateModal(true);
                    }} />
          <CustomButton text={"View product sales"} color={secondaryColor} onClick={() => {
              navigate(`/product-sales/${selectedProduct.uuid}`)
                    }} />
             <CustomButton text={"Product stock history"} color={secondaryColor} onClick={() => {
              navigate(`/product-stock/${selectedProduct.uuid}`)
             
                    }} />
          </Container>}
      </Offcanvas>
      <AddStock
        show={showAddStockModal}
        onHide={() => setShowAddStockModal(false)}

        uuid={selectedProduct && selectedProduct.uuid}
      />
      {selectedProduct&&<UpdateProduct show={showUpdateModal} product={selectedProduct} onHide={()=>setshowUpdateModal(false)}/>}
      <Heading fontSize={"1.5vw"} text={"Products"} />
      
      <Stack className="d-flex justify-content-end">
        <Row>
          <Col md={{ span: 4, offset: 8 }}>
            <Form.Control
              placeholder="Search here..."
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </Col>
        </Row>
      </Stack>
      <div className="table-responsive-md">
        <Table>
          <thead>
            <tr>
              <th>Created</th>
              <th>Name</th>
              <th>Quantity Type</th>
              <th>Current Stock</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.name}</td>
                <td>{item.quantityType}</td>
                <td>{item.currentStock}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedProduct(item)
                      setshowOffcanvans(true)
                    }}
                    style={{ backgroundColor: secondaryColor }}
                    className=" border-0 btn btn-sm py-1"
                  >
                    Actions
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Pagination */}
      <div className="d-flex justify-content-end align-items-center my-3">
        {/* Previous Button */}
        <Button
          className="shadow-none me-3 py-1"
          style={{
            backgroundColor: primaryColor,
            color: "white",
            borderColor: primaryColor,
            display: currentPage === 1 ? "none" : "block",
          }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Current Page Number */}
        <h5 className="mb-0"><Paragraph text={`Page ${currentPage}/${totalPages}`}/></h5>

        {/* Next Button */}
        <Button
          className="shadow-none ms-3 py-1"
          style={{
            backgroundColor: primaryColor,
            color: "white",
            borderColor: primaryColor,
            display: currentPage === totalPages ? "none" : "block",
          }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ProductList;
