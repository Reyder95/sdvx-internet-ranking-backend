import User from './Users';
import Song from './Songs';
import Score from './Scores';
import GaugeType from './GaugeTypes';
import ClearType from './ClearTypes';
import Difficulty from './Difficulties';
import sequelize from '../dbinit';

const handleDB = () => {
  sequelize.sync({alter: true});
}

export { 
  User, 
  Song,
  Score,
  GaugeType,
  ClearType,
  Difficulty,
  handleDB,
};