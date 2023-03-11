import cors from 'cors';//permisos de confiabilidad 
import dotenv from 'dotenv';//manejador de archivos 
dotenv.config();

import express from 'express';
import morgan from 'morgan';
import userRouter from './router/user.router.js';
var cookieParser = require ('cookie-parser');

class Server{

    private app: express.Express
    
    constructor(){
        this.app = express();
        this.config();
        this.routes();
        this.start();
    }

    private config(){
        this.app.use(cors({
            origin: process.env.CLIENT_HOST! || '*',
            credentials: true
        }));
        this.app.use(express.json());
        this.app.use(cookieParser());
        this.app.use(morgan('dev'));
        this.app.use(cookieParser());
    }

    private routes(){
        this.app.use(userRouter.router);
    }

    private start(){
        this.app.listen(parseInt(process.env.API_PORT!), process.env.API_HOST!, ()=>{
            console.log(`Listen on http://${process.env.API_HOST}:${process.env.API_PORT}/`);
        });
    }
}

new Server();