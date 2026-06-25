import React from 'react'
import { useNavigate } from 'react-router';
import { useItem } from '../../context/ItemContext';
import ButtonHome from '../buttonHome/ButtonHome';
import ItemLine from '../itemLine/ItemLine';

const UltimosItens = ({openModal}) => {
    const {itens} = useItem();
    const ultimosItens = [...(itens || [])]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

    const navigate = useNavigate();

    const handleOpenColecao = (id) => {
        navigate(`/suascolecoes/${id}`);
    };

    return (
        <div className="bg-zinc-50 rounded-xl p-4 flex-1">
        <div className='flex justify-between items-center mb-4'>
            <h2 className="font-semibold text-base text-gray-800">Últimos itens salvos</h2>
            <ButtonHome name={'Novo item'} action={() => openModal()}></ButtonHome>
        </div>
        <div className="flex flex-col items-start gap-2">
            {ultimosItens?.map((item) => (
                <div
                key={item.id}
                onClick={() => handleOpenColecao(item?.Colecao.id)}
                >
                    <ItemLine item={item} ultimas={true}></ItemLine>
                </div>
            ))}
            </div>
        </div>
    )
}

export default UltimosItens