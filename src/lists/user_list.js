import { useState, useEffect } from "react";
import { Button, Col, Container, Form, Row, Stack, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../utils/tile_ago";
import Heading from "../widgets/heading";
import { primaryColor, secondaryColor } from "../utils/colors";
import AddStock from "../models/add_stock";
import Paragraph from "../widgets/paragraph";
import { getUsers } from "../controllers/user_controller";
import UpdateUser from "../models/update_user";

export const UserList = ({ refresh, uuid }) => {
  const navigate = useNavigate();
  const [Users, setUsers] = useState([]);
  const [showUpdateModal, setshowUpdateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserUpdateModal, setShowUserUpdateModal] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // State for search input
  const [currentPage, setCurrentPage] = useState(1); // State for current page
  const UsersPerPage = 5; // Number of Users to display per page

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, [refresh,showUserUpdateModal]);

  // Function to handle search input change
  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  // Function to handle pagination
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get current Users based on pagination
  const indexOfLastProduct = currentPage * UsersPerPage;
  const indexOfFirstProduct = indexOfLastProduct - UsersPerPage;
  const currentUsers = Users.slice(indexOfFirstProduct, indexOfLastProduct);

  // Filter Users by name based on search input
  const filteredUsers = Users.filter((item) =>
    item.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredUsers.length / UsersPerPage);

  return (
    <div className=" p-3" style={{ backgroundColor: "white" }}>
     <UpdateUser show={showUserUpdateModal} user={selectedUser} onHide={()=>setShowUserUpdateModal(false)}/>
      <Heading fontSize={"1.5vw"} text={"Users"} />
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
              <th>Email</th>
              <th>Phone</th>

            </tr>
          </thead>
          <tbody>
            {filteredUsers.slice(indexOfFirstProduct, indexOfLastProduct).map((item, index) => (
              <tr key={index}>
                <td>{timeAgo(item.createdAt)}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Button
                    onClick={() => {
                     setShowUserUpdateModal(true)
                     setSelectedUser(item)
                    }}
                    style={{ backgroundColor: secondaryColor }}
                    className=" border-0 btn btn-sm py-1"
                  >
                    Update
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

export default UserList;
