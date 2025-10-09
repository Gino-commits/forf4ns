import jwt from "jsonwebtoken";
import { config } from "../config.js";

export const sessionVerifier = (req, res, next)=>{
    const token = req.cookies.access_token;

    req.session = { user: null };

    try {
        const data = jwt.verify(token, config.JWT_SECRET_WORD);
        req.session.user = data
    } catch{}

    next()
}