import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class Blog extends BaseModel {}

Blog.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
  publisher: { type: DataTypes.STRING, allowNull: false },
  date: { type: DataTypes.DATE, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  comment: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  react: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  share: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  tags: { type: DataTypes.TEXT, allowNull: true, defaultValue: null },
  image: { type: DataTypes.STRING, allowNull: true, defaultValue: null },
  status: { type: DataTypes.STRING, allowNull: true, defaultValue: 0 },
  trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
});

export default Blog;