import { ADD_TO_CART } from "../actions/cart";
import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        // Item already in cart, increase quantity and total cart price
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice // Current product sum + one more productPrice
        );
      } else {
        // Item not in cart, add new item and increase total cart price
        updatedOrNewCartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }

      return {
        ...state, // Unnecessary unless initialState has data that doesn't change
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice
      };
    }
  return state;
};
