import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const BreadcrumbProvider = ({ children }) => {
    const [breadcrumb, setBreadcrumb] = useState([{ name: "Home", path: "/" }]);
    
    const updateBreadcrumb = (newPath) => {
        setBreadcrumb(newPath);
    };

    return (
        <BreadcrumbContext.Provider value={{ breadcrumb, updateBreadcrumb }}>
            {children}
        </BreadcrumbContext.Provider>
    );
};
