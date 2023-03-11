import { Router } from "express";
import authController from '../controllers/auth.controller.js';
class UserRouter {

    router:Router;

    constructor(){
        this.router = Router();
        this.config();
        
    }

    private config(){
        this.router.route('/auth/login').post(authController.login);
    }
}

export default new UserRouter();