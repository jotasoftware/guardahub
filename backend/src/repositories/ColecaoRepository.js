import { Op } from 'sequelize';
import { Item, Colecao, Comentario } from "../models/index.js";

const ColecaoRepository = {
    create: async (data) => {
        return await Colecao.create(data);
    },

    findAll: async (uid) => {
        return await Colecao.findAll({
            where: {
                usuarioUid: uid,
            },
    
            order: [
                ['createdAt', 'DESC'],
            ],
        });
    },

    findBySearch: async (search) => {
        return await Colecao.findAll({
            where: {
                titulo: {
                    [Op.iLike]: `%${search}%`
                },
                status: "2",
            },
    
            order: [
                ['createdAt', 'DESC'],
            ],
        });
    },

    findById: async (id) => {
        return await Colecao.findByPk(id, {
            include: [
                {
                model: Item,
                },
                {
                model: Comentario,
                },
            ],
            order: [
                [Item, "createdAt", "DESC"],
                [Comentario, "createdAt", "DESC"],
            ],
        });
    },

    update: async (colecao, data) => {
        return await colecao.update(data);
    },

    remove: async (colecao) => {
        return await colecao.destroy();
    },
};
  
export default ColecaoRepository;