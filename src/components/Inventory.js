import React, { useState, useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

import InventoryService from "../services/InventoryService";
import Item from "./Item";

const Inventory = () => {

  /* ====== STATES ====== */

  const [inventory, loading, error] = useCollection(InventoryService.getAll());
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [currentItem, setCurrentItem] = useState(null);

  /* ====== HELPERS ====== */

  const refreshList = () => {
    setCurrentItem(null);
    setCurrentIndex(-1);
  };

  const setActiveItem = (item, index) => {
    const { title, description, price } = item.data();
    setCurrentItem({
      id: item.id,
      title,
      description,
      price,
    });
    setCurrentIndex(index);
  };

  return (
    <div className="list row">
      <div className="col-md-6">
        <h4>Inventory</h4>
        {error && <strong>Error: {error}</strong>}
        {loading && <span>Loading...</span>}
        <ul className="list-group">
          {!loading && inventory &&
            inventory.docs.filter(item => !item.data().deleted)
              .map((item, index) => (
                <li
                  className={"list-group-item " + (index === currentIndex ? "active" : "")}
                  onClick={() => setActiveItem(item, index)}
                  key={item.id}
                >
                  {item.data().title}
                </li>
              ))}
        </ul>
      </div>
      <div className="col-md-6">
        {currentItem ? (
          <Item item={currentItem} refreshList={refreshList} />
        ) : (
          <div>
            <br />
            <p>Please click on an Item...</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Inventory;