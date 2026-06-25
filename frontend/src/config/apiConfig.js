const URL = import.meta.env.VITE_API_URL;

export const API_CONFIG = {
    colecao: {
        create: `${URL}/colecao`,
        getAll: `${URL}/colecao`,
        update: `${URL}/colecao`,
        getById: `${URL}/colecao`,
        delete: `${URL}/colecao`,
        getBySearch: `${URL}/colecao/search`,
        addVisualizacao: `${URL}/colecao/view`,
    },
    item: {
        create: `${URL}/item`,
        getAll: `${URL}/item`,
        update: `${URL}/item`,
        delete: `${URL}/item`
    },
    comentario: {
        create: `${URL}/comentario`,
        getAll: `${URL}/comentario`,
        delete: `${URL}/comentario`,
    },
    processo: {
        create: `${URL}/processo/consultar`,
    },
    estatisticas: {
        getAll: `${URL}/estatisticas`,
    }
}