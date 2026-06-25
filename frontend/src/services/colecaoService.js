import { API_CONFIG } from "../config/apiConfig";
import api from "../config/apiClient";

export const createColecao = async (payload, token) => {
  try {
    const response = await api.post(
      API_CONFIG.colecao.create, 
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;

  } catch (error) {
    console.error("Erro no serviço de coleção: ", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Erro ao criar coleção"
    );
  }
};

export const getAllColecoes = async (token) => {
  try {
    const response = await api.get(
      API_CONFIG.colecao.getAll,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;

  } catch (error) {
    console.error(
      "Erro ao buscar coleções:",
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.error || "Erro ao buscar coleções"
    )
  }
};

export const getColecoesBySearch = async (token, search) => {
  console.log(search)
  try {
    const response = await api.get(
      API_CONFIG.colecao.getBySearch,
      {
        params: {
          search,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;

  } catch (error) {
    console.error(
      "Erro ao buscar coleções pela busca:",
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.error || "Erro ao buscar coleções pela busca"
    )
  }
};

export const getColecaoCompleta = async (token, id) => {
  try {
    const response = await api.get(
      `${API_CONFIG.colecao.getById}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao buscar coleção:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error || "Erro ao buscar coleção"
    );
  }
};

export const updateColecao = async (id, payload, token) => {
  try {
    const response = await api.put(
      `${API_CONFIG.colecao.update}/${id}`, 
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;

  } catch (error) {
    console.error(
      "Erro no serviço de coleção:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao atualizar coleção"
    );
  }
};

export const addVisualizacao = async (id, token) => {
  try {
    const response = await api.put(
      `${API_CONFIG.colecao.addVisualizacao}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao adicionar visualização:",
      error.response?.data || error.message
    );

    throw new Error(
      error.response?.data?.error || "Erro ao adicionar visualização"
    );
  }
};

export const deleteColecao = async (id, token) => {
  try {
    const response = await api.delete(
      `${API_CONFIG.colecao.delete}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao deletar coleção:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao deletar coleção"
    );
  }
};

export const createComentario = async (token, payload) => {
  try {
    const response = await api.post(
      API_CONFIG.comentario.create, 
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;

  } catch (error) {
    console.error("Erro no serviço de comentario: ", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error || "Erro ao criar comentario"
    );
  }
};

export const deleteComentario = async (id, token) => {
  try {
    const response = await api.delete(
      `${API_CONFIG.comentario.delete}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro ao deletar comentario:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao deletar comentario"
    );
  }
};
