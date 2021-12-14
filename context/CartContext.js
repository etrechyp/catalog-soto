import { useReducer, createContext } from 'react';

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PRODUCT': {
      const cartItems = [...state.items];
      const productPrice = action.product.price;
      const numberOfItems = action.product.numberOfItems;

      const productIndex = cartItems.findIndex(
        (product) => product.ID === action.product.ID
      );

      if (productIndex === -1) cartItems.push(action.product);
      else {
        cartItems[productIndex].numberOfItems += action.product.numberOfItems;
      }

      return {
        items: cartItems,
        total: state.total + productPrice * numberOfItems,
      };
    }
    case 'DELETE_PRODUCT': {
      const cartItems = state.items.filter(
        (product) => product.ID !== action.product.ID
      );

      action.updatePaginationData(cartItems);
      const productPrice = action.product.price;
      const numberOfItemsInCart = action.product.numberOfItems;
      const totalAmount = productPrice * numberOfItemsInCart;

      return {
        items: cartItems,
        total: state.total - totalAmount,
      };
    }
    case 'DELETE_ALL': {
      action.updatePaginationData([]);

      return {
        items: [],
        total: 0,
      };
    }
    case 'INC_PRODUCT_QUANTITY': {
      const cartItems = [...state.items];
      let total = state.total;

      cartItems.forEach((item) => {
        if (
          item.ID === action.product.ID &&
          item.numberOfItems < item.maxItems
        ) {
          item.numberOfItems += 1;
          total += item.price;
        }
      });

      return {
        items: cartItems,
        total,
      };
    }
    case 'DEC_PRODUCT_QUANTITY': {
      const cartItems = [...state.items];
      let total = state.total;

      cartItems.forEach((item) => {
        if (item.ID === action.product.ID) {
          if (item.numberOfItems > 1) {
            item.numberOfItems -= 1;
            total -= item.price;
          }
        }
      });

      return {
        items: cartItems,
        total,
      };
    }
  }
};

const CartContextProvider = ({ children }) => {
  const [cartData, dispatchCart] = useReducer(cartReducer, {
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
