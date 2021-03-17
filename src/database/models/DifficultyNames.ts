import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface DifficultyNameAttributes {
  id: number;
  name: string;
  abbreviation: string;
}

interface DifficultyNameCreationAttributes extends Optional<DifficultyNameAttributes, "id"> {}

class DifficultyName extends Model<DifficultyNameAttributes, DifficultyNameCreationAttributes> implements DifficultyNameAttributes {
  public id!: number;
  public name!: string;
  public abbreviation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DifficultyName.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    name: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },

    abbreviation: {
      type: new DataTypes.STRING(5),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'difficulty_names',
    sequelize
  }
)

export default DifficultyName;