import ColecaoService from '../../../services/ColecaoService.js';
import ColecaoRepository from '../../../repositories/ColecaoRepository';
import { StorageService } from '../../../services/StorageService.js';

jest.mock('../../../repositories/ColecaoRepository.js');
jest.mock('../../../services/StorageService.js');

describe('UNIT - ColecaoService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('createColecao', () => {
    it('deve criar e retornar a coleção', async () => {
      const data = { titulo: 'Arquitetura de Software', usuarioUid: 'uid-123' };
      const colecaoMock = { id: '1', ...data };
      ColecaoRepository.create.mockResolvedValue(colecaoMock);

      const result = await ColecaoService.createColecao(data);
      expect(ColecaoRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(colecaoMock);
    })

    it('deve propagar erro se o repositório falhar', async () => {
      ColecaoRepository.create.mockRejectedValue(new Error('Erro ao criar'));
      await expect(
        ColecaoService.createColecao({ titulo: 'Teste' })
      ).rejects.toThrow('Erro ao criar');
    })
  })

  describe('getColecaoById', () => {
    it('deve retornar a coleção quando existir', async () => {
      const colecaoMock = { id: '1', titulo: 'Arquitetura de Software' };
      ColecaoRepository.findById.mockResolvedValue(colecaoMock);

      const result = await ColecaoService.getColecaoById('1');
      expect(ColecaoRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(colecaoMock);
    })

    it('deve lançar erro se a coleção não existir', async () => {
      ColecaoRepository.findById.mockResolvedValue(null);
      await expect(
        ColecaoService.getColecaoById('1')
      ).rejects.toThrow('Colecão não encontrada');
    })
  })

  describe('getAllColecoes', () => {
    it('deve retornar todas as coleções do usuário', async () => {
      const colecoesMock = [
        { id: '1', titulo: 'Arquitetura de Software' },
        { id: '2', titulo: 'Filmes' },
      ];
      ColecaoRepository.findAll.mockResolvedValue(colecoesMock);
      const result = await ColecaoService.getAllColecoes('uid-123');

      expect(ColecaoRepository.findAll).toHaveBeenCalledWith('uid-123');
      expect(result).toEqual(colecoesMock);
    })

    it('deve retornar array vazio se usuário não tiver coleções', async () => {
      ColecaoRepository.findAll.mockResolvedValue([]);
      const result = await ColecaoService.getAllColecoes('uid-sem-colecao');
      expect(result).toEqual([]);
    })
  })

  describe('getColecoesBySearch', () => {
    it('deve retornar coleções que correspondem à busca', async () => {
      const colecoesMock = [{ id: '1', titulo: 'Arquitetura de Software' }];
      ColecaoRepository.findBySearch.mockResolvedValue(colecoesMock);

      const result = await ColecaoService.getColecoesBySearch('Arquitetura de Software');
      expect(ColecaoRepository.findBySearch).toHaveBeenCalledWith('Arquitetura de Software');
      expect(result).toEqual(colecoesMock);
    })

    it('deve retornar array vazio se nenhuma coleção corresponder', async () => {
      ColecaoRepository.findBySearch.mockResolvedValue([]);

      const result = await ColecaoService.getColecoesBySearch('xyz-inexistente');

      expect(result).toEqual([]);
    })
  })

  describe('updateColecao', () => {
    it('deve atualizar e retornar a coleção quando autorizado', async () => {
      const colecaoMock = { id: '1', titulo: 'Antigo', usuarioUid: 'uid-123' };
      const colecaoAtualizada = { id: '1', titulo: 'Novo', usuarioUid: 'uid-123' };

      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      ColecaoRepository.update.mockResolvedValue(colecaoAtualizada);

      const result = await ColecaoService.updateColecao('1', { titulo: 'Novo' }, 'uid-123');
      expect(ColecaoRepository.findById).toHaveBeenCalledWith('1');
      expect(ColecaoRepository.update).toHaveBeenCalledWith(colecaoMock, { titulo: 'Novo' })
      expect(result).toEqual(colecaoAtualizada);
    })

    it('deve lançar erro se a coleção não existir', async () => {
      ColecaoRepository.findById.mockResolvedValue(null);
      await expect(
        ColecaoService.updateColecao('1', { titulo: 'Novo' }, 'uid-123')
      ).rejects.toThrow('Colecão não encontrada');
      expect(ColecaoRepository.update).not.toHaveBeenCalled();
    })

    it('deve lançar erro se o usuário não for o dono da coleção', async () => {
      const colecaoMock = { id: '1', titulo: 'Arquitetura de Software', usuarioUid: 'uid-dono' };
      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      await expect(
        ColecaoService.updateColecao('1', { titulo: 'Novo' }, 'uid-outro')
      ).rejects.toThrow('Não autorizado');
      expect(ColecaoRepository.update).not.toHaveBeenCalled();
    })
  })

  describe('addVisualizacao', () => {
    it('deve incrementar quantidadeViews corretamente', async () => {
      const colecaoMock = { id: '1', titulo: 'Arquitetura de Software', quantidadeViews: 5 };
      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      ColecaoRepository.update.mockResolvedValue({ ...colecaoMock, quantidadeViews: 6 })

      await ColecaoService.addVisualizacao('1');
      expect(ColecaoRepository.update).toHaveBeenCalledWith(colecaoMock, { quantidadeViews: 6 })
    })

    it('deve iniciar quantidadeViews em 1 se ainda não existir', async () => {
      const colecaoMock = { id: '1', titulo: 'Arquitetura de Software' }; 
      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      ColecaoRepository.update.mockResolvedValue({ ...colecaoMock, quantidadeViews: 1 })

      await ColecaoService.addVisualizacao('1');
      expect(ColecaoRepository.update).toHaveBeenCalledWith(colecaoMock, { quantidadeViews: 1 })
    })

    it('deve lançar erro se a coleção não existir', async () => {
      ColecaoRepository.findById.mockResolvedValue(null);
      await expect(
        ColecaoService.addVisualizacao('1')
      ).rejects.toThrow('Coleção não encontrada');
    })
  })

  describe('deleteColecao', () => {
    it('deve deletar a coleção e remover arquivos de upload dos itens', async () => {
      const colecaoMock = {
        id: '1',
        Items: [
          { url: '/uploads/foto1.jpg' },
          { url: '/uploads/foto2.jpg' },
        ],
      };
      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      ColecaoRepository.remove.mockResolvedValue(true);
      StorageService.deleteFile = jest.fn();

      await ColecaoService.deleteColecao('1');
      expect(StorageService.deleteFile).toHaveBeenCalledWith('/uploads/foto1.jpg');
      expect(StorageService.deleteFile).toHaveBeenCalledWith('/uploads/foto2.jpg');
      expect(ColecaoRepository.remove).toHaveBeenCalledWith(colecaoMock);
    })

    it('não deve chamar deleteFile para itens sem url de upload', async () => {
      const colecaoMock = {
        id: '1',
        Items: [
          { url: 'https://externo.com/foto.jpg' },
          { url: null },    
        ],
      };

      ColecaoRepository.findById.mockResolvedValue(colecaoMock);
      ColecaoRepository.remove.mockResolvedValue(true);
      StorageService.deleteFile = jest.fn();
      
      await ColecaoService.deleteColecao('1');
      expect(StorageService.deleteFile).not.toHaveBeenCalled();
      expect(ColecaoRepository.remove).toHaveBeenCalledWith(colecaoMock);
    })

    it('deve lançar erro se a coleção não existir', async () => {
      ColecaoRepository.findById.mockResolvedValue(null);
      await expect(
        ColecaoService.deleteColecao('1')
      ).rejects.toThrow('Colecão não encontrada');
      expect(ColecaoRepository.remove).not.toHaveBeenCalled();
    })
  })
})