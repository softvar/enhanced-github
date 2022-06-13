import { createSlice } from '@reduxjs/toolkit';

const initialState = { username: 'JeffreyLWood', photoUrl: 'https://google.com/image' };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
});

export default userSlice.reducer;
