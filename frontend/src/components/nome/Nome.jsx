import { useAuth } from "../../context/AuthContext";
import { HiOutlineUser } from "react-icons/hi";

const Nome = () => {
  const { user } = useAuth();
  const nomeCompleto = user?.displayName || "";

  const iniciais = nomeCompleto
    .split(" ")
    .map(p => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const nomeExibido = nomeCompleto.split(" ").slice(0, 2).join(" ").length > 10
      ? nomeCompleto.split(" ")[0] 
      : nomeCompleto.split(" ").slice(0, 2).join(" ");

  return (
    <div className="w-full flex items-center gap-4 mb-[40px]">
      <div className="w-12 h-12 bg-zinc-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
        <HiOutlineUser></HiOutlineUser>
      </div>
      <div className="h-full flex items-center">
        <p className="font-semibold text-lg text-gray-800 flex items-center">
          {nomeExibido}
        </p>
      </div>
    </div>
  );
};

export default Nome;
