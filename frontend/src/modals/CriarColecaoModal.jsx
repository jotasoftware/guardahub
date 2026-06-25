import React, { useState, useEffect } from 'react';
import CampoForm from '../components/campoForm/CampoForm';
import SelectForm from '../components/selectForm/SelectForm';
import { toast } from 'react-toastify';
import { useColecao } from '../context/ColecaoContext';

const CriarColecaoModal = ({
  open,
  onClose,
  colecaoEdit
}) => {
  if (!open) return null
  const {createColecao, editColecao, colecoes} = useColecao();
  const [colecaoExiste, setColecaoExiste] = useState(false)


  const [colecao, setColecao] = useState({
    titulo: "",
    status: 1
  });

  useEffect(() => {
    if (colecaoEdit) {
      setColecao({
        id: colecaoEdit.id,
        titulo: colecaoEdit.titulo,
        status: colecaoEdit.status
      });
    }
  }, [colecaoEdit]);

  const onChangeColecao = (campo, valor) => {
    if (campo === "titulo") {
      const existe = colecoes.some((c) => {
        if (c.id === colecaoEdit?.id) return false;
        return (
          c.titulo?.toLowerCase().trim() === valor.toLowerCase().trim()
        );
      });
      setColecaoExiste(existe);
    }
    setColecao(prev => ({ ...prev, [campo]: valor }));
  };

  const limparColecao = () => {
    setColecao({
      titulo: "",
      status: 1
    })
  };

  const validarTudo = (valor) => {
    if (valor === null) return true;
    if (typeof valor === 'string') {
      return valor.trim() !== '';
    }
    if (typeof valor === 'object') {
      return Object.values(valor).every(v => validarTudo(v));
    }
    return true;
  };

  const onCreateColecao = async () => {
    if (colecaoExiste) {
      toast.warn('Você já tem uma coleção com esse nome');
      return;
    }
    if (!validarTudo(colecao)) {
      toast.warn('Existem campos não preenchidos');
      return;
    }
    console.log(colecao)
    await createColecao(colecao);
    limparColecao()
    onClose()
  };

  const onEditColecao = async () => {
    if (colecaoExiste) {
      toast.warn('Você já tem uma coleção com esse nome');
      return;
    }
    if (!validarTudo(colecao)) {
      toast.warn('Existem campos não preenchidos');
      return;
    }

    await editColecao(colecao);
    limparColecao()
    onClose()
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-5xl max-h-[94vh] overflow-y-auto rounded-xl shadow-lg p-6">

        <div className='mb-3'>
          <h2 className="font-semibold text-sm text-zinc-700">Nova coleção</h2>
        </div>

        <div className="flex flex-col gap-4">
          <CampoForm
            label="Titulo"
            value={colecao.titulo || ""}
            onChange={(v) => onChangeColecao("titulo", v)}
            placeholder="Digite o título"
          />

          {/* <CampoForm
            label="Descrição"
            value={colecao.descricao || ""}
            onChange={(v) => onChangeColecao("descricao", v)}
            placeholder="Digite a descrição"
            type='textarea'
            height='100px'
          /> */}

          <SelectForm
            label="Status"
            value={colecao.status || ""}
            onChange={(v) =>
              onChangeColecao("status", v)
            }
            options={[
              { id: 1, nome: "Privada" },
              { id: 2, nome: "Pública" },
            ]}
            placeholder="Selecione o status"
          />

        </div>
        <div className="flex justify-between mt-6 items-center w-full">
          {colecaoExiste ? <p className='text-red-600 text-sm'>Coleção já existente</p> : <span />}
          <div className="flex justify-end gap-3">
            
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-300 text-zinc-700 hover:bg-zinc-100"
            >
              Cancelar
            </button>

            {colecaoEdit ? 
              <button
                onClick={onEditColecao}
                className="px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-900 "
              >
                Editar
              </button>
              :
              <button
                onClick={onCreateColecao}
                className="px-4 py-2 rounded text-white bg-zinc-700 hover:bg-zinc-900 "
              >
                Salvar
              </button>
            }
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default CriarColecaoModal;
