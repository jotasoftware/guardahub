import React, { createContext, useContext, useState, useEffect } from "react";
import { 
    createItem as apiCreateItem,
    getAllItens as apiGetAllItens,
    updateItem as apiUpdateItem,
    deleteItem as apiDeleteItem,
} from '../services/itemService';
import { useAuth } from "./AuthContext";

export const ItemContext = createContext(null);

export const ItemProvider = ({ children }) => {
    const {user, updateActivity, loadingAuth} = useAuth();
    const [loadingItem, setLoadingItem] = useState(false)
    const [itens, setItens] = useState([]);

    const createItem = async (dadosItem) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingItem(true)
        const token = await user.getIdToken();
        try {
            updateActivity();
            await apiCreateItem(dadosItem, token);
            fetchItens()
        } catch (error) {
            console.error("Erro ao criar item:", error);
            throw error;
        } finally {
            setLoadingItem(false);
        }
    };

    const fetchItens = async () => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingItem(true);
        try {
            const token = await user.getIdToken();
            const response = await apiGetAllItens(token);
            setItens(response);
        } catch (error) {
            console.error("Erro ao buscar itens:", error);
            throw error;
        } finally {
            setLoadingItem(false);
        }
    };

    const editItem = async (id, dadosItem) => {
        if (!user) throw new Error("Usuário não autenticado");
        const token = await user.getIdToken();
        try {
            updateActivity();
            await apiUpdateItem(id, dadosItem, token);
        } catch (error) {
          console.error("Erro ao editar item:", error);
          throw error;
        } finally {
          setLoadingItem(false);
        }
    };

    const deleteItem = async (id) => {
        if (!user) throw new Error("Usuário não autenticado");
        const token = await user.getIdToken();
        try {
            updateActivity();
            await apiDeleteItem(id, token);
        } catch (error) {
          console.error("Erro ao apagar item:", error);
          throw error;
        } finally {
          setLoadingItem(false);
        }
    };

    useEffect(() => {
        if (!loadingAuth && user) {
            fetchItens();
        }
    }, [user, loadingAuth]);

    const value = { createItem, loadingItem, fetchItens, editItem, itens, deleteItem };

    return (
        <ItemContext.Provider value={value}>
            {children}
        </ItemContext.Provider>
    );
};

export const useItem = () => {
    const context = useContext(ItemContext);
    if (!context) {
        throw new Error('useItem deve ser usado dentro de um ItemProvider');
    }
    return context;
};