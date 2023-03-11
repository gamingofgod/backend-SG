import {Model, DataTypes, BuildOptions} from 'sequelize';
import db from '../database/database.js';
import IUser from '../interfaces/IUser.js';

interface UserInstance extends Model<IUser>, IUser {}
type UserModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserInstance;
};

export default db.define('docentes', {
    docente_id: {
      primaryKey: true,
      type: DataTypes.NUMBER},
      docente_nombre: DataTypes.STRING,
      docente_mail: DataTypes.STRING,
      docente_contrasena: DataTypes.STRING,
}, {
    freezeTableName: true,
    timestamps: false
}) as UserModelStatic;