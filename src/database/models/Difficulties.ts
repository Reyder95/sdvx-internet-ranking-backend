import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface DifficultyAttributes {
  id: number;
  level: number;
}

interface DifficultyCreationAttributes extends Optional<DifficultyAttributes, "id"> {}

class Difficulty extends Model<DifficultyAttributes, DifficultyCreationAttributes> implements DifficultyAttributes {
  public id!: number;
  public level!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Difficulty.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    level: {
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        min: 0,
        max: 20
      }
    }
  }, {
    tableName: 'difficulties',
    sequelize
  }
)

export default Difficulty;