import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import ShareHolder from './ShareHolder.js';
import VotingSession from './VotingSession.js';

class VoteJoined extends BaseModel {}

    VoteJoined.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        sessionId: { type: DataTypes.UUID, references: { model: VotingSession, key: 'id' }, allowNull: false },
        shareHolderId: { type: DataTypes.UUID, references: { model: ShareHolder, key: 'id' }, allowNull: false },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default VoteJoined;
