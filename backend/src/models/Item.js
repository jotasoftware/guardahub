import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Item = sequelize.define('Item', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    conteudo: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    tipo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    url: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true
    },

    idColecao: {
        type: DataTypes.UUID,
        allowNull: false,
    },

}, {
    tableName: 'item',
    timestamps: true
});

export default Item;