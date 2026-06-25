import ColecaoRepository from '../repositories/ColecaoRepository.js';
import { Item, Colecao } from "../models/index.js";
import { getAllItens } from '../controllers/ItemController.js';
import { StorageService } from './StorageService.js';

const ColecaoService = {
    createColecao: async (data) => {
        return await ColecaoRepository.create(data);
    },

    getColecaoById: async (id) => {
        const colecao = await ColecaoRepository.findById(id);
        if (!colecao) {
            throw new Error('Colecão não encontrada');
        }
        return colecao;
    },

    getAllColecoes: async (uid) => {
        return await ColecaoRepository.findAll(uid);
    },

    getColecoesBySearch: async (search) => {
        return await ColecaoRepository.findBySearch(search);
    },

    updateColecao: async (id, data, uid) => {
        const colecao = await ColecaoRepository.findById(id);
        if (!colecao) {
            throw new Error('Colecão não encontrada');
        }
        if (colecao.usuarioUid !== uid) {
            throw new Error("Não autorizado");
        }
        return await ColecaoRepository.update(colecao, data);
    },

    addVisualizacao: async (id) => {
        const colecao = await ColecaoRepository.findById(id);
        if (!colecao) {
            throw new Error('Coleção não encontrada');
        }
        const viewsAtuais = colecao.quantidadeViews || 0;
        const data = {
            quantidadeViews: viewsAtuais + 1
        };
        return await ColecaoRepository.update(colecao, data);
    },

    deleteColecao: async (id) => {
        const colecao = await ColecaoRepository.findById(id);
        if(!colecao){
            throw new Error('Colecão não encontrada');
        }
        for (const item of colecao.Items) {
            if (item.url?.startsWith("/uploads")) {
                StorageService.deleteFile(item.url);
            }
        }
        return await ColecaoRepository.remove(colecao);
    },
};

export default ColecaoService;