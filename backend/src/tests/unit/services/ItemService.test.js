import ItemService from '../../../services/ItemService.js';
import ItemRepository from '../../../repositories/ItemRepository.js';
import { StorageService } from '../../../services/StorageService.js';

jest.mock('../../../repositories/ItemRepository.js');
jest.mock('../../../services/StorageService.js');

describe('UNIT - ItemService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('createItem', () => {
    it('deve criar e retornar o item', async () => {
      const data = { titulo: 'Item 1', colecaoId: '1' };
      const itemMock = { id: '1', ...data };
      ItemRepository.create.mockResolvedValue(itemMock);
      const result = await ItemService.createItem(data);
      expect(ItemRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(itemMock);
    })

    it('deve propagar erro se o repositório falhar', async () => {
      ItemRepository.create.mockRejectedValue(new Error('Erro ao criar'));
      await expect(
        ItemService.createItem({ titulo: 'Item 1' })
      ).rejects.toThrow('Erro ao criar');
    })
  })

  describe('getItemById', () => {
    it('deve retornar o item quando existir', async () => {
      const itemMock = { id: '1', titulo: 'Item 1' };
      ItemRepository.findById.mockResolvedValue(itemMock);
      const result = await ItemService.getItemById('1');
      expect(ItemRepository.findById).toHaveBeenCalledWith('1');
      expect(result).toEqual(itemMock);
    })

    it('deve lançar erro se o item não existir', async () => {
      ItemRepository.findById.mockResolvedValue(null);
      await expect(
        ItemService.getItemById('1')
      ).rejects.toThrow('Item não encontrado');
    })
  })

  describe('getAllItens', () => {
    it('deve retornar todos os itens do usuário', async () => {
      const itensMock = [
        { id: '1', titulo: 'Item 1' },
        { id: '2', titulo: 'Item 2' },
      ];
      ItemRepository.findAll.mockResolvedValue(itensMock);
      const result = await ItemService.getAllItens('uid-123');
      expect(ItemRepository.findAll).toHaveBeenCalledWith('uid-123');
      expect(result).toEqual(itensMock);
    })

    it('deve retornar array vazio se não houver itens', async () => {
      ItemRepository.findAll.mockResolvedValue([]);
      const result = await ItemService.getAllItens('uid-sem-itens');
      expect(result).toEqual([]);
    })
  })

  describe('updateItem', () => {
    it('deve atualizar o item sem arquivo quando autorizado', async () => {
      const itemMock = {
        dataValues: {
          url: '/uploads/antigo.jpg',
          Colecao: { usuarioUid: 'uid-123' },
        },
      };
      const itemAtualizado = { id: '1', titulo: 'Novo titulo' };
      ItemRepository.findById.mockResolvedValue(itemMock);
      ItemRepository.update.mockResolvedValue(itemAtualizado);
      const result = await ItemService.updateItem('1', { titulo: 'Novo titulo' }, null, 'uid-123');

      expect(ItemRepository.update).toHaveBeenCalledWith(itemMock, { titulo: 'Novo titulo' })
      expect(StorageService.deleteFile).not.toHaveBeenCalled();
      expect(result).toEqual(itemAtualizado);
    })

    it('deve deletar arquivo antigo e salvar novo quando file for enviado', async () => {
      const itemMock = {
        dataValues: {
          url: '/uploads/antigo.jpg',
          Colecao: { usuarioUid: 'uid-123' },
        },
      };
      const fileMock = { filename: 'novo.jpg' };
      const novaUrl = '/uploads/novo.jpg';
      ItemRepository.findById.mockResolvedValue(itemMock);
      ItemRepository.update.mockResolvedValue({ id: '1', url: novaUrl })
      StorageService.deleteFile = jest.fn();
      StorageService.buildPath = jest.fn().mockReturnValue(novaUrl);

      await ItemService.updateItem('1', {}, fileMock, 'uid-123');
      expect(StorageService.deleteFile).toHaveBeenCalledWith('/uploads/antigo.jpg');
      expect(StorageService.buildPath).toHaveBeenCalledWith(fileMock);
      expect(ItemRepository.update).toHaveBeenCalledWith(itemMock, { url: novaUrl })
    })

    it('deve lançar erro se o item não existir', async () => {
      ItemRepository.findById.mockResolvedValue(null);
      await expect(
        ItemService.updateItem('1', {}, null, 'uid-123')
      ).rejects.toThrow('Item não encontrado');

      expect(ItemRepository.update).not.toHaveBeenCalled();
    })

    it('deve lançar erro se o usuário não for o dono', async () => {
      const itemMock = {
        dataValues: {
          url: '/uploads/foto.jpg',
          Colecao: { usuarioUid: 'uid-dono' },
        },
      };

      ItemRepository.findById.mockResolvedValue(itemMock);
      await expect(
        ItemService.updateItem('1', {}, null, 'uid-outro')
      ).rejects.toThrow('Não autorizado');
      expect(ItemRepository.update).not.toHaveBeenCalled();
    })
  })

  describe('deleteItem', () => {
    it('deve deletar o item e remover o arquivo de upload', async () => {
      const itemMock = {
        dataValues: { url: '/uploads/foto.jpg' },
      };
      ItemRepository.findById.mockResolvedValue(itemMock);
      ItemRepository.remove.mockResolvedValue(true);
      StorageService.deleteFile = jest.fn();
      await ItemService.deleteItem('1');
      expect(StorageService.deleteFile).toHaveBeenCalledWith('/uploads/foto.jpg');
      expect(ItemRepository.remove).toHaveBeenCalledWith(itemMock);
    })

    it('não deve chamar deleteFile para URL externa', async () => {
      const itemMock = {
        dataValues: { url: 'https://externo.com/foto.jpg' },
      };
      ItemRepository.findById.mockResolvedValue(itemMock);
      ItemRepository.remove.mockResolvedValue(true);
      StorageService.deleteFile = jest.fn();
      await ItemService.deleteItem('1');
      expect(StorageService.deleteFile).not.toHaveBeenCalled();
      expect(ItemRepository.remove).toHaveBeenCalledWith(itemMock);
    })

    it('não deve chamar deleteFile se url for null', async () => {
      const itemMock = {
        dataValues: { url: null },
      };
      ItemRepository.findById.mockResolvedValue(itemMock);
      ItemRepository.remove.mockResolvedValue(true);
      StorageService.deleteFile = jest.fn();

      await ItemService.deleteItem('1');
      expect(StorageService.deleteFile).not.toHaveBeenCalled();
      expect(ItemRepository.remove).toHaveBeenCalledWith(itemMock);
    })

    it('deve lançar erro se o item não existir', async () => {
      ItemRepository.findById.mockResolvedValue(null);

      await expect(
        ItemService.deleteItem('1')
      ).rejects.toThrow('Item não encontrado');
      expect(ItemRepository.remove).not.toHaveBeenCalled();
    })
  })
})