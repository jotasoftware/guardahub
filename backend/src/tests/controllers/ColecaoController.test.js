import * as ColecaoController from '../../controllers/ColecaoController.js';
import ColecaoService from '../../services/ColecaoService.js';

jest.mock('../../services/ColecaoService.js');

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('ColecaoController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('createColecao', () => {
    it('deve retornar 201 com a coleção criada', async () => {
      const req = { user: { uid: 'uid-123' }, body: { titulo: 'Arquitetura de software' } };
      const res = mockRes();
      const colecaoMock = { id: '1', titulo: 'Arquitetura de software', usuario_uid: 'uid-123' };
      ColecaoService.createColecao.mockResolvedValue(colecaoMock);

      await ColecaoController.createColecao(req, res);
      expect(ColecaoService.createColecao).toHaveBeenCalledWith({
        titulo: 'Arquitetura de software',
        usuario_uid: 'uid-123',
      })
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(colecaoMock);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { user: { uid: 'uid-123' }, body: { titulo: 'Arquitetura de software' } };
      const res = mockRes();
      ColecaoService.createColecao.mockRejectedValue(new Error('Erro ao criar'));

      await ColecaoController.createColecao(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao criar' })
    })
  })

  describe('getAllColecoes', () => {
    it('deve retornar 200 com as coleções do usuário', async () => {
      const req = { user: { uid: 'uid-123' } };
      const res = mockRes();
      const colecoesMock = [{ id: '1', titulo: 'Arquitetura de software' }];
      ColecaoService.getAllColecoes.mockResolvedValue(colecoesMock);

      await ColecaoController.getAllColecoes(req, res);
      expect(ColecaoService.getAllColecoes).toHaveBeenCalledWith('uid-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(colecoesMock);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { user: { uid: 'uid-123' } };
      const res = mockRes();
      ColecaoService.getAllColecoes.mockRejectedValue(new Error('Erro ao buscar'));

      await ColecaoController.getAllColecoes(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao buscar' })
    })
  })

  describe('getColecoesBySearch', () => {
    it('deve retornar 200 com os resultados da busca', async () => {
      const req = { query: { search: 'Arquitetura de software' } };
      const res = mockRes();
      const colecoesMock = [{ id: '1', titulo: 'Arquitetura de software' }];
      ColecaoService.getColecoesBySearch.mockResolvedValue(colecoesMock);

      await ColecaoController.getColecoesBySearch(req, res);
      expect(ColecaoService.getColecoesBySearch).toHaveBeenCalledWith('Arquitetura de software');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(colecoesMock);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { query: { search: 'Arquitetura de software' } };
      const res = mockRes();
      ColecaoService.getColecoesBySearch.mockRejectedValue(new Error('Erro na busca'));

      await ColecaoController.getColecoesBySearch(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro na busca' })
    })
  })

  describe('getColecaoById', () => {
    it('deve retornar 200 com a coleção encontrada', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      const colecaoMock = { id: '1', titulo: 'Arquitetura de software' };
      ColecaoService.getColecaoById.mockResolvedValue(colecaoMock);

      await ColecaoController.getColecaoById(req, res);
      expect(ColecaoService.getColecaoById).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(colecaoMock);
    })

    it('deve retornar 404 se a coleção não existir', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      ColecaoService.getColecaoById.mockRejectedValue(new Error('Colecão não encontrada'));

      await ColecaoController.getColecaoById(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Colecão não encontrada' })
    })
  })

  describe('updateColecao', () => {
    it('deve retornar 200 com a coleção atualizada', async () => {
      const req = { params: { id: '1' }, body: { titulo: 'Novo' }, user: { uid: 'uid-123' } };
      const res = mockRes();
      const colecaoAtualizada = { id: '1', titulo: 'Novo' };
      ColecaoService.updateColecao.mockResolvedValue(colecaoAtualizada);

      await ColecaoController.updateColecao(req, res);
      expect(ColecaoService.updateColecao).toHaveBeenCalledWith('1', { titulo: 'Novo' }, 'uid-123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(colecaoAtualizada);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { params: { id: '1' }, body: {}, user: { uid: 'uid-123' } };
      const res = mockRes();
      ColecaoService.updateColecao.mockRejectedValue(new Error('Não autorizado'));

      await ColecaoController.updateColecao(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Não autorizado' })
    })
  })

  describe('addVisualizacao', () => {
    it('deve retornar 200 com a coleção atualizada', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      const colecaoMock = { id: '1', quantidadeViews: 6 };
      ColecaoService.addVisualizacao.mockResolvedValue(colecaoMock);

      await ColecaoController.addVisualizacao(req, res);
      expect(ColecaoService.addVisualizacao).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(colecaoMock);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      ColecaoService.addVisualizacao.mockRejectedValue(new Error('Coleção não encontrada'));

      await ColecaoController.addVisualizacao(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Coleção não encontrada' })
    })
  })

  describe('deleteColecao', () => {
    it('deve retornar 200 ao deletar com sucesso', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      ColecaoService.deleteColecao.mockResolvedValue(true);

      await ColecaoController.deleteColecao(req, res);
      expect(ColecaoService.deleteColecao).toHaveBeenCalledWith('1');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(true);
    })

    it('deve retornar 404 se o service lançar erro', async () => {
      const req = { params: { id: '1' } };
      const res = mockRes();
      ColecaoService.deleteColecao.mockRejectedValue(new Error('Colecão não encontrada'));

      await ColecaoController.deleteColecao(req, res);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Colecão não encontrada' })
    })
  })
})