import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/tile_ago";
import Heading from "../widgets/heading";
import { getStocks } from "../controllers/stock_controller";
import { primaryColor } from "../utils/colors";
import AddSale from "../models/add_sale";
import { getUser } from "../utils/local_storage";
import Paragraph from "../widgets/paragraph";

export const StockList = ({ refresh, uuid }) => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddSaleModal, setShowAddSaleModal] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const stocksPerPage = 10; // Number of stocks to display per page

  useEffect(() => {
    getStocks().then((data) => setStocks(data));
  }, [refresh]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current stocks based on pagination
  const indexOfLastStock = currentPage * stocksPerPage;
  const indexOfFirstStock = indexOfLastStock - stocksPerPage;
  const currentStocks = stocks.slice(indexOfFirstStock, indexOfLastStock);

  // Filter stocks by Product.name based on search input
  const filteredStocks = stocks.filter((item) =>
    item.Product.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  const user = getUser();

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredStocks.length / stocksPerPage);
const [selectedStock, setSelectedStock] = useState(null);
  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      <AddSale show={showAddSaleModal} product={selectedProduct} onHide={() => setShowAddSaleModal(false)} uuid={selectedProduct && selectedProduct.uuid} />
      <Heading fontSize={"1.5vw"} text={"Stock"} />
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
              <th>Product name</th>
              {user.type === "Admin" && <th>Buying price</th>}
              <th>Selling price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStocks.slice(indexOfFirstStock, indexOfLastStock).map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.Product.name}</td>
                {user.type === "Admin" && <td>{item.sellingPrice}</td>}
                <td>{item.buyingPrice}</td>
                <td>
                  <Button
                    onClick={() => {
                      setSelectedProduct(item);
                      setShowAddSaleModal(true);
                    }}
                    style={{ backgroundColor: primaryColor }}
                    className=" border-0 btn btn-sm py-1 px-2"
                  >
                    Add sale
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
        <h5 className="mb-0"><Paragraph text={`Page ${currentPage}/${totalPages}`} /></h5>

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

export default StockList;
