"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_js_1 = __importDefault(require("../models/user.model.js"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { docente_mail, docente_contrasena } = req.body;
        const _user = yield user_model_js_1.default.findOne({ where: { docente_mail } });
        if (_user === null)
            return res.json({ 'error': 2, 'message': 'Correo no registrado' });
        const _password = yield bcrypt_1.default.compare(docente_contrasena, _user.docente_contrasena);
        if (!_password)
            return res.json({ 'error': 3, 'message': 'Contraseña incorrecta' });
        else {
            var token = jsonwebtoken_1.default.sign({ id_user: _user.docente_id }, process.env.JWT_SECRET, { expiresIn: "24h" });
            console.log(token);
            res.cookie("token", token, {
                httpOnly: true,
            });
            return res.status(200).json({ 'error': 0, 'message': "Logeado" });
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ 'error': 1, message: 'Server internal error' });
    }
});
exports.default = {
    login,
};
