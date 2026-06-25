import React, { useMemo, useState } from 'react'
import CriarColecaoModal from '../../modals/CriarColecaoModal';
import ButtonHome from '../../components/buttonHome/ButtonHome';
import { useColecao } from '../../context/ColecaoContext';
import ColecaoCard from '../../components/colecaoCard/ColecaoCard';
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';

const ColecoesPage = () => {
  const {colecoes, colecoesSearch, searchInput} = useColecao();
  const [colecaoEdit, setColecaoEdit] = useState(null);
  const [openColecao, setOpenColecao] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const colecoesFiltradas = useMemo(() => {
    if (!searchInput) return colecoes;
    return colecoes.filter((c) =>
      c.titulo?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [colecoes, searchInput]);

  const listaColecoes = useMemo(() => {
    if (location.pathname === "/colecoes") {
      return colecoesSearch;
    }
    return colecoesFiltradas;
  }, [location.pathname, colecoesFiltradas, colecoesSearch]);

  const handleOpenColecao = (colecao) => {
    navigate(`${location.pathname}/${colecao.id}`);
  };

  const closeModal = ()=>{
    setOpenColecao(false)
    setOpenDelete(false)
  }

  const openModalColecao = (colecao)=>{
    setOpenColecao(true)
    setColecaoEdit(colecao)
  }

  const openModalDelete = (colecao)=>{
    setOpenDelete(true)
    setColecaoEdit(colecao)
  }

  return (
    <div className="mx-1 flex flex-col gap-6">
      <div className="flex justify-between gap-6">
        <div className="bg-zinc-50 rounded-xl p-4 flex-1 min-h-[80vh]">
          <div className='flex justify-between items-center mb-4'>
              {location.pathname === "/colecoes" ? 
              <>
                <h2 className="font-semibold text-base text-gray-800">Coleções</h2>
              </>:
              <>
                <h2 className="font-semibold text-base text-gray-800">Suas coleções</h2>
                <ButtonHome name={'Nova coleção'} action={() => openModalColecao()}></ButtonHome>
              </>
              }
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {listaColecoes?.map((colecao) => (
                  <div
                  key={colecao.id}
                  >
                      <ColecaoCard 
                        colecao={colecao} 
                        clickEdit={() => openModalColecao(colecao)}
                        clickDelete={() => openModalDelete(colecao)}
                        onClick={() => handleOpenColecao(colecao)}
                        busca={location.pathname === "/colecoes"}
                        >
                      </ColecaoCard>
                  </div>
              ))}
              </div>
          </div>
      </div>
      <CriarColecaoModal
          open={openColecao}
          onClose={closeModal}
          colecaoEdit={colecaoEdit}
      />
      <ConfirmDeleteModal 
        open={openDelete}
        onClose={closeModal}
        elem={colecaoEdit}
        tipo={"coleção"}
      />
    </div>
    
  );
}

export default ColecoesPage