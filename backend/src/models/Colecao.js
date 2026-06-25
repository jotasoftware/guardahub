import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Colecao = sequelize.define('Colecao', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('publica', 'privada'),
        allowNull: false,
        defaultValue: 'privada'
    },

    quantidadeViews: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    usuarioUid: {
        type: DataTypes.STRING,
        allowNull: false
    },

}, {
    tableName: 'colecao',
    timestamps: true
});

export default Colecao;