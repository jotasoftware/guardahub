import React from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const ColecaoCard = ({
  colecao,
  clickEdit,
  clickDelete,
  onClick,
  busca = false
}) => {
  console.log(colecao)

  const iniciais = colecao.titulo
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const dataFormatada = new Date(colecao.createdAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="w-full bg-white rounded-xl p-3 flex items-center justify-between shadow-sm border border-gray-200/60 transition-all hover:opacity-80 hover:translate-x-1 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 flex items-center justify-center text-gray-700 opacity-80">
          {iniciais}
        </div>
        
        <div className="flex flex-col">
          <h3 className="text-gray-800 text-sm m-0 p-0">
            {colecao.titulo}
          </h3>
          <p className="text-gray-600 text-sm m-0 p-0 mt-1">
            {dataFormatada} | {colecao.status == 1 ? "Privada" : (`${colecao.quantidadeViews
} visualizações`)}
          </p>
        </div>
      </div>
      {!busca &&
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            clickEdit();
          }}
          className="text-gray-400 hover:text-gray-800 p-2 transition-colors"
        >
          <FiEdit size={20} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            clickDelete();
          }}
          className="text-gray-400 hover:text-red-600 p-2 transition-colors"
        >
          <FiTrash2 size={20} />
        </button>
      </div>
      }
    </div>
  );
};

export default ColecaoCard;