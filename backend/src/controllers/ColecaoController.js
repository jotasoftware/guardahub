import ColecaoService from '../services/ColecaoService.js';

export const createColecao = async (req, res) => {
    try {
        const uid = req.user.uid;
        const newData = {
            ...req.body,
            usuarioUid: uid
        };
        const colecao = await ColecaoService.createColecao(newData);
        return res.status(201).json(colecao);
    }catch (error){
        return res.status(404).json({error: error.message});
    }
};

export const getAllColecoes = async (req, res) => {
    try {
        const uid = req.user.uid;
        const colecoes = await ColecaoService.getAllColecoes(uid);
        return res.status(200).json(colecoes);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getColecoesBySearch = async (req, res) => {
    try {
        const {search} = req.query;
        const colecoes = await ColecaoService.getColecoesBySearch(search);
        return res.status(200).json(colecoes);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const getColecaoById = async (req, res) => {
    try {
        const {id} = req.params;
        const colecao = await ColecaoService.getColecaoById(id);
        return res.status(200).json(colecao);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const updateColecao = async (req, res) => {
    try {
        const {id} = req.params;
        const data = req.body;
        const uid = req.user.uid;
        const updatedColecao = await ColecaoService.updateColecao(id, data, uid);
        return res.status(200).json(updatedColecao);
    } catch (error) {
        return res.status(404).json({ message: error.message });
    }
};

export const addVisualizacao = async (req, res) => {
    try {
        const { id } = req.params;
        const colecaoAtualizada = await ColecaoService.addVisualizacao(id);
        return res.status(200).json(colecaoAtualizada);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
};

export const deleteColecao = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await ColecaoService.deleteColecao(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};