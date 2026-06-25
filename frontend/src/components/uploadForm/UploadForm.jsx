import React, { useEffect, useState } from "react";

const UploadForm = ({ item, file, onChange }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [existeArquivo, setExisteArquivo] = useState(false);

  useEffect(() => {
    setExisteArquivo(!!item.url)
  }, [item]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSelectFile = (e) => {
    const selected = e.target.files?.[0] || null;
    onChange(selected);
  };

  return (
    <div className="flex flex-col gap-2 flex-1">

      <label className="text-sm font-medium text-zinc-700">
        Arquivo
      </label>

    {!existeArquivo ?
        <label className="inline-flex items-center px-2 py-1 rounded text-white bg-zinc-700 hover:bg-zinc-900 cursor-pointer w-[130px]">
            <span className="text-sm">
            Escolher arquivo
            </span>

            <input
            type="file"
            accept={item.tipo === 2 ? "application/pdf" : "image/*"}
            onChange={handleSelectFile}
            className="hidden"
            />
        </label>
    :
        <div className="flex gap-5">
            <a
                href={`http://localhost:3000${item.url}`}
                target="_blank"
                className="inline-flex items-center rounded text-zinc-700 cursor-pointer"
                >
                <span className="text-sm">
                    Arquivo guardado
                </span>
            </a>
            <label className="inline-flex items-center px-2 py-1 rounded text-white bg-zinc-700 hover:bg-zinc-900 cursor-pointer">
                <span className="text-sm">
                Escolher outro arquivo
                </span>

                <input
                type="file"
                accept={item.tipo === 2 ? "application/pdf" : "image/*"}
                onChange={handleSelectFile}
                className="hidden"
                />
            </label>
        </div>
    }

      {file && (
        <div className="mt-2">

          {file.type === "application/pdf" ? (
            <iframe
              src={previewUrl}
              title="Preview PDF"
              className="max-h-20 max-w-20 rounded-lg border border-zinc-200 shadow-sm"
            />
          ) : (
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-20 rounded-lg border border-zinc-200 shadow-sm"
            />
          )}

          {/* nome do arquivo */}
          <p className="text-xs text-zinc-500 mt-1 truncate max-w-[200px]">
            {file.name}
          </p>

        </div>
      )}
    </div>
  );
};

export default UploadForm;