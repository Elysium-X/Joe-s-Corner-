import { useActionState, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/Input.jsx";
import Button from "./UI/Button.jsx";
import Error from "./Error.jsx";
import { clearCart } from "../store/cartSlice.js";
import { hideCheckout } from "../store/userProgressSlice.js";

const ORDERS_STORAGE_KEY = "cv_food_orders";

function readStoredOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStoredOrders(orders) {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export default function Checkout() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const progress = useSelector((state) => state.userProgress.progress);

  const [data, setData] = useState();
  const [error, setError] = useState();

  const cartTotal = cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  async function checkOutAction(prevState, fd) {
    const userData = Object.fromEntries(fd.entries());

    setError(undefined);
    try {
      const newOrder = {
        items: cartItems,
        customer: userData,
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      };
      const existingOrders = readStoredOrders();
      existingOrders.push(newOrder);
      writeStoredOrders(existingOrders);
      setData({ message: "Order created!" });
    } catch (err) {
      setError(err?.message || "Something went wrong");
    }
    return { message: "Order created!" };
  }

  function handleFinish() {
    dispatch(hideCheckout());
    dispatch(clearCart());
    setData(undefined);
  }

  function handleCloseCheckout() {
    dispatch(hideCheckout());
  }

  const [, formAction, isPending] = useActionState(
    checkOutAction,
    null
  );

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleCloseCheckout}>
        Close
      </Button>
      <Button>Confirm</Button>
    </>
  );
  if (isPending) {
    actions = <span> Sending order data...</span>;
  }
  if (data && !error) {
    return (
      <Modal
        open={progress === "checkout"}
        onClose={handleFinish}
      >
        <h2>Success!</h2>
        <p>Your order has been placed successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal
      open={progress === "checkout"}
      onClose={handleCloseCheckout}
    >
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)} </p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-mail Address" type="email" id="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>

        {error && <Error title="Failed to send order" message={error} />}

        <p className="modal-actions"> {actions} </p>
      </form>
    </Modal>
  );
}
