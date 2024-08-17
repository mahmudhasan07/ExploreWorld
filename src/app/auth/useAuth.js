import { CognitoUserPool } from "amazon-cognito-identity-js"


const authData = {
    UserPoolId: process.env.poolID,
    ClientId: process.env.client,
}



export default new CognitoUserPool(authData)