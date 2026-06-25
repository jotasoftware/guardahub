import { Op } from 'sequelize';
import { Item, Colecao } from "../models/index.js";

const ItemRepository = {
    create: async (data) => {
        return await Item.create(data);
    },

    findAll: async (uid) => {
        return await Item.findAll({
        include: [
            {
            model: Colecao,
            where: {
                usuarioUid: uid,
            },
            attributes: ["id", "titulo"],
            },
        ],
        order: [["createdAt", "DESC"]],
        });
    },

    findById: async (id) => {
        return await Item.findByPk(id, {
            include: [
                {
                    model: Colecao,
                    attributes: ["id", "titulo", "usuarioUid"],
                },
            ],
        });
    },

    update: async (item, data) => {
        return await item.update(data);
    },

    remove: async (item) => {
        await item.destroy();
    },
};
  
export default ItemRepository;