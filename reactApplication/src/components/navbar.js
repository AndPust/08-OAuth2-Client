import React from "react";
import "../styles/navbar.css";

const Navbar = ({ setRenderState, size }) => {
  return (
    <nav>
      <div className="nav_box">
        <span className="my_shop" onClick={() => setRenderState("store")}>
          Periodic deals
        </span>
        <div className="cart" onClick={() => setRenderState("cart")}>
          <span>
            <i className="fas fa-cart-plus"></i>
          </span>
          <span>{size}</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
