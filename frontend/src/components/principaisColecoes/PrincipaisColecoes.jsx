import React from 'react'

import { useColecao } from '../../context/ColecaoContext';
import ButtonHome from '../../components/buttonHome/ButtonHome';
import ColecaoLine from '../colecaoLine/ColecaoLine';
import { useNavigate } from 'react-router';

const PrincipaisColecoes = ({openModal}) => {
    const {colecoes} = useColecao();
    const principaisColecoes = [...(colecoes || [])]
        .sort((a, b) => (b.quantidadeViews || 0) - (a.quantidadeViews || 0))
        .slice(0, 5);

    const navigate = useNavigate();

    const handleOpenColecao = (id) => {
        if(!id){
            navigate(`/suascolecoes`);
        }else{
            navigate(`/suascolecoes/${id}`);
        }
    };

    return (
        <div className="bg-zinc-50 rounded-xl p-4 flex-1">
        <div className='flex justify-between items-center mb-4'>
            <h2 className="font-semibold text-base text-gray-800">Suas principais coleções</h2>
            <ButtonHome name={'Nova coleção'} action={() => openModal()}></ButtonHome>
        </div>
        <div className="flex flex-col items-start gap-2 min-h-[200px]">
            {principaisColecoes?.map((colecao) => (
                <div
                key={colecao.id}
                onClick={() => handleOpenColecao(colecao.id)}
                >
                    <ColecaoLine nome={colecao.titulo} data={colecao.createdAt}></ColecaoLine>
                </div>
            ))}
            </div>
        <div className='flex justify-center pt-2'>
            <ButtonHome name={'Ver mais'} action={() => handleOpenColecao()}></ButtonHome>
        </div>
        </div>
    )
}

export default PrincipaisColecoes