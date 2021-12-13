import { useReducer, createContext } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const cartItems = [...state.items];
      const productPrice = action.product.price;
      const numberOfItems = action.product.numberOfItems;

      const productIndex = cartItems.findIndex(product => product.ID === action.product.ID);

      alert(productIndex)

      if(productIndex === -1) cartItems.push(action.product);
      else {
        cartItems[productIndex].numberOfItems += action.product.numberOfItems;
      }

      return {
        items: cartItems,
        total: state.total + (productPrice * numberOfItems),
      };
    }
    case 'DELETE_PRODUCT': {
      const cartItems = state.items.filter(
        (product) => product.ID !== action.productIdToRemove
      );
      const productPrice = action.product.price;

      cartItems.push(action.product);
      return {
        items: cartItems,
        total: state.total - productPrice,
      };
    }
    case 'DELETE_ALL': {
      return {
        items: [],
        total: 0,
      };
    }
    case 'INC_PRODUCT_QUANTITY': {
      const cartItems = [...state.items];

      cartItems.forEach((item) => {
        if (item.ID === action.targetProduct) {
          item.quantity += 1;
        }
      });

      return {
        ...state,
        items: cartItems,
      };
    }
    case 'DEC_PRODUCT_QUANTITY': {
      const cartItems = [...state.items];

      cartItems.forEach((item) => {
        if (item.ID === action.targetProduct) {
          item.quantity -= 1;
        }
      });

      return {
        ...state,
        items: cartItems,
      };
    }
  }
};

const CartContextProvider = ({ children }) => {
  const [ cartData, dispatchCart ] = useReducer(cartReducer, {
    items: [],
    total: 0,
  });

  return (
    <CartContext.Provider value={{ cartData, dispatchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
