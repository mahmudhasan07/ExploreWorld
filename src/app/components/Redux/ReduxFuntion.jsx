import useAuth from '@/app/auth/useAuth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'

const initialState = {
  value: 0,
}


const CreateUser = createAsyncThunk(
  "createUser",
  async (email, password, Attributes) => {
    useAuth.signUp(email, password, Attributes, null, (err, res) => {
      if (err) {
        return err
      }
      return res
      
    })
  }
)


const LogInUser = createAsyncThunk(
  "LoginUser",
  async (email, password) => {
    const User = new CognitoUser({
      Pool: useAuth,
      Username: email
    })
    const getUser = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    User.confirmRegistration()

    User.authenticateUser(getUser, ({
      onSuccess: (res) => {
        return res
      },
      onFailure: (err) => {
        return err
      }
    }))
  }
)

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase()
  }
})


// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer