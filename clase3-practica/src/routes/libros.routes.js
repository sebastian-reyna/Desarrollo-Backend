import express from 'express';
import { obtenerLibros, obtenerLibroPorId, crearLirbro, actualizarLibro, eliminarLibro } from '../controllers/libros.controller.js';
import { validarLibroId } from '../middlewares/validarId.js';

const router = express.Router();

router.get('/', obtenerLibros);
router.get('/:id',validarLibroId, obtenerLibroPorId);
router.post('/', crearLirbro);
router.put('/:id', validarLibroId, actualizarLibro);
router.delete('/:id', validarLibroId, eliminarLibro);

export default router;