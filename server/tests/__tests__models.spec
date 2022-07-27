const mongoose=require('mongoose')
const user=require('')

import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";

const client = jwksClient({

    jwksUri: "https://MYAUTH0APP.auth0.com/.well-known/jwks.json",

});

export const verifyAuth0Token = async token => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, getKey, {algorithms:["RS256"]}, (err, dec))
    })
}