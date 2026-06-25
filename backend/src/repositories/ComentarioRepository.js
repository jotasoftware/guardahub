import { Op } from 'sequelize';
import { Item, Comentario } from "../models/index.js";

const ComentarioRepository = {
    create: async (data) => {
        // const id = generateRandomId();
        // const newData = { ...data, id };
        return await Comentario.create(data);
    },

    findAllByColecoes: async (colecaoIds) => {
        return await Comentario.findAll({
            where: {
                idColecao: {
                    [Op.in]: colecaoIds
                }
            },
            order: [['createdAt', 'DESC']]
        });
    },

    findBySearch: async (search) => {
        return await Comentario.findAll({
            where: {
                titulo: {
                    [Op.iLike]: `%${search}%`
                }
            },
    
            order: [
                ['createdAt', 'DESC'],
            ],
        });
    },

    findById: async (id) => {
        return await Comentario.findByPk(id);
    },

    remove: async (comentario) => {
        console.log(comentario)
        return await comentario.destroy();
    },
};
  
export default ComentarioRepository;