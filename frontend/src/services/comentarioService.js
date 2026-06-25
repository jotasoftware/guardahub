import { API_CONFIG } from "../config/apiConfig";
import api from "../config/apiClient";

export const getAllComentarios = async (token) => {
  try {
    const response = await api.get(
      API_CONFIG.comentario.getAll,
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
      "Erro ao buscar comentarios:",
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.error || "Erro ao buscar comentarios"
    )
  }
};

export const createComentario = async (token, payload) => {
  try {
    console.log(payload)
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
