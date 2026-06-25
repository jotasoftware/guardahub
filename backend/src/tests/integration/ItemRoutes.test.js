jest.mock('../../repositories/ItemRepository.js');

import request from 'supertest';
import app from '../../config/app.js';
import ItemRepository from '../../repositories/ItemRepository.js';


jest.mock('../../middleware/authMiddleware.js', () => ({
  authMiddleware: (req, res, next) => {
    req.user = { uid: 'uid-teste' };
    next();
  },
}))

describe('INTEGRATION - Item (repo mockado)', () => {
    afterEach(() => jest.clearAllMocks())

    it('POST /item deve criar com idColecao', async () => {
        ItemRepository.create.mockResolvedValue({
            id: '1',
            titulo: 'Link legal',
            idColecao: 'colecao-uuid',
            usuarioUid: 'uid-teste',
        })

        const res = await request(app)
            .post('/item')
            .send({
                titulo: 'Link legal',
                idColecao: 'colecao-uuid'
            })

        expect(res.status).toBe(201);
        expect(res.body.titulo).toBe('Link legal');
        expect(ItemRepository.create).toHaveBeenCalledWith({
            titulo: 'Link legal',
            idColecao: 'colecao-uuid'
        });
    })

    it('GET /item deve listar', async () => {
        ItemRepository.findAll.mockResolvedValue([
            { id: '1', titulo: 'Node' },
        ]);

        const res = await request(app).get('/item');

        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
        expect(ItemRepository.findAll).toHaveBeenCalledWith('uid-teste');
    })

    it('PUT /item/:id deve atualizar com autorização da coleção', async () => {
        ItemRepository.findById.mockResolvedValue({
            id: '1',
            dataValues: {
                Colecao: {
                    usuarioUid: 'uid-teste'
                },
                url: '/uploads/old.png'
            }
        })

        ItemRepository.update.mockResolvedValue({
            id: '1',
            titulo: 'Novo',
        })

        const res = await request(app)
            .put('/item/1')
            .send({ titulo: 'Novo' })

        expect(res.status).toBe(200);
        expect(res.body.titulo).toBe('Novo');
        expect(ItemRepository.update).toHaveBeenCalled();
    })

    it('DELETE /item/:id deve deletar item', async () => {
        ItemRepository.findById.mockResolvedValue({
            id: '1',
            dataValues: {
                url: '/uploads/file.png'
            }
        })
        ItemRepository.remove.mockResolvedValue({
            message: 'deletado',
        })

        const res = await request(app).delete('/item/1');
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('deletado');
    })
})