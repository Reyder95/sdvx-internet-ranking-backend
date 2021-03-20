import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface GaugeTypeAttributes {
  id: number;
  type: string;
  abbreviation: string;
}

interface GaugeTypeCreationAttributes extends Optional<GaugeTypeAttributes, "id"> {}

class GaugeType extends Model<GaugeTypeAttributes, GaugeTypeCreationAttributes> implements GaugeTypeAttributes {
  public id!: number;
  public type!: string;
  public abbreviation!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

GaugeType.init(
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
    tableName: 'gauge_types',
    sequelize
  }
)

export default GaugeType;