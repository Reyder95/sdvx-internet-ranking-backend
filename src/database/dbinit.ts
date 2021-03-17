import { Sequelize } from 'sequelize';

const sequelize : Sequelize = new Sequelize('sdvx-ir', 'my_user', 'mypassword', {
  host: 'localhost',
  dialect: 'postgres'
});

const testDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

testDatabase();

export default sequelize;