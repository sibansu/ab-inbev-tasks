import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Tutorial = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(5);

  const [modal, setModal] = useState(false)
  const handleClose = () => setModal(false);
  const handleShow = () => setModal(true);
  const getData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const lastIndex = currentPage * postsPerPage;
  const firstIndex = lastIndex - postsPerPage;
  const currentPosts = data.slice(firstIndex, lastIndex);

  const changePage = (pageNumber) => setCurrentPage(pageNumber);

  const deleteRow = (id) => {
    const newData = data.filter((it) => it.id !== id);
    setData(newData);
  };

  return (
    <div className="container mt-5">
      <h3>TABLE TASK</h3>

      {/* MODAL FUNCTIONALITY */}
      <div className="btn btn-danger" onClick={() => setModal(!modal)}>
        Add row
      </div>
      <Modal show={modal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Row</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="website" className="form-label">
                Website:
              </label>
              <input
                type="text"
                className="form-control"
                id="website"
                name="website"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Add Row
          </Button>
        </Modal.Footer>
      </Modal>

      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>USERNAME</th>
            <th>EMAIL</th>
            <th>WEBSITE</th>
            <th>DELETE ITEM</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((it) => (
            <tr key={it.id}>
              <td>{it.id}</td>
              <td>{it.name}</td>
              <td>{it.username}</td>
              <td>{it.email}</td>
              <td>{it.website}</td>
              <td>
                <i className="fa-solid fa-trash" onClick={() => deleteRow(it.id)} role='button'></i>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination postsPerPage={postsPerPage} totalPosts={data.length} changePage={changePage} />
    </div>
  );
};

export default Tutorial;
