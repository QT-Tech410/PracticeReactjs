import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../service/UserService";
import ReactPaginate from "react-paginate";

const TableUsers = (props) => {
  const [listUsers, setListUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = 4;
  const pageCount = Math.ceil(listUsers.length / itemsPerPage);

  useEffect(() => {
    // call apis
    getUsers(0);
  }, []);

  const getUsers = async (page) => {
    let res = await fetchAllUsers(page);
    if (res) {
      setListUsers(res);
      const offset = page * itemsPerPage;
      const pagedUsers = res.slice(offset, offset + itemsPerPage);
      setCurrentUsers(pagedUsers);
      setCurrentPage(page);
    }
  };

  const handlePageClick = (event) => {
    getUsers(event.selected);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>UserName</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers &&
            currentUsers.length > 0 &&
            currentUsers.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.name}</td>
                  <td>{item.username}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item "
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        forcePage={currentPage}
      />
    </>
  );
};

export default TableUsers;
