'use client'
import useAuth from '@/app/auth/useAuth'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js'



const initialState = {
  name: '',
  email: "",
  error: "",
  complete: "",
  pending: ""
}

const CreateUser = createAsyncThunk(
  "auth/createUser",
  async ({email, password, Attributes}) => {
    useAuth.signUp(email, password, Attributes, null, (err, res) => {
      if (err) {
        return err
      }
      console.log(res);

      return res

    })
  }
)


const LogInUser = createAsyncThunk(
  "auth/LoginUser",
  async ({ email, password }) => {
    console.log(email, password);

    const User = new CognitoUser({
      Pool: useAuth,
      Username: email
    })
    const getUser = new AuthenticationDetails({
      Username: email,
      Password: password
    })

    // User.authenticateUser(getUser, ({
    //   onSuccess: (res) => {
    //     console.log(res);
    //     return res
    //   },
    //   onFailure: (err) => {
    //     console.log(err);
    //     return err
    //   }
    // }))

    return await new Promise((resolve, reject) => {
      User.authenticateUser(getUser, ({
        onSuccess: (res) => {
          console.log(res);
          resolve(res)
        },
        onFailure: (err) => {
          console.log(err);
          reject(err)
        }
      }))
    })
  }
)

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setValue: (state) => {
      state.error = "",
        state.complete = ""
      state.pending = ""
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(LogInUser.pending, (sate, actions) => {
        sate.pending = "pending"
      })
      .addCase(LogInUser.fulfilled, (sate, actions) => {
        sate.complete = "success"
      })
      .addCase(LogInUser.rejected, (sate, actions) => {
        sate.error = "reject"
      })
      .addCase(CreateUser.pending, (sate, actions) => {
        sate.pending = "pending"
      })
      .addCase(CreateUser.fulfilled, (sate, actions) => {
        sate.complete = "success"
      })
      .addCase(CreateUser.rejected, (sate, actions) => {
        sate.error = "reject"
      })
  }
})

export const { setValue } = counterSlice.actions
export { LogInUser, CreateUser }

export default counterSlice.reducer