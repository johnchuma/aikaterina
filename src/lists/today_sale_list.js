import React, { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/tile_ago";
import Heading from "../widgets/heading";
import { getSales, getTodaySales } from "../controllers/sale_controller";
import { primaryColor } from "../utils/colors";
import Paragraph from "../widgets/paragraph";

export const TodaySalesList = ({ refresh }) => {
  const navigate = useNavigate();
  const [sales, setSales] = useState([]);
  const [total, setTotal] = useState(0);
  const [profit, setProfit] = useState(0);

  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const productsPerPage = 10; // Number of products to display per page
  const [startDate, setStartDate] = useState(""); // State for start date
  const [endDate, setEndDate] = useState(""); // State for end date
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    getTodaySales().then((data) => setSales(data));
  }, []);

  useEffect(() => {
    // Calculate total sales based on filtered products
    let filteredProducts = sales.filter((item) =>
      item.Product.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    
    if (startDate && endDate) {
      filteredProducts = filteredProducts.filter(
        (item) =>
          new Date(item.createdAt) >= new Date(startDate) &&
          new Date(item.createdAt) <= new Date(endDate)
      );
    }
    setFilteredProducts(filteredProducts)
    const totalSales = filteredProducts.reduce(
      (sum, item) => sum + item.Stock.sellingPrice * item.amount,
      0
    );
    const buyingPrice = filteredProducts.reduce(
      (price, item) => price + item.Stock.buyingPrice * item.amount,
      0
    );
    setTotal(totalSales);
    setProfit(totalSales-buyingPrice)
    
  }, [searchInput, sales, startDate, endDate]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Function to handle date range selection
  const handleDateRangeChange = (event) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current products based on pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sales.slice(indexOfFirstProduct, indexOfLastProduct);


  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
      <Stack direction="horizontal" className="mb-3">
        <Heading fontSize={"1.5vw"} text={"Today"} />

        <div className="rounded-pill py-2 px-3 ms-auto" style={{ backgroundColor: "#FFBD98" }}>
          <Paragraph fontSize={"1.1vw"} fontWeight={600} color={"#4A1D04"} text={"Sales: " + total + "TZS"} />
        </div>
        <div className="rounded-pill py-2 px-3 ms-2" style={{ backgroundColor: "#84CB8F" }}>
          <Paragraph fontSize={"1.1vw"} fontWeight={600} color={"#041A07"} text={"Profit: " + profit + "TZS"} />
        </div>
      </Stack>
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
              <th>Amount sold</th>
              <th>price</th>
              <th>Profit</th>

              <th>Sold by</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.Product.name}</td>
                <td>{item.amount + item.Product.quantityType}</td>
                <td>{item.Stock.sellingPrice * item.amount + "TZS"}</td>
                <td>{(item.Stock.sellingPrice * item.amount)-(item.Stock.buyingPrice * item.amount)  + "TZS"}</td>
                <td>{item.User.name}</td>
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
      {/* Total Sales */}
    </div>
  );
};

export default TodaySalesList;
