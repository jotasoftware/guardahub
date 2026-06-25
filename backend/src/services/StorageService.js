import fs from "fs";
import path from "path";

export const StorageService = {
    deleteFile: (filePath) => {
        if (!filePath) return;

        const fullPath = path.join(process.cwd(), filePath);

        fs.unlink(fullPath, (err) => {
            if (err) {
                if (err.code === "ENOENT") return; //ambiente de teste
                console.log("Erro ao deletar arquivo:", err.message);
            }
        });
    },

    buildPath: (file) => {
        return `/uploads/${file.filename}`;
    }
};