import { useEffect, useState } from "react";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";
import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  function handleSetTheme(nextTheme) {
    setTheme(nextTheme);
  }

  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <Header theme={theme} onSetTheme={handleSetTheme} />
        <Cart />
        <Meals />
        <Checkout />
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
