import { StorageService } from '../../../services/StorageService.js';
import fs from 'fs';
import path from 'path';

jest.mock('fs');

describe('UNIT - StorageService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  })

  describe('deleteFile', () => {
    it('deve chamar fs.unlink com o caminho completo do arquivo', () => {
      fs.unlink.mockImplementation((filePath, cb) => cb(null));
      StorageService.deleteFile('/uploads/foto.jpg');

      const expectedPath = path.join(process.cwd(), '/uploads/foto.jpg');
      expect(fs.unlink).toHaveBeenCalledWith(expectedPath, expect.any(Function));
    })

    it('não deve chamar fs.unlink se filePath for undefined', () => {
      StorageService.deleteFile(undefined);
      expect(fs.unlink).not.toHaveBeenCalled();
    })
  })

  describe('buildPath', () => {
    it('deve retornar o caminho correto com o filename do arquivo', () => {
      const file = { filename: 'foto.jpg' };
      const result = StorageService.buildPath(file);
      expect(result).toBe('/uploads/foto.jpg');
    })

    it('deve montar o caminho corretamente para diferentes nomes de arquivo', () => {
      expect(StorageService.buildPath({ filename: 'imagem-123.png' })).toBe('/uploads/imagem-123.png');
      expect(StorageService.buildPath({ filename: 'documento.pdf' })).toBe('/uploads/documento.pdf');
    })
  })
})