import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface ScoreAttributes {
  id: number;
  score: number;
}

interface ScoreCreationAttributes extends Optional<ScoreAttributes, "id"> {}

class Score extends Model<ScoreAttributes, ScoreCreationAttributes> implements ScoreAttributes {
  public id!: number;
  public score!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Score.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    score: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      validate: {
        max: 1000000
      }
    }
  }, {
    tableName: 'scores',
    sequelize
  }
)

export default Score;