import React, { useState, useEffect } from "react";
import InventoryService from "../services/InventoryService";

const TrashItem = (props) => {

  const { item } = props;
  const initialItemState = {
    id: null,
    title: "",
    description: "",
    price: 0,
  };

  /* ====== STATES ====== */

  const [currentItem, setCurrentItem] = useState(initialItemState);
  const [message, setMessage] = useState("");

  if (!currentItem || currentItem?.id !== item.id) {
    setCurrentItem(item);
    setMessage("");
  }

  /* ====== HELPERS ====== */

  const restoreItem = () => {
    InventoryService.restore(currentItem.id)
      .then(() => {
        props.refreshList();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const deleteItem = () => {
    InventoryService.remove(currentItem.id)
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
          {currentItem && (
            <div>

              <p>Title: {currentItem.title}</p>
              <p>Description: {currentItem.description}</p>
              <p>Price: ${currentItem.price}</p>
              <p>Deletion Comment: {currentItem.deletionComment}</p>
            </div>
          )}

          <button className="badge bg-danger mr-2" onClick={deleteItem}>
            Delete
          </button>
          <button
            type="submit"
            className="badge bg-success"
            onClick={restoreItem}
          >
            Restore
          </button>
          <p>{message}</p>
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
export default TrashItem;