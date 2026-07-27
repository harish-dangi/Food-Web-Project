import express from 'express'
import {loginUser,registorUser} from '../controllers/user.controller.js'
const Router = express.Router();

Router.post('/register',registorUser)
Router.post('/login',loginUser)



export default Router;