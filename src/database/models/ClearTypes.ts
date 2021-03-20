import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface ClearTypeAttributes {
  id: number;
  type: string;
  abbreviation: string;
}

interface ClearTypeCreationAttributes extends Optional<ClearTypeAttributes, "id"> {}

class ClearType extends Model<ClearTypeAttributes, ClearTypeCreationAttributes> implements ClearTypeAttributes {
  public id!: number;
  public type!: string;
  public abbreviation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ClearType.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    type: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },

    abbreviation: {
      type: new DataTypes.STRING(5),
      allowNull: true,
      unique: true
    }
  }, {
    tableName: 'clear_types',
    sequelize
  }
)

export default ClearType;