import User from './Users';
import Song from './Songs';
import Score from './Scores';
import sequelize from '../dbinit';

const handleDB = () => {
  sequelize.sync({alter: true});
}

export { 
  User, 
  Song,
  Score,
  handleDB,
};