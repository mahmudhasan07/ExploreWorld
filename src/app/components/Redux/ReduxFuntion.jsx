'use client'
import useAuth from '@/app/auth/useAuth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'



const initialState = {
  name: '',
  email: "",
  error: "",
  success: ""
}

const CreateUser = createAsyncThunk(
  "auth/createUser",
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
  "auth/LoginUser",
  async ({email, password}) => {
    console.log(email,password);
    
    const User = new CognitoUser({
      Pool: useAuth,
      Username: email
    })
    const getUser = new AuthenticationDetails({
      Username: email,
      Password: password
    })

     User.authenticateUser(getUser, ({
      onSuccess: (res) => {
        console.log(res);
        return res
      },
      onFailure: (err) => {
        console.log(err);
        
        return err
      }
    }))
  }
)

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValue: (state) => {
        state.error = "",
            state.success = ""
    }

},
  extraReducers: (builder) => {
    builder.addCase(LogInUser.fulfilled, (sate, payload)=>{
        sate.success = "success"
      })
  }
})



// Action creators are generated for each case reducer function
// export const { LogInUser } = counterSlice.actions
export const { setValue } = counterSlice.actions
export {LogInUser, CreateUser}

export default counterSlice.reducer