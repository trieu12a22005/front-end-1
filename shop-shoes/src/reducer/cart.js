const cartReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_CART":
      return [
        ...state,
        {
          id: action.id,
          info: action.info,
          quantity: action.quantity > 0 ? action.quantity : 1, // Đảm bảo số lượng hợp lệ
        },
      ];

    case "UPDATE_QUANTITY": {
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case "PLUS_QUANTITY": {
      return state.map((item) =>
        item.id === action.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case "EXCEPT_QUANTITY": {
      return state.map((item) =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }

    case "DELETE_ITEM": {
      return state.filter((item) => item.id !== action.id);
    }

    case "DELETE_ALL":
      return [];

    default:
      return state;
  }
};

export default cartReducer;
