import User from './Users';
import Song from './Songs';
import Score from './Scores';
import GaugeType from './GaugeTypes';
import ClearType from './ClearTypes';
import Difficulty from './Difficulties';
import DifficultyName from './DifficultyNames';
import sequelize from '../dbinit';

const handleDB = () => {

  // Sync the db to add changes when we need it
  sequelize.sync({alter: true});

  // Relationships
  User.hasMany(Score);
  Difficulty.hasMany(Score);
  ClearType.hasMany(Score);
  GaugeType.hasMany(Score);
  Song.hasMany(Difficulty);
  DifficultyName.hasMany(Difficulty);


  Score.belongsTo(User);
  Score.belongsTo(Difficulty);
  Score.belongsTo(ClearType);
  Score.belongsTo(GaugeType);
  Difficulty.belongsTo(Song);
  Difficulty.belongsTo(DifficultyName);
}

export { 
  User, 
  Song,
  Score,
  GaugeType,
  ClearType,
  Difficulty,
  DifficultyName,
  handleDB,
};