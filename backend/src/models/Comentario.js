import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Comentario = sequelize.define('Comentario', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },

    texto: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    usuarioUid: {
        type: DataTypes.STRING,
        allowNull: false
    },

    idColecao: {
        type: DataTypes.UUID,
        allowNull: false,
    },

    usuarioNome: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },

}, {
    tableName: 'comentario',
    timestamps: true
});

export default Comentario;