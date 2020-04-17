import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
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

    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.productId]
      const currentQuantity = selectedCartItem.quantity;

      let updatedCartItems;

      if (currentQuantity > 1) {
        // Reduce item quantity if more than 1
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );

        // Replace selected cart item in state with updated cart item
        // Cart items are stored in state with their id as the key
        updatedCartItems = { ...state.items, [action.productId]: updatedCartItem };
      } else {
        // Remove item from cart
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.productId];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };

    case ADD_ORDER:
      return initialState;
    }

  return state;
};
