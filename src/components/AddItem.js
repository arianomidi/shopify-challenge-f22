import React, { useState } from "react";
import InventoryService from "../services/InventoryService";

const AddItem = () => {

  const initialItemState = {
    title: "",
    description: "",
    price: 0
  };

  /* ====== STATES ====== */

  const [item, setItem] = useState(initialItemState);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  /* ====== HELPERS ====== */

  const saveItem = () => {
    if (!item.title) {
      return setError("Enter a title!");
    } else if (!item.description) {
      return setError("Enter a description!");
    } else if (item.price < 0) {
      return setError("Enter a valid price!");
    }

    var data = {
      title: item.title,
      price: item.price,
      description: item.description,
      deleted: false
    };
    InventoryService.create(data)
      .then(() => {
        setSubmitted(true);
        setError("");
      })
      .catch(e => {
        console.log(e);
      });
  };

  const newItem = () => {
    setItem(initialItemState);
    setSubmitted(false);
  };

  /* ====== HANDLE EVENTS ====== */

  const handleInputChange = event => {
    const { name, value } = event.target;
    setItem({ ...item, [name]: value });
  };

  /* =================== */

  return (
    <div className="submit-form">
      {submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newItem}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={item.title}
              onChange={handleInputChange}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={item.description}
              onChange={handleInputChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (CAD)</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={item.price}
              onChange={handleInputChange}
              name="price"
            />
          </div>
          <button onClick={saveItem} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
      <div>
        <h5 className="text-danger">{error}</h5>
      </div>
    </div>
  );
};
export default AddItem;