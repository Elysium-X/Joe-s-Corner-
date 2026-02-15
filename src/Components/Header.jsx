import { useDispatch, useSelector } from "react-redux";
import img from "../assets/logo.jpg";
import Button from "./UI/Button.jsx";
import { showCart } from "../store/userProgressSlice.js";

export default function Header({ theme, onSetTheme }) {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  function handleShowCart() {
    dispatch(showCart());
  }

  const totalCartItems = items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  return (
    <header id="main-header">
      <div id="title">
        <img src={img} alt="Logo" />
        <h1>Joe&apos;s Corner</h1>
      </div>
      <nav>
        <div className="theme-toggle" role="group" aria-label="Theme switcher">
          <button
            type="button"
            className={`theme-icon ${theme === "light" ? "active" : ""}`}
            onClick={() => onSetTheme("light")}
            aria-label="Switch to light mode"
            title="Light mode"
          >
            <span aria-hidden="true">☀️</span>
          </button>
          <button
            type="button"
            className={`theme-icon ${theme === "dark" ? "active" : ""}`}
            onClick={() => onSetTheme("dark")}
            aria-label="Switch to dark mode"
            title="Dark mode"
          >
            <span aria-hidden="true">🌙</span>
          </button>
        </div>
        <Button textOnly onClick={handleShowCart}>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
}
