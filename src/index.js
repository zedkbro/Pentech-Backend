import dotenv from 'dotenv';
dotenv.config();
import app from './app.js';
import sequelize from './config/database.js';

async function startApp() {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully!');
    // await sequelize.sync();
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to MySQL database:', error);
    process.exit(1);
  }
}

startApp();