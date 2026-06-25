import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Menu from "../../components/menu/Menu";
import Nome from "../../components/nome/Nome";
import PageHeader from "../../components/pageHeader/PageHeader";
import { useSidebar } from "../../context/SidebarContext";

const MainLayout = () => {
    const { collapsed, toggleSidebar } = useSidebar();

    return (
        <div className="h-screen w-screen flex white relative">
            {!collapsed && (
                <aside className="hidden sm:flex flex-col flex-[1] min-w-[200px] max-w-[250px]  p-4 transition-all duration-300">
                <Nome />
                <div className="flex-1 mt-4 overflow-auto">
                    <Menu />
                </div>
                </aside>
            )}
            <aside
                className={`sm:hidden fixed top-0 left-0 h-screen p-4 transition-transform duration-300 z-50
                ${collapsed ? "-translate-x-full" : "translate-x-0"}`}
            >
                <Nome />
                <div className="flex-1 mt-4 overflow-auto">
                <Menu />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-4">
                <PageHeader /> {/* botão de toggle do drawer */}
                <div className="flex-1 overflow-auto pt-[40px]">
                <Outlet />
                </div>
            </main>

            {!collapsed && (
                <div
                className="sm:hidden fixed inset-0 bg-black bg-opacity-30 z-40"
                onClick={toggleSidebar}
                />
            )}

        </div>


    );
};

export default MainLayout;
