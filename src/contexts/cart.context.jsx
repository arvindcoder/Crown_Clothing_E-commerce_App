import { createContext, useState, useEffect } from "react";
const addCartItem = (cartItems, productToAdd) => {

  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
 const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );


if (existingCartItem.quantity ===1){
  return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
}


return cartItems.map((cartItem) =>
      cartItem.id === cartItemToRemove.id
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );

}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
const newCartCount = cartItems.reduce((total, cartItem)=>total + cartItem.quantity, 0)
setCartCount(newCartCount);
  }, [cartItems])

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemToCart = (cartItemToRemove) => {
    setCartItems(removeCartItem (cartItems, cartItemToRemove));
  };

  const value = { isCartOpen, setIsCartOpen, addItemToCart, removeItemToCart,  cartItems, cartCount, removeCartItem };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
//---------------------------
// import React, { createContext, useState, useContext } from "react";

// // Create a context for the cart
// export const CartContext = createContext();

// // Custom hook to easily access the cart context
// export function useCart() {
//   return useContext(CartContext);
// }

// export const CartProvider = ({ children }) => {
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [cartItems, setCartItems] = useState([]);

//   // Function to add an item to the cart
//   const addItemToCart = (productToAdd) => {
//     setCartItems((prevCartItems) => [...prevCartItems, productToAdd]);
//   };

//   // Function to remove an item from the cart
//   const removeItemFromCart = (productIdToRemove) => {
//     setCartItems((prevCartItems) =>
//       prevCartItems.filter((item) => item.id !== productIdToRemove)
//     );
//   };

//   // Function to clear the cart
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // Calculate the total number of items in the cart
//   const cartItemCount = cartItems.length;

//   // Calculate the total cost of items in the cart
//   const cartTotal = cartItems.reduce(
//     (total, item) => total + item.price,
//     0
//   );

//   const value = {
//     isCartOpen,
//     setIsCartOpen,
//     cartItems,
//     addItemToCart,
//     removeItemFromCart,
//     clearCart,
//     cartItemCount,
//     cartTotal,
//   };

//   return (
//     <CartContext.Provider value={value}>
//       {children}
//     </CartContext.Provider>
//   );
// };
