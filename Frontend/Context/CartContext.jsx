import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "HYDRATE_CART": {
      return Array.isArray(action.payload) ? action.payload : [];
    }
    case "ADD_ITEMS": {
      const { _id, item, quantity } = action.payload;
      // console.log("action.payload:",action.payload)
      const exists = state.find((ci) => {
        return ci._id === _id;
      });
      if (exists) {
        return state.map((ci) => (ci._id === _id ? { ...ci, quantity } : ci));
      }
      return [...state, { _id, item, quantity }];
    }
    case "REMOVE_ITEM": {
      return state.filter((ci) => ci._id !== action.payload);
    }
    case "UPDATE_QUANTITY": {
      const { _id, quantity } = action.payload;

      return state.map((ci) => {
        if (ci._id === _id) {
          return { ...ci, quantity: quantity };
        }
        return ci;
      });
    }
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};
//INITAILISE CART FROM LOCALSTORAGE

const initializer = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, [], initializer);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  //HYDRATE_CART from api
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    axios
      .get("http://localhost:4000/api/cart", {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // console.log("GET /api/cart response:", res.data);
        dispatch({
          type: "HYDRATE_CART",
          payload: res.data.map((c) => ({
            _id: c._id, // Cart ID
            item: c.item, // Product object
            quantity: c.quantity,
          })),
        });
      })
      .catch((err) => {
        if (err.response?.status !== 401) console.error(err);
      });
  }, []);
  //DISPATCHER WRAPPED WITH useCALLBACK FOR PERFORMANCE
  const addToCart = useCallback(async (item, quantity) => {
    const token = localStorage.getItem("authToken");
    try {
      const res = await axios.post(
        "http://localhost:4000/api/cart",
        { itemId: item._id, quantity },
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      dispatch({
        type: "ADD_ITEMS",
        payload: res.data,
      });
    } catch (err) {
      console.log(err.response?.data);
    }
  }, []);

  const removeFromCart = useCallback(async (_id) => {
    const token = localStorage.getItem("authToken");
    await axios.delete(`http://localhost:4000/api/cart/${_id}`, {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  }, []);

  const clearCart = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    await axios.post(
      "http://localhost:4000/api/cart/clear",
      {},
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({ type: "CLEAR_CART" });
  }, []);
  const updateQuantity = useCallback(async (_id, quantity) => {
    const token = localStorage.getItem("authToken");
    await axios.put(
      `http://localhost:4000/api/cart/${_id}`,
      { quantity },
      { withCredentials: true, headers: { Authorization: `Bearer ${token}` } },
    );
    dispatch({ type: "UPDATE_QUANTITY", payload: { _id, quantity } });
  }, []);
  const totalItems = (Array.isArray(cartItems) ? cartItems : []).reduce(
    (sum, ci) => sum + ci.quantity,
    0,
  );

  // console.log("totalAmount")
  const totalAmount = cartItems.reduce((sum, ci) => {
    return sum + ci.item.price * ci.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        clearCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export const useCart = () => useContext(CartContext);
