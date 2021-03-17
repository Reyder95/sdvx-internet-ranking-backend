import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../dbinit';

interface SongAttributes {
  id: number;
  title: string;
  artist: string;
  length: number;
  bpm_low: number;
  bpm_high: number;
}

interface SongCreationAttributes extends Optional<SongAttributes, "id"> {}

class Song extends Model<SongAttributes, SongCreationAttributes> implements SongAttributes {
  public id!: number;
  public title!: string;
  public artist!: string;
  public length!: number;
  public bpm_low!: number;
  public bpm_high!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Song.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },

    title: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },

    artist: {
      type: new DataTypes.STRING(255),
      allowNull: false
    },

    length: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    bpm_low: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },

    bpm_high: {
      type: new DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    } 
  }, {
    tableName: 'songs',
    sequelize
  }
)

export default Song;