import React from "react";
import { FiPlus } from 'react-icons/fi';

const ButtonHome = ({ name, action }) => {

    return (
        <button
            onClick={action}
            className=" text-xs rounded-xl flex items-center justify-center gap-1 h-7 bg-zinc-100 text-zinc-500 hover:bg-zinc-200 transition-colors cursor-pointer px-3"
          >
            <FiPlus size={14} />
            {name}
          </button>
    );
};

export default ButtonHome;
