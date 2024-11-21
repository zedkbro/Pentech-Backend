import BaseModel from '../BaseModel.js';
import { DataTypes } from 'sequelize';
import Admin from './Admin.js';
import Share from './Share.js';

class ShareHolder extends BaseModel {}

ShareHolder.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        userId: {
            type: DataTypes.UUID,
            references: { model: Admin, key: 'id' },
            allowNull: false,
        },
        shareId: {
            type: DataTypes.UUID,
            references: { model: Share, key: 'id' },
            allowNull: false,
        },
        entityType: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        nationality: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        city: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        country: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        totalShares: {
            type: DataTypes.INTEGER, // Changed from NUMBER to INTEGER
            allowNull: false,
            defaultValue: 1,
        },
        trash: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
    },
    {
        sequelize: BaseModel.sequelize, // Ensure you're passing the Sequelize instance
        modelName: 'ShareHolder',
    }
);

export default ShareHolder;
