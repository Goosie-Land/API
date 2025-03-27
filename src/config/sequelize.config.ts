import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/user.model';
import { UserSettings } from '../models/user-settings.model';
import path from 'path';
import { Settings } from '../models/settings.model';
import { seedSettings } from '../data/settings';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database/database.sqlite'),
  logging: console.log,
  models: [User, UserSettings, Settings],
});


export const connectSequelizeDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        await seedSettings();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}