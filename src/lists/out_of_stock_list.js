import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/tile_ago";
import Heading from "../widgets/heading";
import { getProducts } from "../controllers/product_controller";
import { primaryColor, secondaryColor } from "../utils/colors";
import AddStock from "../models/add_stock";
import Paragraph from "../widgets/paragraph";
import { outOfStocks } from "../controllers/stock_controller";

export const OutOfStock = ({ refresh, uuid }) => {
  const navigate = useNavigate();
  const [Products, setProducts] = useState([]);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddStockModal, setShowAddStockModal] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 10; // Number of products to display per page

  useEffect(() => {
    outOfStocks().then((data) => setProducts(data));
  }, [refresh,showAddStockModal]);

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

  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      <AddStock
        show={showAddStockModal}
        onHide={() => setShowAddStockModal(false)}

        uuid={selectedProduct && selectedProduct.uuid}
      />
      <Heading fontSize={"1.5vw"} text={"Out of stock"} />
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
                      setSelectedProduct(item);
                      setShowAddStockModal(true);
                    }}
                    style={{ backgroundColor: secondaryColor }}
                    className=" border-0 btn btn-sm py-1"
                  >
                    Add stock
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

export default OutOfStock;
