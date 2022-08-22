import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  me: {
    email:string,
    name:string,
    accessToken:string
  }
}


const initialState = {
  me: {},
} as UserState;

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

    logoutUser(state){
      // console.log("action.payload :", action.payload);
      state.me = {
        ...state.me,
        email: "",
        name: "",
        accessToken: ""
      }
    }

  },
  extraReducers: builder => { },
});

export default userSlice;