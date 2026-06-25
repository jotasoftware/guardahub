import React from "react";
import { PiImage, PiFilePdf } from "react-icons/pi";

import { IoLink } from "react-icons/io5";
import { FiDownload, FiEdit, FiLink, FiTrash } from "react-icons/fi";
import { HiOutlineUser } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext";


const ComentarioLine = ({
  comentario,
  onDelete
}) => {
  const {user} = useAuth();
  const nomeExibido = comentario.usuarioNome.split(" ").slice(0, 2).join(" ").length > 10
    ? comentario.usuarioNome.split(" ")[0] 
    : comentario.usuarioNome.split(" ").slice(0, 2).join(" ");

  const dataFormatada = new Date(comentario?.createdAt).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="w-full">
        <div className="flex justify-between w-full gap-5">
          <div className="flex items-start gap-2 rounded-md py-2 hover:opacity-80 w-full">
            <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm align-top">
              <HiOutlineUser></HiOutlineUser>
            </div>
            <div className="flex align-bottom flex-row items-center flex-1 justify-between h-full gap-10">
              <div className="flex align-bottom flex-col">
                <p className="text-gray-700 text-sm p-0 m-0">
                  {nomeExibido}
                </p>
                <p className="text-gray-400 text-xs p-0 m-0">
                  {dataFormatada}
                </p>
              </div>
              <p className="text-gray-600 text-sm p-0 m-0 flex-[15]">
                {comentario.texto}
              </p>
            </div>
          </div>
          {((user.uid == comentario.usuarioUid) && onDelete) &&
          <div className="flex items-center flex-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              className="text-gray-400 hover:text-red-600 p-2 transition-colors"
            >
              <FiTrash size={18} />
            </button>
          </div>
        }
        </div>
    </div>
  );
};

export default ComentarioLine;
