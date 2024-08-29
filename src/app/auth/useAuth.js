import { CognitoUserPool } from "amazon-cognito-identity-js"


const authData = {
    UserPoolId: process.env.NEXT_PUBLIC_Pool_ID,
    ClientId: process.env.NEXT_PUBLIC_Client,
}


export default new CognitoUserPool(authData)