import { useEffect, useState } from "react";
import Cart from "./Components/Cart.jsx";
import Checkout from "./Components/Checkout.jsx";
import Header from "./Components/Header.jsx";
import Meals from "./Components/Meals.jsx";

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
    <>
      <Header theme={theme} onSetTheme={handleSetTheme} />
      <Cart />
      <Meals />
      <Checkout />
    </>
  );
}

export default App;
