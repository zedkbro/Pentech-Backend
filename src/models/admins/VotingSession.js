import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';

class VotingSession extends BaseModel {}

    VotingSession.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        title: { type: DataTypes.TEXT, allowNull: false, trim: true, defaultValue: null },
        description: { type: DataTypes.TEXT, allowNull: false, trim: true },
        threshold: { type: DataTypes.TEXT, allowNull: false, trim: true },
        startedAt: { type: DataTypes.DATE, allowNull: true, trim: true, defaultValue: null },
        completedAt: { type: DataTypes.DATE, allowNull: true, trim: true, defaultValue: null },
        status: { type: DataTypes.ENUM('not_started', 'on_going', 'completed'), defaultValue: 'not_started' },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default VotingSession;
