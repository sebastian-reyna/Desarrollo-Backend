import {obtenerCategoria, obtenerCategoriaporID, crearCategoria, actualizarCategoria, eliminarCategoria} from '../controllers/categoria.controller.js';

import express from 'express';

const router = express.Router();

router.get('/', obtenerCategoria);
router.get('/:id', obtenerCategoriaporID);
router.post('/', crearCategoria);
router.put('/:id', actualizarCategoria);
router.delete('/:id', eliminarCategoria);

export default router;