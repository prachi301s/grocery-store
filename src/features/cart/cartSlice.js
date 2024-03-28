import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
const initialState = {
  isSuccess: false,
  isError: false,
  isLoading: false,
  Carts: [],
};
const user = JSON.parse(localStorage.getItem("user"));
console.log(user.accessToken);
const Api_URL = import.meta.env.VITE_REACT_USER_URL;
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({  productId, quantity }, thunkAPI) => {
    const cartProduct = {
      productId: productId,
      quantity: quantity,
    };
    console.log(cartProduct);
    try {
      console.log(`Bearer ${user.accessToken}`);
      const response = await axios.post(Api_URL + "card", cartProduct, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log("Cart", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const getToCart = createAsyncThunk(
  "cart/getToCart",
  async (thunkAPI) => {
    try {
      // console.log( Api_URL + "card")
      const response = await axios.get(Api_URL + "card", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log("getCart", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const removeToCart = createAsyncThunk(
  "cart/removeToCart",
  async (cItem, thunkAPI) => {
    try {
      console.log(cItem);
      const response = await axios.delete(`${Api_URL}card/${cItem.id}`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      console.log("getCart", response.data);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
export const updateToCart = createAsyncThunk(
  "cart/updateToCart",
  async ({ cItem, type }) => {
    // const state = getState();

    const qty = cItem?.quantity;
    // console.log("cc", state);
    console.log("cc", cItem);
    console.log("c1c", qty);
    // console.log(type);
  // {  if (type === "increase") {
  //     cItem.quantity += 1;
  //     console.log("c1c", qty);
  //     console.log(cItem?.quantity);
  //   } else {
  //     cItem.quantity -= 1;
  //     console.log(cItem?.quantity);
  //   }}

    console.log(cItem.quantity);
    try {
      const response = await axios.patch(
        `${Api_URL}card/${cItem.id}`,
        { quantity: qty },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log("getCart", response.data);
      return response.data;
    } catch (err) {
      return err.response.data;
    }
  }
);
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    decreaseCartQuantity(state, action) {
      const itemIndex = state.Carts.card.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      if (state.Carts.card[itemIndex].quantity > 1) {
        state.Carts.card[itemIndex].quantity -= 1;
      } else if (state.Carts.card[itemIndex].quantity === 1) {
        const inCartItems = state.Carts.card.filter(
          (cartItem) => cartItem.id !== action.payload
        );
        state.Carts.card = inCartItems;
        toast.error(`${action.payload.name} is removed from the cart!`, {
          position: "bottom-left",
          transition: "bounce",
          autoClose: 3000,
        });
      }
    },
    increaseCartQuantity(state, action) {
      const itemIndex = state.Carts.card.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      state.Carts.card[itemIndex].quantity += 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // state.Carts = action.payload;
      console.log(action.payload);
    });
    builder.addCase(addToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(getToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.Carts = action.payload;
      console.log(action.payload);
    });
    builder.addCase(getToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(removeToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(removeToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.Carts.card = state.Carts.card.filter(
        (item) => item.id !== action.payload.id
      );
      toast.error(`${action.payload.message}`, {
        position: "bottom-left",
        transition: "bounce",
        autoClose: 3000,
      });
      // state.Carts = removeItem
      console.log(action.payload);
    });
    builder.addCase(removeToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
    builder.addCase(updateToCart.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateToCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      // state.Carts = action.payload;
      console.log(state.Carts.card);
    });
    builder.addCase(updateToCart.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export const { RemoveToCart, increaseCartQuantity, decreaseCartQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;

//CartSlice.js
