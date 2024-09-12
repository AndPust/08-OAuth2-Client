import React, { useState, useEffect } from "react";
import Store from "./components/store";
import Navbar from "./components/navbar";
import Cart from "./components/cart";
import Payment from "./components/payment";
import useItems from "./itemHook";

const App = () => {
  const [items] = useItems();
  const [renderState, setRenderState] = useState("store");
  const [cart, setCart] = useState([]);
  const [values, setValues] = useState({
      firstName: '',
      lastName: '',
      email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(false);

  const handleFirstNameInputChange = (event) => {
    event.persist();
    setValues((values) => ({
        ...values,
        firstName: event.target.value,
    }));
  };

  const handleLastNameInputChange = (event) => {
  	event.persist();
  	setValues((values) => ({
  		...values,
  		lastName: event.target.value,
  	}));
  };

  const handleEmailInputChange = (event) => {
  	event.persist();
  	setValues((values) => ({
  		...values,
  		email: event.target.value,
  	}));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
    console.log(valid);
    if(values.firstName && values.lastName && values.email) {
      setValid(true);
      const data = values
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", "key": "1" },
        body: JSON.stringify(data)
      };
      fetch("http://localhost:9000/api/payment", requestOptions)
    }
    setSubmitted(true);
  }

  const handleClick = (item) => {
    if (cart.indexOf(item) !== -1) return;
    setCart([...cart, item]);
  };

  const handleChange = (item, d) => {
    const ind = cart.indexOf(item);
    const arr = cart;
    arr[ind].qty += d;

    if (arr[ind].qty === 0) arr[ind].qty = 1;
    setCart([...arr]);
  };

  return (
    <React.Fragment>
      <Navbar setRenderState={setRenderState} size={cart.length} />
      {renderState === "store" && <Store handleClick={handleClick} items={items} />}
      {renderState === "cart" && <Cart cart={cart} setCart={setCart} handleChange={handleChange} setRenderState={setRenderState} />}
      {renderState === "payment" && <Payment values={values} handleFirstNameInputChange={handleFirstNameInputChange} handleLastNameInputChange={handleLastNameInputChange} handleEmailInputChange={handleEmailInputChange} submitted={submitted} handleSubmit={handleSubmit} valid={valid}/> }
    </React.Fragment>
  );
};

export default App;
