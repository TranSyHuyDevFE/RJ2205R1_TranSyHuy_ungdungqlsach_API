import React, { useState, useEffect } from "react";
import axios from "axios";
import "../components/loading.css";
import { Link, useParams } from "react-router-dom";
export default function AddNewBook() {
  let params = useParams();

  const [id, setId] = useState(0);
  const [item, setItem] = useState({});
  const [mess, setMess] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (Object.keys(params).length) {
      setLoading(true);
      axios
        .get(
          `https://my-json-server.typicode.com/codegym-vn/mock-api-books/books/${params["Id"]}`
        )
        .then((res) => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
          setId(res.data.id);
          setItem(res.data);
        })
        .catch((err) => {
          throw err;
        });
    }
  }, [params]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.title === undefined || item.quantity === undefined) {
      alert("No empty!");
      return true;
    }
    setLoading(true);
    let url =
      "https://my-json-server.typicode.com/codegym-vn/mock-api-books/books";
    let method = "post";
    if (id) {
      url = `${url}/${id}`;
      method = "put";
    }
    axios({ method, url, data: { item } })
      .then((res) => {
        setTimeout(() => {
          setLoading(false);
        }, 500);
        if (res.status === 201) {
          console.log(res.status);
          setMess("Success!");
        }
        if (res.status === 200) {
          console.log(res.status);
          setMess(`Updated!---`);
        }
      })
      .catch((err) => {
        throw err;
      });
  };
  const renderMess = () => {
    if (mess) {
      return (
        <div className="alert alert-success" role="alert">
          {mess}
        </div>
      );
    }
    return;
  };
  const renderLoading = () => {
    return (
      <div
        className="spinner-border text-success position-absolute"
        role="status"
      ></div>
    );
  };
  return (
    <div className="container">
      {loading ? renderLoading() : null}
      {renderMess()}
      <form>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={item.title || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            name="quantity"
            value={item.quantity || ""}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-success"
        >
          {id ? "Save" : "Submit"}
        </button>
      </form>
      <Link to="/">
        <button className="btn btn-warning float-end mt-3">Book Store</button>
      </Link>
    </div>
  );
}
