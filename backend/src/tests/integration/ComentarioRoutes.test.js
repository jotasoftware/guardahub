jest.mock('../../repositories/ComentarioRepository.js');

import request from 'supertest';
import app from '../../config/app.js';
import ComentarioRepository from '../../repositories/ComentarioRepository.js';

jest.mock('../../middleware/authMiddleware.js', () => ({
    authMiddleware: (req, res, next) => {
      req.user = { uid: 'uid-teste', name: 'Usuário Teste' };
      next();
    },
  }))

describe('INTEGRATION - Comentario (repo mockado)', () => {
    afterEach(() => jest.clearAllMocks());

    it('POST /comentario deve criar comentário', async () => {
        ComentarioRepository.create.mockResolvedValue({
        id: '1',
        texto: 'Comentário teste',
        usuarioNome: "Usuário Teste",
        itemId: 'item-uuid',
        usuarioUid: 'uid-teste',
        });

        const res = await request(app)
        .post('/comentario')
        .send({
            texto: 'Comentário teste',
            itemId: 'item-uuid',
        });

        expect(res.status).toBe(201);
        expect(res.body.texto).toBe('Comentário teste');

        expect(ComentarioRepository.create).toHaveBeenCalledWith({
        texto: 'Comentário teste',
        itemId: 'item-uuid',
        usuarioUid: 'uid-teste',
        usuarioNome: "Usuário Teste",
        });
    });

    it('GET /comentario deve listar comentários', async () => {
        ComentarioRepository.findAllByColecoes.mockResolvedValue([
        { id: '1', texto: 'Primeiro comentário' },
        ]);
        const res = await request(app).get('/comentario');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(ComentarioRepository.findAllByColecoes).toHaveBeenCalled();
    });

    it('DELETE /comentario/:id deve remover comentário', async () => {
        ComentarioRepository.findById.mockResolvedValue({
        id: '1',
        dataValues: {
            usuarioUid: 'uid-teste',
        },
        });

        ComentarioRepository.remove.mockResolvedValue({
        message: 'deletado',
        });

        const res = await request(app).delete('/comentario/1');

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('deletado');

        expect(ComentarioRepository.remove).toHaveBeenCalledWith({
            id: '1',
            dataValues: {
            usuarioUid: 'uid-teste',
            },
        });
    });
});