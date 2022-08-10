import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  me: {},
  ip:{}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log("action.payload :", action.payload);
      state.me = {
        ...state.me,
        email: action.payload.email,
        name: action.payload.name,
        accessToken: action.payload.accessToken
      }

    },
  },
  extraReducers: builder => { },
});

export default userSlice;