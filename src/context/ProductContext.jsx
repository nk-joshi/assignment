import React, { createContext, useReducer, useContext } from "react";

const ProductContext = createContext();

const initialState = {
  products: [],
  likedProducts: [],
  dislikedProducts: [],
  cart: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };

    case "LIKE_PRODUCT":
      console.log("Liked Product ID:", action.payload.id);
      return {
        ...state,
        likedProducts: [...state.likedProducts, action.payload],
        products: state.products.slice(1),
      };

    case "DISLIKE_PRODUCT":
      console.log("Passed Product ID:", action.payload.id);
      return {
        ...state,
        dislikedProducts: [...state.dislikedProducts, action.payload],
        products: state.products.slice(1),
      };

    case "ADD_TO_CART":
      console.log("Add to cart Product ID: ", action.payload.id);
      if (state?.cart?.some((p) => p.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        cart: [...state.cart, action.payload],
        products: state.products.slice(1),
      };

    default:
      return state;
  }
}

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);
