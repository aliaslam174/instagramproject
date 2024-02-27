import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

// login 
export const ascnclogin = createAsyncThunk('loginslice/ascnclogin', async (credentials, { rejectWithValue }) => {

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/login`, credentials)

    return res.data
  } catch (error) {
    console.log(error.message)
    return rejectWithValue(error.response.data)
  }
},
)
// signup 
export const ascncsignup = createAsyncThunk('loginslice/ascncsignup', async (credentials, { rejectWithValue }) => {
  console.log(credentials)

  try {
    const res = await axios.post(`${import.meta.env.VITE_API_SERVER_URL}/user/signup`, credentials)

    return res.data
  } catch (error) {
    console.log(error.message)
    return rejectWithValue(error.response.data)
  }
},
)




export const userauthslice = createSlice({
  name: 'loginslice',
  initialState: {
    loading: false,
    userInfo: null,
    userToken: null,
    loginError: null,
    SignupError: null,
    success: false,
    name: "ALi Aslam",
    islogin: false
  },
  reducers: {
    setLoggedIn : (state) => {
      state.islogin = true;
     },
     setLoggedOut : (state) => {
      state.islogin = false;
     }


  },
  extraReducers: (builder) => {
    // login
    builder.addCase(ascnclogin.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(ascnclogin.fulfilled, (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.userToken = action.payload.token;
      if (action.payload.status == "success") {
        state.userToken = action.payload.token;
        localStorage.setItem("accessToken", action.payload.token)
        state.islogin = true;
      }
    })
    builder.addCase(ascnclogin.rejected, (state, action) => {
      state.loading = false;
      state.loginError = action.payload.message;

      console.log(action.payload)
    })



    // signup
    builder.addCase(ascncsignup.pending, (state, action) => {
      console.log(action.payload)
      state.loading = true;
    })
    builder.addCase(ascncsignup.fulfilled, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      console.log(action.payload);
      state.userToken = action.payload.token;
      if (action.payload.status == "success") {
        state.userToken = action.payload.token;
        state.islogin = true;
      }
    })
    builder.addCase(ascncsignup.rejected, (state, action) => {
      console.log(action.payload)
      state.loading = false;
      state.SignupError = action.payload.message;
    })


  }
})

// Action creators are generated for each case reducer function
export const { setLoggedIn, setLoggedOut } = userauthslice.actions

export default userauthslice.reducer