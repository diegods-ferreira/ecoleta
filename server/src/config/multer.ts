/**
 * Imports de pacotes necessários.
 */
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

/**
 * Exporta as configurações do Multer, que vai ser responsável pelo upload de arquivos.
 */
export default {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename: (request, file, callback) => {
      const hash = crypto.randomBytes(6).toString('hex');
      const fileName = `${hash}-${file.originalname}`;

      callback(null, fileName);
    }
  })
};