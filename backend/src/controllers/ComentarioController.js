import ComentarioService from '../services/ComentarioService.js';

export const createComentario = async (req, res) => {
    try {
        const uid = req.user.uid;
        const newData = {
            ...req.body,
            usuarioUid: uid,
            usuarioNome: req.user.name
        };
        const comentario = await ComentarioService.createComentario(newData);
        return res.status(201).json(comentario);
    }catch (error){
        return res.status(404).json({error: error.message});
    }
};

export const getAllComentarios = async (req, res) => {
    try {
        const uid = req.user.uid;
        const colecoes = await ComentarioService.getAllComentarios(uid);
        return res.status(200).json(colecoes);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};

export const deleteComentario = async (req, res) => {
    try {
        const {id} = req.params;
        const result = await ComentarioService.deleteComentario(id);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(404).json({error: error.message});
    }
};