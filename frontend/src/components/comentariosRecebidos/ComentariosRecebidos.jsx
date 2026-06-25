import React from 'react'
import { useNavigate } from 'react-router';
import { useComentario } from '../../context/ComentarioContext';
import { useAuth } from "../../context/AuthContext";
import ButtonHome from '../buttonHome/ButtonHome';
import ComentarioLine from '../comentarioLine/ComentarioLine';

const ComentariosRecebidos = ({openModal}) => {
    const {user} = useAuth()
    const {comentarios} = useComentario();
    console.log(comentarios)
    const comentariosColecoes = [...(comentarios || [])]
        .filter((comentario) => user.uid !== comentario.usuarioUid)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    const navigate = useNavigate();

    const handleOpenColecao = (id) => {
        navigate(`/suascolecoes/${id}`);
    };

    return (
        <div className="bg-zinc-50 rounded-xl p-4 flex-1">
        <div className='flex justify-between items-center mb-4'>
            <h2 className="font-semibold text-base text-gray-800">Comentários recebidos</h2>
        </div>
        <div className="flex flex-col items-start gap-2">
            {comentariosColecoes.length > 0 ? (
                comentariosColecoes.map((comentario) => (
                <div
                    key={comentario.id}
                    onClick={() => handleOpenColecao(comentario.idColecao)}
                >
                    <ComentarioLine comentario={comentario} />
                </div>
                ))
            ) : (
                <p className="text-sm text-gray-500">
                Não há comentários
                </p>
            )}
            </div>
        </div>
    )
}

export default ComentariosRecebidos