import React, { createContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cart: [],
  totalAmount: 0,
  totalItems: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItemIndex = state.cart.findIndex(item => item.id === action.payload.id);
      let updatedCart;
      if (existingItemIndex >= 0) {
        updatedCart = state.cart.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }
      return {
        ...state,
        cart: updatedCart,
        totalAmount: updatedCart.reduce((total, item) => total + item.price * item.quantity, 0),
        totalItems: updatedCart.reduce((total, item) => total + item.quantity, 0),
      };

    case "REMOVE_ITEM":
      const filteredCart = state.cart.filter(item => item.id !== action.payload);
      return {
        ...state,
        cart: filteredCart,
        totalAmount: filteredCart.reduce((total, item) => total + item.price * item.quantity, 0),
        totalItems: filteredCart.reduce((total, item) => total + item.quantity, 0),
      };

    case "INCREASE_QUANTITY":
      const increasedCart = state.cart.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );
      return {
        ...state,
        cart: increasedCart,
        totalAmount: increasedCart.reduce((total, item) => total + item.price * item.quantity, 0),
        totalItems: increasedCart.reduce((total, item) => total + item.quantity, 0),
      };

    case "DECREASE_QUANTITY":
      const decreasedCart = state.cart.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return {
        ...state,
        cart: decreasedCart,
        totalAmount: decreasedCart.reduce((total, item) => total + item.price * item.quantity, 0),
        totalItems: decreasedCart.reduce((total, item) => total + item.quantity, 0),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = item => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = id => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const increaseQuantity = id => {
    dispatch({ type: "INCREASE_QUANTITY", payload: id });
  };

  const decreaseQuantity = id => {
    dispatch({ type: "DECREASE_QUANTITY", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

