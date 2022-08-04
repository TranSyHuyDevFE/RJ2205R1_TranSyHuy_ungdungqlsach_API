import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function BookList() {
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(true);
  const [books, setBooks] = useState([]);
  let url =
    "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${url}`)
      .then((res) => {
        setBooks(res.data);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setLoading(false));
  }, [url]);
  const deleteBook = (id) => {
    setLoadingDelete(false);
    axios
      .delete(`${url}/${id}`)
      .then((res) => {
        console.log(res.status);
        const newBooks = books.filter((item) => item.id !== id);
        setBooks(newBooks);
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => setLoadingDelete(true));
  };
  const RenderListBook = () => {
    return books.map((item) => {
      return (
        <tr key={item.id}>
          <td>{item.title}</td>
          <td>{item.quantity}</td>
          <td>
            <Link className="btn btn-primary m-1" to={`/edit-book/${item.id}`}>
              Edit
            </Link>
            <button
              className="btn btn-danger"
              onClick={() => {
                deleteBook(item.id);
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };
  const renderLoading = () => {
    return (
      <div
        className="spinner-border text-success position-absolute top-50 start-50"
        role="status"
      />
    );
  };

  return (
    <>
      <Link to="/add-new">
        <button className="btn btn-success float-end mt-3">Add New</button>
      </Link>
      {loading ? (
        renderLoading()
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-info ">
            <tr>
              <th>Title</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{RenderListBook()}</tbody>
        </table>
      )}
      {loadingDelete ? null : renderLoading()}
    </>
  );
}
