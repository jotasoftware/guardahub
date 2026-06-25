import React from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

const ColecaoLine = ({
  nome,
  data
}) => {
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const iniciais = nome
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

    const nomeExibido = nome.length > 30 ? nome.slice(0, 30) + "..." : nome;
      
  return (
    <div
      className=" w-full transition flex items-start justify-between gap-2 hover:opacity-80 hover:translate-x-1 cursor-pointer"
    >
      <div className="w-7 h-7 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-sm">
        {iniciais}
      </div>
      <div className="">
        <p className="text-gray-700 text-sm p-0 m-0">
          {nomeExibido}
        </p>
        <p className="text-gray-400 text-xs p-0 m-0">
          {dataFormatada}
        </p>

      </div>
    </div>
  );
};

export default ColecaoLine;
