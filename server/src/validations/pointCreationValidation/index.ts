/**
 * Imports de pacotes necessários.
 */
import { celebrate, Joi } from 'celebrate';

/**
 * Cria a validação dos campos para a criação de pontos de coleta.
 */
const pointCreationValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    city: Joi.string().required(),
    uf: Joi.string().required().max(2),
    items: Joi.string().required()
  })
}, {
  abortEarly: false
});

/**
 * Exporta a validação.
 */
export default pointCreationValidation;