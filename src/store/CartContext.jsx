import { createContext, useReducer } from "react";

const CartContext = createContext({
  items: [],
  addItem: (productToAdd) => {},
  removeItem: (productId) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (cartItem) => cartItem.id === action.product.id,
    );

    const updatedItems = [...state.items];

    if (existingCartItemIndex > -1) {
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.product, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (cartItem) => cartItem.id === action.productId,
    );

    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "CLEAR_CART") {
    return { ...state, items: [] };
  }

  return state;
}

export function CartContextProvider({ children }) {
  const initialCartState = { items: [] };
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    initialCartState,
  );

  function addItemToCart(productToAdd) {
    dispatchCartAction({ type: "ADD_ITEM", product: productToAdd });
  }

  function removeItemFromCart(productId) {
    dispatchCartAction({ type: "REMOVE_ITEM", productId });
  }

  function clearCartHandler() {
    dispatchCartAction({ type: "CLEAR_CART" });
  }

  const contextValue = {
    items: cartState.items,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartContext;
