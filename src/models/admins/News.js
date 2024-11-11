import { DataTypes } from 'sequelize';
import BaseModel from '../BaseModel.js';

class News extends BaseModel {}

    News.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        publisher: { type: DataTypes.TEXT, allowNull: false, trim: true },
        title: { type: DataTypes.TEXT, allowNull: false, trim: true },
        category: { type: DataTypes.TEXT, allowNull: false, trim: true },
        body: { type: DataTypes.TEXT, allowNull: false, trim: true },
        date: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
        image: { type: DataTypes.STRING, allowNull: true, trim: true, defaultValue: null },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default News;