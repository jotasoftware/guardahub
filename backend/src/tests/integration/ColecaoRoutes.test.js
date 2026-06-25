import request from 'supertest';
import app from '../../config/app.js';
import ColecaoRepository from '../../../src/repositories/ColecaoRepository.js';

jest.mock('../../../src/repositories/ColecaoRepository.js'); //substituir por mock vazio

jest.mock('../../../src/middleware/authMiddleware.js', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { uid: 'uid-teste' };
    next();
  },
}))

describe('INTEGRATION - Colecao (repo mockado)', () => {
    afterEach(() => jest.clearAllMocks())

    it('POST /colecao deve criar', async () => {
        ColecaoRepository.create.mockResolvedValue({
            id: '1',
            titulo: 'Arquitetura Limpa',
            usuarioUid: 'uid-teste',
        })

        const res = await request(app)
            .post('/colecao')
            .send({ titulo: 'Arquitetura Limpa' })
        expect(res.status).toBe(201);
        expect(res.body.titulo).toBe('Arquitetura Limpa');
        expect(ColecaoRepository.create).toHaveBeenCalled();
    })

    it('GET /colecao deve listar', async () => {
        ColecaoRepository.findAll.mockResolvedValue([
            { id: '1', titulo: 'Node' },
        ]);

        const res = await request(app).get('/colecao');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(ColecaoRepository.findAll).toHaveBeenCalledWith('uid-teste');
    })

    it('GET /colecao/search deve retornar somente a busca', async () => {
        ColecaoRepository.findBySearch.mockResolvedValue([
        { id: '1', titulo: 'React' },
        ]);

        const res = await request(app)
            .get('/colecao/search')
            .query({ search: 'React' })

        expect(res.status).toBe(200);
        expect(res.body[0].titulo).toBe('React');
        expect(ColecaoRepository.findBySearch)
            .toHaveBeenCalledWith('React');
    })

    it('GET /colecao/:id', async () => {
        ColecaoRepository.findById.mockResolvedValue({
            id: '1',
            titulo: 'Docker',
        })

        const res = await request(app).get('/colecao/1');
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Docker');
    })

    it('PUT /colecao/:id', async () => {
        ColecaoRepository.findById.mockResolvedValue({
            id: '1',
            usuarioUid: 'uid-teste',
        })
        ColecaoRepository.update.mockResolvedValue({
            id: '1',
            titulo: 'Novo',
        })

        const res = await request(app)
            .put('/colecao/1')
            .send({ titulo: 'Novo' })
        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Novo');
    })

    it('PUT /colecao/view/:id deve adicionar uma visualização', async () => {
        ColecaoRepository.findById.mockResolvedValue({
            id: '1',
            quantidadeViews: 5,
        })
        ColecaoRepository.update.mockResolvedValue({
            id: '1',
            quantidadeViews: 6,
        })
        
        const res = await request(app)
            .put('/colecao/view/1');
        expect(res.status).toBe(200);
        expect(res.body.quantidadeViews).toBe(6);
        expect(ColecaoRepository.update).toHaveBeenCalledWith(
            expect.any(Object),
            {quantidadeViews: 6}
        );
    })

    it('DELETE /colecao/:id deve deletar a coleção', async () => {
        ColecaoRepository.findById.mockResolvedValue({
            id: '1',
            Items: [],
        })
            ColecaoRepository.remove.mockResolvedValue({
            message: 'deletado',
        })

        const res = await request(app).delete('/colecao/1');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('deletado');
    })
})