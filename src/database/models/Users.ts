import { DataTypes, Model, Optional }  from 'sequelize';
import sequelize from '../dbinit';

export interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  display_name: string | null;
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public display_name!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: new DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 20]
      }
    },

    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [6, 255]
      }
    },

    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },

    display_name: {
      type: new DataTypes.STRING(20),
      allowNull: true,
      validate: {
        len: [3, 20]
      }
    }
  }, {
    tableName: 'users',
    sequelize
  }
)

export default User;