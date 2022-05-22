import { Route, Routes, Link } from "react-router-dom";

import AddItem from "./components/AddItem";
import Inventory from "./components/Inventory";
import Trash from "./components/Trash";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/inventory" className="navbar-brand">
          Arian Omidi
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/inventory"} className="nav-link">
              Inventory
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/trash"} className="nav-link">
              Trash
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <h2>Shopify Developer Challenge F22</h2>
        <Routes>
          <Route exact path="/" element={<Inventory />} />
          <Route exact path="/inventory" element={<Inventory />} />
          <Route exact path="/add" element={<AddItem />} />
          <Route exact path="/trash" element={<Trash />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
