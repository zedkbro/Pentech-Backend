import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Admin from './Admin.js';
import Vote from './Vote.js';
import ShareHolder from './ShareHolder.js';

class VoteResult extends BaseModel {}

    VoteResult.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        voteId: { type: DataTypes.UUID, references: { model: Vote, key: 'id' }, allowNull: false },
        shareHolderId: { type: DataTypes.UUID, references: { model: ShareHolder, key: 'id' }, allowNull: false },
        status: { type: DataTypes.NUMBER, allowNull: true, trim: true, defaultValue: 0 },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default VoteResult;
