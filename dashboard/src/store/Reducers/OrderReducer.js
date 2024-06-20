import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'

export const getAdminOrders = createAsyncThunk(
  'order/getAdminOrders',
  async ({ parPage, page, searchValue }, {rejectWithValue, fulfillWithValue}) => {
      try{
          const {data} = await api.get(`/admin/orders?page=${page}&searchValue=${searchValue}&parPage=${parPage}`, {
              withCredentials: true
          })
          return fulfillWithValue(data)
      } catch (error){
          return rejectWithValue(error.response.data)
      }
  }
)



export const OrderReducer = createSlice({
  name: 'order',

  initialState: {
    successMessage: '',
    errorMessage: '',
    totalOrder : 0,
    order : {},
    myOrders : []
  },

  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = ""
      state.successMessage = ""
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getAdminOrders.fulfilled, (state, {payLoad})=>{
        state.myOrders = payLoad.orders
        state.totalOrder = payLoad.totalOrder
    });
  }
})

export const {messageClear} = OrderReducer.actions
export default OrderReducer.reducer