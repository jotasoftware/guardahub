import { NavLink } from "react-router-dom";
import { useState } from "react";
import { MdFolder, MdHome, MdInfo } from "react-icons/md";
import { HiChevronDown, HiChevronUp } from "react-icons/hi";
import { useBreadcrumb } from "../../context/BreadcrumbContext";
import { IoExit } from "react-icons/io5";
import { FaBuilding } from "react-icons/fa6";
import { BsGearFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useColecao } from "../../context/ColecaoContext";

const Menu = () => {
  const { logout } = useAuth();
  const {colecoes} = useColecao();
  const navigate = useNavigate();
  const { updateBreadcrumb } = useBreadcrumb();
  const menuItems = [
    { name: "Home", path: "/", icon: <MdHome />},
    {
      name: "Suas Coleções",
      path: "/suascolecoes",
      icon: <MdFolder />,
      children: colecoes.map((c) => ({
        name: c.titulo.length > 23
          ? c.titulo.slice(0, 23) + "..."
          : c.titulo,
        path: `/suascolecoes/${c.id}`,
      })),
    }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const sair = ()=>{
    logout();
    navigate('/login', { replace: true});
  }

  return (
    <nav className="w-full h-full flex flex-col gap-1 bg-transparent">
    <div className="flex-1 overflow-auto flex flex-col gap-2">
    {menuItems.map((item, index) => (
          <div key={item.name} className="w-full group">
            <div className="flex items-center justify-between">
              <NavLink
                to={item.path}
                className={({isActive}) =>
                  isActive
                    ? "text-base px-4 py-1 rounded-xl bg-zinc-100 text-gray-700  flex-1 flex items-center gap-2 hover:text-gray-700"
                    : "text-base px-4 py-1 rounded-xl text-gray-700 hover:bg-zinc-100 flex-1 flex items-center gap-2 hover:text-gray-700"
                }
                onClick={() =>
                  updateBreadcrumb([{ name: item.name, path: item.path }])
                } 
              >
                {({ isActive }) => (
                <>
                {item.icon && (
                  <span className="relative w-5 h-5 flex items-center justify-center">
                    <span
                    className={
                      item.children
                        ? "absolute group-hover:opacity-0 transition-opacity duration-200"
                        : "absolute opacity-100"
                    }
                  >
                    {item.icon}
                  </span>
                    {item.children && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggle(index);
                        }}
                        className={`absolute opacity-0 group-hover:opacity-100
                        transition-all duration-200
                        ${isActive ? "text-gray-700" : "text-gray-700"} bg-transparent hover:bg-zinc-100
                        border-none outline-none focus:outline-none
                        p-0 rounded-sm
                        w-5 h-5 flex items-center justify-center`}
                      >
                        {openIndex === index ? <HiChevronUp /> : <HiChevronDown />}
                      </button>
                      )}
                  </span>
                )}
                {item.name}
                </>
                )}
              </NavLink>
            </div>

            {openIndex === index &&
              item.children && (
                <div
                  className="
                    ml-6 mt-1
                    flex flex-col gap-1
                    max-h-64
                    overflow-y-auto
                  "
                >
                  {item.children.map((sub) => (
                    <NavLink
                      key={sub.name}
                      to={sub.path}
                      className={"pl-5 pr-2 py-1 rounded text-gray-700 text-[14px]"}
                      onClick={() =>
                        updateBreadcrumb([{ name: item.name, path: item.path }])
                      } 
                    >
                      {sub.name}
                    </NavLink>
                  ))}
                </div>
              )}
          </div>
        ))}
    </div>

  <div className="mt-auto flex gap-1 justify-center">
    <button
      onClick={sair}
      className="px-4 py-2 rounded-md text-gray-700 hover:bg-zinc-100 flex-1 flex items-center gap-2 justify-center"
    >
      <IoExit />
    </button>
  </div>
</nav>

  );
};

export default Menu;
