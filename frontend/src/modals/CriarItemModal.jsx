import React, { useEffect, useState } from 'react';
import CampoForm from '../components/campoForm/CampoForm';
import SelectForm from '../components/selectForm/SelectForm';
import ToggleSwitch from '../components/toggleSwitch/ToggleSwitch';
import { PiImage, PiFilePdf } from "react-icons/pi";
import { toast } from 'react-toastify';
import { IoLink } from "react-icons/io5";
import { useItem } from '../context/ItemContext';
import UploadForm from '../components/uploadForm/UploadForm';
import { useColecao } from '../context/ColecaoContext';

const CriarItemModal = ({
  open,
  onClose,
  colecoes,
  itemEdit,
  idColecao
}) => {
  if (!open) return null;

  const {createItem, editItem} = useItem();
  const {fetchColecaoCompleta} = useColecao();

  const [item, setItem] = useState({
    titulo: "",
    url: "",
    conteudo: "",
    idColecao: null,
    tipo: 1
  });

  const [file, setFile] = useState(null);


  useEffect(() => {
    if (itemEdit) {
      setItem({
        id: itemEdit.id,
        titulo: itemEdit.titulo,
        url: itemEdit.url,
        conteudo: itemEdit.conteudo,
        tipo: itemEdit.tipo,
        idColecao: itemEdit.idColecao
      });
      console.log(itemEdit)
    }
  }, [itemEdit]);

  useEffect(() => {
    if(idColecao){
      onChangeItem("idColecao", idColecao)
    }
  }, [idColecao]);

  const changeFile = (v) => {
    setFile(v)
    setItem(prev => ({ ...prev, ["url"]: "" }));
  };

  const onChangeItem = (campo, valor) => {
    if(campo=="tipo") {
      setFile(null)
      setItem(prev => ({ ...prev, ["url"]: "" }));
    }
    setItem(prev => ({ ...prev, [campo]: valor }));
  };

  const limparItem = () => {
    setItem({
      titulo: "",
      url: "",
      conteudo: "",
      idColecao: null,
      tipo: 1
    })
    setFile(null);
  };

  const validarTudo = () => {
    if (!item.titulo) return false;
    if (!item.idColecao) return false;

    if (item.tipo === 1 && !item.url) return false;
    if ((item.tipo === 2 || item.tipo === 3) && !file && !itemEdit) return false;

    return true;
  };

  const onCreateItem = async () => {
    if (!validarTudo()) {
      toast.error('Existem campos não preenchidos');
      return;
    }
    let payload = item;
    if (file) {
      const formData = new FormData();
      Object.entries(item).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      formData.append("file", file);
      payload = formData;
    }
    await createItem(payload);
    await fetchColecaoCompleta(item.idColecao)
    limparItem()
    onClose()
  };

  const onEditItem = async () => {
    if (!validarTudo()) {
      toast.error('Existem campos não preenchidos');
      return;
    }

    let payload = item;
    if (file) {
      const formData = new FormData();
      Object.entries(item).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });
      formData.append("file", file);
      payload = formData;
    }
    await editItem(item.id, payload);
    await fetchColecaoCompleta(item.idColecao)
    limparItem()
    onClose()
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-xl shadow-lg p-6">

        <div className='mb-3 flex justify-between items-center'>
          <h2 className="font-semibold text-sm text-zinc-700">Novo item</h2>
          {!itemEdit && 
          <ToggleSwitch
              options={[
                  {
                      id: 1,
                      icon: <IoLink />
                  },
                  {
                      id: 2,
                      icon: <PiFilePdf />
                  },
                  {
                    id: 3,
                    icon: <PiImage />
                }
              ]}
              value={item.tipo}
              onToggle={(v) => onChangeItem("tipo", v)}
          />
          }
        </div>

        <div className="flex flex-col gap-4">
          <CampoForm
            label="Titulo"
            value={item.titulo || ""}
            onChange={(v) => onChangeItem("titulo", v)}
            placeholder="Digite o título"
          />

          <SelectForm
            label="Coleção"
            value={item.idColecao || ""}
            onChange={(v) =>
              onChangeItem("idColecao", v)
            }
            options={colecoes}
            placeholder="Selecione a coleção"
          />

          <CampoForm
            label="Descrição"
            value={item.conteudo || ""}
            onChange={(v) => onChangeItem("conteudo", v)}
            placeholder="Digite a descrição"
            type='textarea'
            height='100px'
          />
        
        {item.tipo == 1 ? 
          <CampoForm
            label="URL"
            value={item.url || ""}
            onChange={(v) => onChangeItem("url", v)}
            placeholder="Digite a URL"
          />
        : 
          <UploadForm 
            item={item}
            onChange={changeFile}
            file={file}
          />
        }



        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-300 text-zinc-700 hover:bg-zinc-100"
          >
            Cancelar
          </button>

          {itemEdit ? 
            <button
              onClick={onEditItem}
              className="px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-900 "
            >
              Editar
            </button>
            :
            <button
              onClick={onCreateItem}
              className="px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-900 "
            >
              Salvar
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default CriarItemModal;

// [
//   { id: 1, nome: "Pública" },
//   { id: 2, nome: "Privada" },
// ]