import React from "react";
import { useColecao } from "../context/ColecaoContext";
import { useComentario } from "../context/ComentarioContext";
import { useItem } from "../context/ItemContext";

const ConfirmDeleteModal = ({
  open,
  onClose,
  elem,
  tipo
}) => {
  if (!open) return null;
  const {deleteColecao, fetchColecaoCompleta} = useColecao();
  const {deleteComentario} = useComentario();
  const {deleteItem, fetchItens} = useItem();

  const onConfirm = async () => {
    console.log(elem)
    if(tipo == "coleção") await deleteColecao(elem.id)
    if(tipo == "item"){
      await deleteItem(elem.id) 
      await fetchColecaoCompleta(elem.idColecao)
    } 
    if(tipo == "comentario") await deleteComentario(elem.id, elem.idColecao)
    onClose()
    fetchItens()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-lg p-6">
      
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Excluir {tipo} 
        </h2>

        <p className="text-sm text-gray-600">
          Tem certeza que deseja excluir excluir
          <span className="font-semibold text-gray-800">
            {" "}{elem.titulo}
          </span>
          ?
        </p>

        <p className="text-sm text-red-600 mt-2">
          Essa ação não poderá ser desfeita.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
