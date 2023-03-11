import { Request, Response, NextFunction } from "express";
import userModel from "../models/user.model.js";
import bc from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import ui from 'uniqid';

const login = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const {docente_mail, docente_contrasena} = req.body;
        const _user = await userModel.findOne({where: {docente_mail}});
        if (_user === null) return res.json({ 'error': 2, 'message': 'Correo no registrado' });
        const _password = await bc.compare(docente_contrasena, _user.docente_contrasena);
        if (!_password) return res.json({ 'error': 3, 'message': 'Contraseña incorrecta' });
        else {
            var token = jwt.sign({ id_user: _user.docente_id }, process.env.JWT_SECRET!, { expiresIn :"24h"});
            console.log(token);
            res.cookie("token",token,{
                httpOnly:true,
            })
            return res.status(200).json({ 'error': 0, 'message': "Logeado" });
        }
    } catch (error) {
        console.log((error as Error).message);
        res.status(500).json({ 'error': 1, message: 'Server internal error' });
    }
}
export default {
    login,
}