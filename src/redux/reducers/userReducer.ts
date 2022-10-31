import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  userInfo: {},
  error: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;
