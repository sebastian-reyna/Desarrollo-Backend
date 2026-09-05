import express from 'express';
import { obtenerAutorPorId, obtenerAutores, actualizarAutor, eliminarAutor, crearAutor } from '../controllers/autores.controller.js';
import { validarAutorId } from '../middlewares/validarId.js';


const router = express.Router();

router.get('/', obtenerAutores);
router.get('/:id',validarAutorId, obtenerAutorPorId);
router.post('/', crearAutor);
router.put('/:id', validarAutorId, actualizarAutor);
router.delete('/:id', validarAutorId, eliminarAutor);

export default router;