import React, { useState, useEffect } from "react";
import InventoryService from "../services/InventoryService";

const Item = (props) => {

  const { item } = props;
  const initialItemState = {
    id: null,
    title: "",
    description: "",
    price: 0,
    comment: "",
  };

  /* ====== STATES ====== */

  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [message, setMessage] = useState("");

  if (!currentItem || currentItem?.id !== item.id) {
    setCurrentItem(item);
    setMessage("");
  }

  /* ====== HELPERS ====== */

  const updateItem = () => {
    const data = {
      title: currentItem.title,
      description: currentItem.description,
      price: currentItem.price,
    };
    InventoryService.update(currentItem.id, data)
      .then(() => {
        setMessage("The item was updated successfully!");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const trashItem = () => {
    InventoryService.trash(currentItem.id, currentItem.comment)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /* ====== HANDLE EVENTS ====== */

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCurrentItem({ ...currentItem, [name]: value });
  };

  /* ========================== */

  return (
    <div>
      {currentItem ? (
        <div className="edit-form">
          <h4>Item</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={currentItem.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={currentItem.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                className="form-control"
                id="price"
                name="price"
                value={currentItem.price}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button
            type="submit"
            className="badge bg-success"
            onClick={updateItem}
          >
            Update
          </button>
          <p>{message}</p>

          <form>
            <div className="form-group">
              <label htmlFor="comment">Deletion Comment</label>
              <input
                type="text"
                className="form-control"
                id="comment"
                name="comment"
                value={currentItem.comment}
                onChange={handleInputChange}
              />
            </div>
          </form>
          <button className="badge bg-danger mr-2" onClick={trashItem}>
            Trash
          </button>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a item...</p>
        </div>
      )}
    </div>
  );
};
export default Item;