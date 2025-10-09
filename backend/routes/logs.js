import path from 'node:path';
import { Router } from "express";
import { userController } from "../controllers/users.js";
import { renderController } from '../controllers/render.js';


export const logsRouter = Router();

logsRouter.post('/register', userController.register);
logsRouter.get('/register', renderController.renderRegistration)
logsRouter.post('/login', userController.login)
logsRouter.get('/login', renderController.renderLogin)
logsRouter.post('/logout', userController.logout)
logsRouter.get('/home', renderController.renderHome)