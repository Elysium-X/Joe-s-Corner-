import { useDispatch, useSelector } from "react-redux";
import Modal from "./UI/Modal.jsx";
import Button from "./UI/Button.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartItem from "./CartItem.jsx";
import { addItem, removeItem } from "../store/cartSlice.js";
import { hideCart, showCheckout } from "../store/userProgressSlice.js";

export default function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const progress = useSelector((state) => state.userProgress.progress);

  const cartTotal = items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0,
  );

  function handleCloseCart() {
    dispatch(hideCart());
  }

  function handleGoToCheckout() {
    dispatch(showCheckout());
  }

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => dispatch(removeItem(item.id))}
            onIncrease={() => dispatch(addItem(item))}
          />
        ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
