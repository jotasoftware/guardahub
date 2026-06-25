import { API_CONFIG } from "../config/apiConfig";
import api from "../config/apiClient";

export const createItem = async (payload, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    if (!(payload instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }
    if (payload instanceof FormData) {
      for (let [key, value] of payload.entries()) {
        console.log(key, value);
      }
    }
    const response = await api.post(
      API_CONFIG.item.create,
      payload,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erro no serviço de item: ",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao criar item"
    );
  }
};

export const getAllItens = async (token) => {
  try {
    const response = await api.get(
      API_CONFIG.item.getAll,
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
      "Erro ao buscar itens:",
      error.response?.data || error.message
    )
    throw new Error(
      error.response?.data?.error || "Erro ao buscar itens"
    )
  }
};

export const updateItem = async (id, payload, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    if (!(payload instanceof FormData)) {
      headers["Content-Type"] = "application/json";
    }

    const response = await api.put(
      `${API_CONFIG.item.update}/${id}`,
      payload,
      { headers }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Erro no update de item: ",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao atualizar item"
    );
  }
};

export const deleteItem = async (id, token) => {
  try {
    const response = await api.delete(
      `${API_CONFIG.item.delete}/${id}`,
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
      "Erro ao deletar item:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.error || "Erro ao deletar item"
    );
  }
};