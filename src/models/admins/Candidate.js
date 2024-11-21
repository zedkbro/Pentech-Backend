import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import VotingSession from './VotingSession.js';

class Candidate extends BaseModel {}

    Candidate.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sessionId: { type: DataTypes.UUID, references: { model: VotingSession, key: 'id' }, allowNull: false },
        title: { type: DataTypes.STRING, allowNull: false, trim: true },
        description: { type: DataTypes.STRING, allowNull: false, trim: true },
        avatar: { type: DataTypes.STRING, allowNull: false, trim: true, defaultValue: null },
        status: { type: DataTypes.INTEGER, allowNull: true, trim: true, defaultValue: 0 },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default Candidate;
