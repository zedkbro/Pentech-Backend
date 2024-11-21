import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import ShareHolder from './ShareHolder.js';
import Candidate from './Candidate.js';

class Vote extends BaseModel {}

    Vote.init({
        id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false},
        shareHolderId: { type: DataTypes.UUID, references: { model: ShareHolder, key: 'id' }, allowNull: false },
        candidateId: { type: DataTypes.UUID, references: { model: Candidate, key: 'id' }, allowNull: false },
        trash: { type: DataTypes.BOOLEAN, allowNull: false, trim: true, defaultValue: false }
    });

export default Vote;
