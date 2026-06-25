import React, { useEffect, useMemo, useState } from 'react'
import ButtonHome from '../../components/buttonHome/ButtonHome';
import CriarItemModal from '../../modals/CriarItemModal';
import { useColecao } from '../../context/ColecaoContext';
import ItemLine from '../../components/itemLine/ItemLine';
import { useLocation, useParams } from "react-router-dom";
import Loading from '../../components/loading/Loading';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import ComentarioLine from '../../components/comentarioLine/ComentarioLine';
import NovoComentario from '../../components/novoComentario/NovoComentario';
import { useAuth } from '../../context/AuthContext';
import { IoIosLink } from "react-icons/io";
import { toast } from 'react-toastify';

const ColecaoDetalhePage = () => {
  const {user} = useAuth()
  const {colecoes, fetchColecaoCompleta, colecaoCompleta, loadingColecao, searchInput, addVisualizacao} = useColecao();
  const [itemEdit, setItemEdit] = useState({});
  const [openItem, setOpenItem] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [tipoDelete, setTipoDelete] = useState("item");
  const {id} = useParams();
  const location = useLocation();
  
  const itensFiltrados = useMemo(() => {
    if (!searchInput) return colecaoCompleta.Items;
    return colecaoCompleta.Items.filter((i) =>
      i.titulo?.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [colecaoCompleta, searchInput]);

  useEffect(() => {
    const carregarColecao = async () => {
      try {
        await fetchColecaoCompleta(id);
        if (location.pathname.startsWith("/colecoes")) {
          const key = `view_${id}`;
          if (!localStorage.getItem(key)) {
            await addVisualizacao(id);
            localStorage.setItem(key, "true");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    carregarColecao();
  }, [id, location.pathname]);

  const closeModal = ()=>{
    setOpenItem(false)
    setOpenDelete(false)
    setItemEdit({})
  }

  const openModalItem = (item)=>{
    setOpenItem(true)
    setItemEdit(item)
  }

  const openModalDelete = (item)=>{
    if(item.texto) setTipoDelete("comentario")
    else setTipoDelete("item")
    setOpenDelete(true)
    setItemEdit(item)
  }

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:5173/colecoes/${id}`);
      toast.success("Link copiado!")
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <>
    {((!loadingColecao && colecaoCompleta?.usuarioUid && colecaoCompleta?.status && user?.uid !== colecaoCompleta.usuarioUid && location.pathname.startsWith("/suascolecoes")) || (location.pathname.startsWith("/colecoes") && colecaoCompleta?.status == "1")) ? <p className='text-center text-gray-800'>Acesso negado</p> : 
    (loadingColecao ? 
    <div className='w-full flex justify-center h-full items-center'>
      <Loading /> 
    </div>
    : 
    <div className="mx-1 flex flex-col gap-6">
      <div className="flex justify-between gap-6">
        <div className="bg-zinc-50 rounded-xl p-4 flex-1">
          <div className='flex justify-between items-center mb-4'>
              <div className='flex gap-2'>
                <h2 className="font-semibold text-base text-gray-800">{colecaoCompleta?.titulo}</h2>
                {colecaoCompleta?.status == "2" &&
                <button
                  onClick={copiarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-800 transition-colors"
                >
                  <IoIosLink size={16} />
                </button>
                }
              </div>
              {!location.pathname.startsWith("/colecoes") && <ButtonHome name={'Novo item'} action={() => openModalItem()}></ButtonHome>}
          </div>
          <div className="flex flex-col">
              {itensFiltrados?.length == 0 ?
                  <p className='text-gray-500 text-sm p-0 m-0'>Não há itens</p>
                :
              (itensFiltrados?.map((item) => (
                  <div
                  key={item.id}
                  >
                      <ItemLine 
                        item={item} 
                        onEdit={() => openModalItem(item)}
                        onDelete={() => openModalDelete(item)}
                        busca={location.pathname.startsWith("/colecoes")}
                        >
                      </ItemLine>
                  </div>
              )))}
              </div>
          </div>
      </div>
      <div className="bg-zinc-50 rounded-xl p-4 flex-1">
        <div className='flex justify-between items-center mb-4'>
          <h2 className="font-semibold text-base text-gray-800">Comentários</h2>
        </div>
        <div className="flex flex-col">
          {colecaoCompleta?.Comentarios?.length == 0 ?
          <p className='text-gray-500 text-sm p-0 m-0'>Não há comentários para listar</p>
          :
          (colecaoCompleta?.Comentarios?.map((comentario) => (
              <div
              key={comentario.id}
              >
                  <ComentarioLine 
                    comentario={comentario} 
                    onDelete={() => openModalDelete(comentario)}
                    >
                  </ComentarioLine>
              </div>
            )))
          }
            <NovoComentario idColecao={id}/>
          </div>
      </div>
      <CriarItemModal
          open={openItem}
          onClose={closeModal}
          itemEdit={itemEdit}
          colecoes={colecoes}
          idColecao={colecaoCompleta?.id || null}
      />

      <ConfirmDeleteModal 
        open={openDelete}
        onClose={closeModal}
        elem={itemEdit}
        tipo={tipoDelete}
      />
    </div>
  )}
    </>
  );
}

export default ColecaoDetalhePage