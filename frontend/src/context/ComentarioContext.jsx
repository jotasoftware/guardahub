import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
    createComentario as apiCreateComentario,
    deleteComentario as apiDeleteComentario, 
    getAllComentarios as apiGetAllComentarios
} from '../services/comentarioService';
import { useAuth } from "./AuthContext";
import { useColecao } from "./ColecaoContext";

export const ComentarioContext = createContext(null);

export const ComentarioProvider = ({ children }) => {
    const {fetchColecaoCompleta} = useColecao();
    const {user, updateActivity, loadingAuth} = useAuth();
    const [loadingComentario, setLoadingComentario] = useState(false)
    const [comentarios, setComentarios] = useState([]);

    const fetchComentarios = async () => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingComentario(true);
        try {
            const token = await user.getIdToken();
            const response = await apiGetAllComentarios(token);
            setComentarios(response);
        } catch (error) {
            console.error("Erro ao buscar coleções:", error);
            throw error;
        } finally {
            setLoadingComentario(false);
        }
    };


    const createComentario = async (dadosComentario, idColecao) => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingComentario(true);
        try {
            const payloadParaAPI = {
                texto: dadosComentario,
                idColecao: idColecao
            };
            const token = await user.getIdToken();
            updateActivity();
            await apiCreateComentario(token, payloadParaAPI);
            await fetchColecaoCompleta(idColecao)
        } catch (error) {
            console.error("Erro ao criar comentario:", error);
            throw error;
        } finally {
            setLoadingComentario(false);
        }
    };

    const deleteComentario = async (id, idColecao) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingComentario(true);
        try {
            const token = await user.getIdToken();
            updateActivity();
            await apiDeleteComentario(id, token);
            await fetchColecaoCompleta(idColecao)
        } catch (error) {
            console.error("Erro ao deletar comentário:", error);
            throw error;
        } finally {
            setLoadingComentario(false);
        }
    };

    useEffect(() => {
        if (!loadingAuth && user) {
            fetchComentarios();
        }
    }, [user, loadingAuth]);

    const value = { createComentario, loadingComentario, fetchComentarios, comentarios, deleteComentario };

    return (
        <ComentarioContext.Provider value={value}>
            {children}
        </ComentarioContext.Provider>
    );
};

export const useComentario = () => {
    const context = useContext(ComentarioContext);
    if (!context) {
        throw new Error('useComentario deve ser usado dentro de um ComentarioProvider');
    }
    return context;
};