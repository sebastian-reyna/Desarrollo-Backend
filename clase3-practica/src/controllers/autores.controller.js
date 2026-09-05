import { autores } from '../data/autores.js';
import {siguienteId} from '../utils/siguienteId.js';
import { crearError } from '../utils/errores.js';


export const obtenerAutores = (req, res) => {
    res.json(autores);
}

export const obtenerAutorPorId = (req, res, next) => {
    const autor = autores.find(a => a.id === req.autorId)

    if (!autor) {
        return next(crearError(`no existe un autor con id ${req.autorId}`, 404));
    }

    res.json(autor)
}

export const crearAutor = (req, res, next) => {
    const { nombre, nacionalidad } = req.body;

    if (!nombre || !nacionalidad) {
        return next(crearError('Faltan datos obligatorios: nombre y nacionalidad son requeridos', 400));
    }

    const nuevoAutor = { id: siguienteId(autores), nombre, nacionalidad };

    autores.push(nuevoAutor);
    res.status(201).json(nuevoAutor);
}

export const actualizarAutor = (req, res, next) => {
    const autor = autores.find(a => a.id === req.autorId);

    if (!autor) {
        return next(crearError(`no existe un autor con id ${req.autorId}`, 404));
    }

    const { nombre, nacionalidad } = req.body;

    if (!nombre || !nacionalidad) {
        return next(crearError('Faltan datos obligatorios: nombre y nacionalidad son requeridos', 400));
    }

    autor.nombre = nombre;
    autor.nacionalidad = nacionalidad;

    res.json(autor);
}

export const eliminarAutor = (req, res, next) => {
    const indice = autores.findIndex(a => a.id === req.autorId);

    if (indice === -1) {
        return next(crearError(`no existe un autor con id ${req.autorId}`, 404));
    }

    autores.splice(indice, 1);
    res.status(204).send();
}