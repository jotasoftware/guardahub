import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import { 
    createColecao as apiCreateColecao,
    getAllColecoes as apiGetAllColecoes,
    getColecaoCompleta as apiGetColecaoCompleta,
    updateColecao as apiUpdateColecao,
    deleteColecao as apiDeleteColecao, 
    getColecoesBySearch as apiGetColecoesBySearch,
    createComentario as apiCreateComentario,
    deleteComentario as apiDeleteComentario, 
    addVisualizacao as apiAddVisualizacao, 
} from '../services/colecaoService';
import { useAuth } from "./AuthContext";

export const ColecaoContext = createContext(null);

export const ColecaoProvider = ({ children }) => {
    const {user, updateActivity, loadingAuth} = useAuth();
    const [loadingColecao, setLoadingColecao] = useState(false)
    const [colecoes, setColecoes] = useState([]);
    const [colecaoCompleta, setColecaoCompleta] = useState([])
    const [colecoesSearch, setColecoesSearch] = useState([])
    const [searchInput, setSearchInput] = useState("")

    const createColecao = async (dadosColecao) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingColecao(true)
        const token = await user.getIdToken();
        try {
            const payloadParaAPI = {
                titulo: dadosColecao.titulo,
                descricao: dadosColecao.descricao,
                urlPublica: dadosColecao.url,
                status: dadosColecao.status,
            };
            updateActivity();
            const novaColecao = await apiCreateColecao(payloadParaAPI, token);
            setColecoes((prev) => [novaColecao, ...prev]);
        } catch (error) {
            console.error("Erro ao criar coleção:", error);
            throw error;
        } finally{
            setLoadingColecao(false)
        }
    };

    const fetchColecoes = async () => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingColecao(true);
        try {
            const token = await user.getIdToken();
            const response = await apiGetAllColecoes(token);
            setColecoes(response);
        } catch (error) {
            console.error("Erro ao buscar coleções:", error);
            throw error;
        } finally {
            setLoadingColecao(false);
        }
    };

    const fetchColecaoCompleta = async (id) => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingColecao(true);
        try {
            const token = await user.getIdToken();
            const response = await apiGetColecaoCompleta(token, id);
            setColecaoCompleta(response);
        } catch (error) {
            console.error("Erro ao buscar coleções:", error);
            throw error;
        } finally {
            setLoadingColecao(false);
        }
    };

    const editColecao = async (dadosColecao) => {
        if (!user) throw new Error("Usuário não autenticado");
        if (!dadosColecao.id) throw new Error("ID da coleção é obrigatório para edição");
        setLoadingColecao(true);
        const token = await user.getIdToken();
        try {
        const payloadParaAPI = {
            titulo: dadosColecao.titulo,
            descricao: dadosColecao.descricao,
            urlPublica: dadosColecao.url,
            status: dadosColecao.status,
        };
        updateActivity();
        const colecaoAtualizada = await apiUpdateColecao(dadosColecao.id, payloadParaAPI, token);
            setColecoes((prev) =>prev.map((c) =>c.id === dadosColecao.id ? colecaoAtualizada : c));
    
        } catch (error) {
        console.error("Erro ao editar coleção:", error);
        throw error;
        } finally {
        setLoadingColecao(false);
        }
    };

    const addVisualizacao = async (id) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingColecao(true);
        const token = await user.getIdToken();
        try {
            updateActivity();
            const colecaoAtualizada = await apiAddVisualizacao(id, token);
            setColecoes((prev) =>
                prev.map((c) => (c.id === id ? colecaoAtualizada : c))
            );
        } catch (error) {
        console.error("Erro ao editar coleção:", error);
        throw error;
        } finally {
        setLoadingColecao(false);
        }
    };

    const deleteColecao = async (id) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingColecao(true);
        try {
            const token = await user.getIdToken();
            updateActivity();
            await apiDeleteColecao(id, token);
            setColecoes((prev) => prev.filter((c) => c.id !== id));
        } catch (error) {
            console.error("Erro ao deletar coleção:", error);
            throw error;
        } finally {
            setLoadingColecao(false);
        }
    };

    const getColecoesBySearch = async (search) => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingColecao(true);
        try {
            const token = await user.getIdToken();
            const response = await apiGetColecoesBySearch(token, search);
            setColecoesSearch(response)
        } catch (error) {
            console.error("Erro ao buscar coleções:", error);
            throw error;
        } finally {
            setLoadingColecao(false);
        }
    };

    const createComentario = async (dadosComentario, idColecao) => {
        if (!user) {
            throw new Error("Usuário não autenticado");
        }
        setLoadingColecao(true);
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
            setLoadingColecao(false);
        }
    };

    const deleteComentario = async (id, idColecao) => {
        if (!user) throw new Error("Usuário não autenticado");
        setLoadingColecao(true);
        try {
            const token = await user.getIdToken();
            updateActivity();
            await apiDeleteComentario(id, token);
            await fetchColecaoCompleta(idColecao)
        } catch (error) {
            console.error("Erro ao deletar coleção:", error);
            throw error;
        } finally {
            setLoadingColecao(false);
        }
    };

    useEffect(() => {
        if (!loadingAuth && user) {
            fetchColecoes();
        }
    }, [user, loadingAuth]);

    const value = { createColecao, loadingColecao, fetchColecoes, editColecao, colecoes, fetchColecaoCompleta, colecaoCompleta, deleteColecao, getColecoesBySearch, colecoesSearch, setSearchInput, searchInput, createComentario, deleteComentario, addVisualizacao };

    return (
        <ColecaoContext.Provider value={value}>
            {children}
        </ColecaoContext.Provider>
    );
};

export const useColecao = () => {
    const context = useContext(ColecaoContext);
    if (!context) {
        throw new Error('useColecao deve ser usado dentro de um ColecaoProvider');
    }
    return context;
};