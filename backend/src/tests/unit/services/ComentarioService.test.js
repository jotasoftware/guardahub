import ComentarioService from '../../../services/ComentarioService.js';
import ComentarioRepository from '../../../repositories/ComentarioRepository.js';
import ColecaoRepository from '../../../repositories/ColecaoRepository.js';

jest.mock('../../../repositories/ComentarioRepository.js');
jest.mock('../../../repositories/ColecaoRepository.js');

describe('UNIT - ComentarioService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('createComentario', () => {
    it('deve criar e retornar o comentário', async () => {
      const data = { texto: 'Ótima coleção!', colecaoId: '1', usuarioUid: 'uid-123' };
      const comentarioMock = { id: '1', ...data };
      ComentarioRepository.create.mockResolvedValue(comentarioMock);

      const result = await ComentarioService.createComentario(data);
      expect(ComentarioRepository.create).toHaveBeenCalledWith(data);
      expect(result).toEqual(comentarioMock);
    })

    it('deve propagar erro se o repositório falhar', async () => {
      ComentarioRepository.create.mockRejectedValue(new Error('Erro ao criar'));
      await expect(
        ComentarioService.createComentario({ texto: 'Teste' })
      ).rejects.toThrow('Erro ao criar');
    })
  })

  describe('getAllComentarios', () => {
    it('deve retornar comentários das coleções do usuário', async () => {
      const colecoesMock = [{ id: '1' }, { id: '2' }];
      const comentariosMock = [
        { id: '1', texto: 'Comentário 1', colecaoId: '1' },
        { id: '2', texto: 'Comentário 2', colecaoId: '2' },
      ];
      ColecaoRepository.findAll.mockResolvedValue(colecoesMock);
      ComentarioRepository.findAllByColecoes.mockResolvedValue(comentariosMock);

      const result = await ComentarioService.getAllComentarios('uid-123');
      expect(ColecaoRepository.findAll).toHaveBeenCalledWith('uid-123');
      expect(ComentarioRepository.findAllByColecoes).toHaveBeenCalledWith(['1', '2']);
      expect(result).toEqual(comentariosMock);
    })

    it('deve retornar array vazio se o usuário não tiver coleções', async () => {
      ColecaoRepository.findAll.mockResolvedValue([]);
      ComentarioRepository.findAllByColecoes.mockResolvedValue([]);
      const result = await ComentarioService.getAllComentarios('uid-sem-colecoes');
      expect(ComentarioRepository.findAllByColecoes).toHaveBeenCalledWith([]);
      expect(result).toEqual([]);
    })

    it('deve retornar array vazio se as coleções não tiverem comentários', async () => {
      ColecaoRepository.findAll.mockResolvedValue([{ id: '1' }]);
      ComentarioRepository.findAllByColecoes.mockResolvedValue([]);
      const result = await ComentarioService.getAllComentarios('uid-123');
      expect(result).toEqual([]);
    })
  })

  describe('deleteComentario', () => {
    it('deve deletar o comentário quando existir', async () => {
      const comentarioMock = { id: '1', texto: 'Comentário 1' };
      ComentarioRepository.findById.mockResolvedValue(comentarioMock);
      ComentarioRepository.remove.mockResolvedValue(true);
      await ComentarioService.deleteComentario('1');
      expect(ComentarioRepository.findById).toHaveBeenCalledWith('1');
      expect(ComentarioRepository.remove).toHaveBeenCalledWith(comentarioMock);
    })

    it('deve lançar erro se o comentário não existir', async () => {
      ComentarioRepository.findById.mockResolvedValue(null);
      await expect(
        ComentarioService.deleteComentario('1')
      ).rejects.toThrow('Comentário não encontrado');
      expect(ComentarioRepository.remove).not.toHaveBeenCalled();
    })

    it('deve propagar erro se o repositório falhar ao remover', async () => {
      const comentarioMock = { id: '1', texto: 'Comentário 1' };
      ComentarioRepository.findById.mockResolvedValue(comentarioMock);
      ComentarioRepository.remove.mockRejectedValue(new Error('Erro ao remover'));
      await expect(
        ComentarioService.deleteComentario('1')
      ).rejects.toThrow('Erro ao remover');
    })
  })
})