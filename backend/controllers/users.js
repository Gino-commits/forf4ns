import { userModel } from "../models/mysql/user.js";
import { validateUser } from "../schemes/user.js";
import { validateLogin } from "../schemes/login.js";
import { config } from "../config.js";
import jwt from "jsonwebtoken";

export class userController {

    static async login(req, res){
        const result = validateLogin(req.body)
        if(!result.success){
            return res.status(400).json({ message: result.error.errors[0].message })
        } 

        const { userName, password } = result.data
        const validLog = await userModel.validateLogin({ userName, password })
        if(!validLog){
            return res.status(401).json({ message: 'Login failed. Please check your credentials.' })
        }

        let { usertype } = await userModel.getUsertype({ userName })

        const token = jwt.sign({ userName, usertype }, config.JWT_SECRET_WORD, {
            expiresIn: '1h'
        })
        return res.status(200).cookie('access_token', token,{
            httpOnly: true,
            sameSite: 'strict', // lax
            maxAge: 1000 * 60 * 15
            // secure (solo https)
        }).json({ message: 'Login successful' });
    }

    static async logout(req, res){
        res.status(200).clearCookie('access_token').json({ message: 'Logout succesful' })
    }
        
    static async register(req,res){
        const result = validateUser(req.body)
        if(!result.success){
            return res.status(400).json({ message: result.error.errors[0].message })
        }
        const { userName, password, usertype } = result.data
        const newUserRegistered = await userModel.register({ userName, password, usertype })
        if(!newUserRegistered){
            return res.status(409).json({ message: `Username ${userName} already exists`})
        }
        return res.status(201).json({ message: 'Succesful registration' })
    }
}