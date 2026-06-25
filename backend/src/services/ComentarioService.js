import ColecaoRepository from '../repositories/ColecaoRepository.js';
import ComentarioRepository from '../repositories/ComentarioRepository.js';

const ComentarioService = {
    createComentario: async (data) => {
        return await ComentarioRepository.create(data);
    },

    getAllComentarios: async (uid) => {
        const colecoes = await ColecaoRepository.findAll(uid);
        const colecaoIds = colecoes.map(c => c.id);
        return await ComentarioRepository.findAllByColecoes(colecaoIds);
    },

    deleteComentario: async (id) => {
        const comentario = await ComentarioRepository.findById(id);
        if(!comentario){
            throw new Error('Comentário não encontrado');
        }
        return await ComentarioRepository.remove(comentario);
    },
};

export default ComentarioService;