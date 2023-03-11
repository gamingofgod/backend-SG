"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_js_1 = __importDefault(require("../database/database.js"));
exports.default = database_js_1.default.define('docentes', {
    docente_id: {
        primaryKey: true,
        type: sequelize_1.DataTypes.NUMBER
    },
    docente_nombre: sequelize_1.DataTypes.STRING,
    docente_mail: sequelize_1.DataTypes.STRING,
    docente_contrasena: sequelize_1.DataTypes.STRING,
}, {
    freezeTableName: true,
    timestamps: false
});
