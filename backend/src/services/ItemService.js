import ItemRepository from '../repositories/ItemRepository.js';
import fs from "fs";
import path from "path";
import { StorageService } from './StorageService.js';

const ItemService = {
    createItem: async (data) => {
        return await ItemRepository.create(data);
    },

    getItemById: async (id) => {
        const item = await ItemRepository.findById(id);
        if (!item) {
            throw new Error('Item não encontrado');
        }
        return item;
    },

    getAllItens: async (uid) => {
        return await ItemRepository.findAll(uid);
    },

    updateItem: async (id, data, file, uid) => {
        const item = await ItemRepository.findById(id);
        if (!item) {
            throw new Error('Item não encontrado');
        }
        if (item.dataValues.Colecao.usuarioUid !== uid) {
            throw new Error("Não autorizado");
        }
        const updateData = {
            ...data,
        };
        if (file) {
            StorageService.deleteFile(item.dataValues.url);
            updateData.url = StorageService.buildPath(file);
        }

        return await ItemRepository.update(item, updateData);
    },

    deleteItem: async (id) => {
        const item = await ItemRepository.findById(id);
        if(!item){
            throw new Error('Item não encontrado');
        }
        if (item.dataValues.url?.startsWith("/uploads")) {
            StorageService.deleteFile(item.dataValues.url);
        }
        return await ItemRepository.remove(item);
    },
};

export default ItemService;