import React, { useMemo, useState } from 'react'
import PrincipaisColecoes from '../../components/principaisColecoes/PrincipaisColecoes';
import UltimosItens from '../../components/ultimosItens/UltimosItens';
import CriarColecaoModal from '../../modals/CriarColecaoModal';
import ButtonHome from '../../components/buttonHome/ButtonHome';
import CriarItemModal from '../../modals/CriarItemModal';
import { useColecao } from '../../context/ColecaoContext';
import ComentariosRecebidos from '../../components/comentariosRecebidos/ComentariosRecebidos';

const HomePage = () => {
  const {colecoes} = useColecao();
  const [colecaoEdit, setColecaoEdit] = useState(null);
  const [itemEdit, setItemEdit] = useState(null);
  const [openColecao, setOpenColecao] = useState(false);
  const [openItem, setOpenItem] = useState(false);

  const closeModal = ()=>{
    setOpenColecao(false)
    setOpenItem(false)
  }

  const openModalColecao = (colecao)=>{
    setOpenColecao(true)
    setColecaoEdit(colecao)
  }

  const openModalItem = (item)=>{
    setOpenItem(true)
    setItemEdit(item)
  }

  return (
    <div className="mx-1 flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <PrincipaisColecoes openModal={openModalColecao}></PrincipaisColecoes>
        <UltimosItens openModal={openModalItem}></UltimosItens>
      </div>
      <ComentariosRecebidos></ComentariosRecebidos>
      <CriarColecaoModal
          open={openColecao}
          onClose={closeModal}
          colecaoEdit={colecaoEdit}
      />
      <CriarItemModal
          open={openItem}
          onClose={closeModal}
          colecoes={colecoes}
          itemEdit={itemEdit}
      />
    </div>
    
  );
}

export default HomePage